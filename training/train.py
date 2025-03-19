import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from kerastuner.tuners import RandomSearch
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
import re
import joblib

# 1. Load the datasets
def load_data():
    try:
        phishing_df = pd.read_csv('../data/Phishing URLs.csv')
        legitimate_df = pd.read_csv('../data/Legitimate URLs.csv')
        phishing_df['label'] = 'phishing'
        legitimate_df['label'] = 'legitimate'
        data = pd.concat([phishing_df, legitimate_df], ignore_index=True)
        print("[INFO] Data successfully loaded.")
        return data
    except Exception as e:
        print(f"[ERROR] Data loading failed: {e}")
        exit()

def extract_features(url):
    features = [
        len(url),
        url.count('.'),
        int('https' in url),
        int('//' in url[7:]),
        len(url.split('//')[-1].split('/')[0]),
        int(bool(re.match(r'\d+\.\d+\.\d+\.\d+', url.split('//')[-1].split('/')[0]))),
        len(url.split('//')[-1].split('/')[0].split('.')) - 1,
        int(any(keyword in url.lower() for keyword in ['login', 'admin', 'account', 'update', 'service', 'payment', 'secure']))
    ]
    return features

data = load_data()
data['features'] = data['url'].apply(extract_features)
features_df = pd.DataFrame(data['features'].tolist(), columns=['url_length', 'num_dots', 'has_https', 'has_double_slash', 'domain_length', 'is_ip', 'num_subdomains', 'has_sensitive_keywords'])
final_data = pd.concat([features_df, data['label']], axis=1)

# Encode labels
le = LabelEncoder()
final_data['label_encoded'] = le.fit_transform(final_data['label'])

X = final_data.drop(['label', 'label_encoded'], axis=1).values
y = final_data['label_encoded'].values

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Feature Scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Hyperparameter Tuning Model
def build_model(hp):
    model = keras.Sequential()
    model.add(layers.Dense(hp.Int('units_1', min_value=64, max_value=256, step=64), input_dim=X_train.shape[1], activation='relu'))
    model.add(layers.BatchNormalization())
    model.add(layers.Dropout(hp.Float('dropout_1', min_value=0.2, max_value=0.5, step=0.1)))
    
    model.add(layers.Dense(hp.Int('units_2', min_value=32, max_value=128, step=32), activation='relu'))
    model.add(layers.BatchNormalization())
    model.add(layers.Dropout(hp.Float('dropout_2', min_value=0.2, max_value=0.5, step=0.1)))
    
    model.add(layers.Dense(1, activation='sigmoid'))

    model.compile(
        optimizer=keras.optimizers.Adam(learning_rate=hp.Choice('learning_rate', [0.001, 0.0005, 0.0001])),
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    return model

# Hyperparameter Tuning
tuner = RandomSearch(
    build_model,
    objective='val_accuracy',
    max_trials=10,
    executions_per_trial=2,
    directory='tuner_results',
    project_name='phishing_detector_tuning'
)

tuner.search(X_train, y_train, epochs=30, validation_split=0.2, batch_size=512)

# Get Best Model
best_hps = tuner.get_best_hyperparameters(num_trials=1)[0]
model = tuner.hypermodel.build(best_hps)

# Train the optimized model
history = model.fit(X_train, y_train, epochs=50, batch_size=512, validation_split=0.2)

# Evaluate the Model
loss, accuracy = model.evaluate(X_test, y_test)
print(f'Test Accuracy: {accuracy * 100:.2f}%')

# Save Model and Scaler
model.save('training/model.h5')
joblib.dump(scaler, 'training/scaler.save')

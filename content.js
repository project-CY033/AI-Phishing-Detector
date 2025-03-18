// content.js

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'scanPage') {
    // Implement scanning logic here
    const status = 'Scanning completed';
    sendResponse({ status: status });
  } else if (request.action === 'markEmailAsPhishing') {
    markEmailAsPhishing(request.email);
  }
});

function markEmailAsPhishing(email) {
  // Implement logic to mark the email as phishing
  // For example, add a visual indicator
  console.log(`Email marked as phishing: ${email}`);
}

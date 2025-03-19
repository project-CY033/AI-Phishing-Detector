// virus_total.js

const VIRUSTOTAL_API_KEY = '591e91fc74b9f00acfde7ffd5e1d2152bbe9342bd5bd65777f7cc4d18ff32702';
const VIRUSTOTAL_API_URL = 'https://www.virustotal.com/api/v3/urls';

class VirusTotalScanner {
    // Encode URL to meet VirusTotal API requirements
    encodeURL(url) {
        return btoa(url);
    }

    // Scan a URL using VirusTotal
    async scanURL(url) {
        try {
            const encodedURL = this.encodeURL(url);
            const response = await fetch(VIRUSTOTAL_API_URL, {
                method: 'POST',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `url=${encodeURIComponent(url)}`
            });

            const result = await response.json();
            if (result.data) {
                return {
                    malicious: result.data.attributes.last_analysis_stats.malicious > 0,
                    details: result.data.links.self
                };
            } else {
                console.warn("[VirusTotal] No valid result received.");
                return { malicious: false };
            }
        } catch (error) {
            console.error("[VirusTotal] Error scanning URL:", error);
            return { malicious: false };
        }
    }

    // Scan a file using VirusTotal
    async scanFile(file) {
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('https://www.virustotal.com/api/v3/files', {
                method: 'POST',
                headers: {
                    'x-apikey': VIRUSTOTAL_API_KEY
                },
                body: formData
            });

            const result = await response.json();
            if (result.data) {
                return {
                    malicious: result.data.attributes.last_analysis_stats.malicious > 0,
                    details: result.data.links.self
                };
            } else {
                console.warn("[VirusTotal] No valid result received.");
                return { malicious: false };
            }
        } catch (error) {
            console.error("[VirusTotal] Error scanning file:", error);
            return { malicious: false };
        }
    }
}

// Export instance
const virusTotalScanner = new VirusTotalScanner();

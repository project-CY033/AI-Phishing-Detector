// utils/virus_total.js

const virusTotalAPIKey = 'YOUR_VIRIS_TOTAL_API_KEY';

export async function checkURLWithVirusTotal(url) {
  const response = await fetch(`https://www.virustotal.com/api/v3/urls`, {
    method: 'POST',
    headers: {
      'x-apikey': virusTotalAPIKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url: url })
  });

  const data = await response.json();
  return {
    isMalicious: data.data.attributes.last_analysis_stats.malicious > 0
  };
}

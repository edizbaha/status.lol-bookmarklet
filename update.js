document.addEventListener("DOMContentLoaded", () => {
    chrome.storage.local.get(['version', 'changelog', 'url'], (data) => {
        const versionContent = document.getElementById('version-content');
        const changelogContent = document.getElementById('changelog-content');
        const updateButton = document.getElementById('update-button');

        versionContent.textContent = data.version || 'Unknown Version';

        if (data.changelog) {
            const changelogLines = data.changelog;
            changelogContent.innerHTML = changelogLines.map(line => `<p>${line}</p>`).join('');
        } else {
            changelogContent.innerHTML = '<p>No changelog available.</p>';
        }

        updateButton.addEventListener('click', () => {
            if (data.url) {
                chrome.tabs.create({ url: data.url });
            } else {
                alert('No update URL available.');
            }
        });
    });
});
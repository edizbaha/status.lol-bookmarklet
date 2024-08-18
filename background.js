function checkForUpdates() {
    fetch('https://ediz.paste.lol/status-bookmarklet/raw')
        .then(response => response.json())
        .then(data => {
            const currentVersion = chrome.runtime.getManifest().version;
            const newVersion = data.version;

            if (compareVersions(currentVersion, newVersion) < 0) {
                const changelogLines = data.changelog.split('\n').filter(line => line.trim() !== '');

                chrome.storage.local.set({
                    version: newVersion,
                    changelog: changelogLines,
                    url: data.url
                }, () => {
                    chrome.tabs.create({ url: chrome.runtime.getURL('update.html') });
                });
            }
        })
        .catch(error => console.error('Update check failed:', error));
}

function compareVersions(v1, v2) {
    const v1Parts = v1.split('.').map(Number);
    const v2Parts = v2.split('.').map(Number);
    
    while (v1Parts.length < v2Parts.length) v1Parts.push(0);
    while (v2Parts.length < v1Parts.length) v2Parts.push(0);

    for (let i = 0; i < v1Parts.length; i++) {
        if (v1Parts[i] > v2Parts[i]) return 1;
        if (v1Parts[i] < v2Parts[i]) return -1;
    }
    return 0;
}



chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install" || details.reason === "update") {
        checkForUpdates();
    }

    chrome.contextMenus.create({
        id: "myContextMenuItem",
        title: "status.lol Bookmarklet",
        contexts: ["page", "selection", "link"]
    });
});

chrome.runtime.onStartup.addListener(() => {
    checkForUpdates();
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "myContextMenuItem") {
        chrome.storage.sync.get('address', (data) => {
            const address = data.address || 'foobar';
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                if (tabs.length > 0) {
                    const title = encodeURIComponent(tabs[0].title);
                    const url = encodeURIComponent(tabs[0].url);
                    const link = `https://home.omg.lol/address/${address}/statuslog-bookmarklet?title=${title}&url=${url}`;
                    chrome.windows.create({
                        url: link,
                        type: "popup",
                        width: 700,
                        height: 670,
                    });
                }
            });
        });
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get('address', (data) => {
        const address = data.address || 'foobar';
        const title = encodeURIComponent(tab.title);
        const url = encodeURIComponent(tab.url);
        const link = `https://home.omg.lol/address/${address}/statuslog-bookmarklet?title=${title}&url=${url}`;
        chrome.windows.create({
            url: link,
            type: "popup",
            width: 700,
            height: 670,
        });
    });
});

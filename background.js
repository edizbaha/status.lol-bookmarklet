// Fixed the issue of opening options.html in Chrome update
chrome.runtime.onInstalled.addListener((details) => {
    // Check if the reason for onInstalled event is "install" or "update"
    if (details.reason === "install" || details.reason === "update") {
        // Open the options page of the extension
        chrome.runtime.openOptionsPage();
    }
});

// Create a context menu item with id "myContextMenuItem" and title "status.lol Bookmarklet"
// This context menu item will be shown when user right-clicks on a page, selection, or link
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "myContextMenuItem",
        title: "status.lol Bookmarklet",
        contexts: ["page", "selection", "link"]
    });
});

// Add a listener for clicks on the "myContextMenuItem" context menu item
// When the context menu item is clicked, it opens a new popup window with a link to status.lol
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "myContextMenuItem") {
        chrome.storage.sync.get('address', (data) => {
            const address = data.address || 'foobar';
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                const title = encodeURIComponent(tabs[0].title);
                const url = encodeURIComponent(tabs[0].url);
                const link = `https://home.omg.lol/address/${address}/statuslog-bookmarklet?title=${title}&url=${url}`;
                chrome.windows.create({
                    url: link,
                    type: "popup",
                    width: 700,
                    height: 670,
                });
            });
        });
    }
});

// Add a listener for clicks on the extension's action button
// When the button is clicked, it opens a new popup window with a link to status.lol
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

// Open the extension's options page when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
});
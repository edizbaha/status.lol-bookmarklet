chrome.runtime.onInstalled.addListener(() => {
  chrome.runtime.openOptionsPage();
});

chrome.action.onClicked.addListener((tab) => {
  chrome.storage.sync.get('username', (data) => {
    const username = data.username || 'default-username';
    const title = encodeURIComponent(tab.title);
    const url = encodeURIComponent(tab.url);
    const link = `https://home.omg.lol/address/${username}/statuslog-bookmarklet?title=${title}&url=${url}`;
    chrome.windows.create({
      url: link,
      type: "popup",
      width: 700,
      height: 670,
    });
  });
});
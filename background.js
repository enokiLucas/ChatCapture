chrome.runtime.onInstalled.addListener(async () => {
  const allTabs = await chrome.tabs.query({});
  allTabs.forEach((tab) => {
    if (tab.url.startsWith('https://chat.openai.com')) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['libs/jspdf.umd.min.js', 'scripts/content.js'],
      });
    }
  });
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (
    changeInfo.status === 'complete' &&
    tab.url.startsWith('https://chat.openai.com')
  ) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['libs/jspdf.umd.min.js', 'scripts/content.js'],
    });
  }
});

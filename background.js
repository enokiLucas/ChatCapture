// Listen for messages from the content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'create-pdf') {
    // Send a message to the content script to start the PDF creation process
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'create-pdf' });
    });
  }
});

// Listen for clicks on the extension's browser action (icon)
chrome.action.onClicked.addListener((tab) => {
  // Send a message to the content script to open the extension popup
  chrome.tabs.sendMessage(tab.id, { action: 'open-popup' });
});
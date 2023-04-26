document.getElementById('export-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const contentOption = document.getElementById('content-select').value;
  const rangeStart = document.getElementById('range-start').value;
  const rangeEnd = document.getElementById('range-end').value;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['content-script.js']
  }, () => {
    // Ensure the content script is injected before sending the message.
    chrome.tabs.sendMessage(tab.id, {
      action: 'create-pdf',
      contentOption,
      rangeStart,
      rangeEnd
    });
  });
});

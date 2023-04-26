document.getElementById('export-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const contentOption = document.getElementById('content-select').value;
  const rangeStart = document.getElementById('range-start').value;
  const rangeEnd = document.getElementById('range-end').value;

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ['libs/jspdf.umd.min.js', 'scripts/content.js'],
  });

  chrome.tabs.sendMessage(tab.id, {
    action: 'create-pdf',
    contentOption,
    rangeStart,
    rangeEnd,
  });
});

// Function to extract chat messages based on user preferences.
const extractMessages = (contentOption, rangeStart, rangeEnd) => {
  // Identify the container holding the chat messages.
  const chatContainer = document.querySelector('.flex.flex-col.items-center.text-sm');

  // Extract individual chat messages.
  const messages = chatContainer.querySelectorAll('.message-selector');

  // Filter messages based on user preferences (e.g., both input and output or just output).
  const filteredMessages = Array.from(messages).filter((message, index) => {
    if (contentOption === 'output') {
      return message.classList.contains('output-message-selector') &&
             index + 1 >= rangeStart && index + 1 <= rangeEnd;
    } else {
      return index + 1 >= rangeStart && index + 1 <= rangeEnd;
    }
  });

  return filteredMessages.map((message) => message.textContent);
}

// Function to generate the PDF with the extracted messages.
const createPdf = (messages) => {
  // Add your logic here to generate the PDF using jsPDF library or other methods.

  // Example:
  // const pdf = new jsPDF();
  // messages.forEach((message, index) => {
  //   pdf.text(message, 10, 10 + index * 10);
  // });
  // pdf.save('ChatCapture.pdf');
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'create-pdf') {
    const { contentOption, rangeStart, rangeEnd } = request;
    const messages = extractMessages(contentOption, rangeStart, rangeEnd);
    createPdf(messages);
  }
});

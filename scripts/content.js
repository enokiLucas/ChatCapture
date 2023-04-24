import jsPDF from 'jspdf';

const extractMessages = (contentOption, rangeStart, rangeEnd) => {
  // Identify the container holding the chat messages.
  const chatContainer = document.querySelector('.flex.flex-col.items-center.text-sm');

  // Extract individual chat messages.
  const chatInput = chatContainer.querySelectorAll('.min-h-[20px].flex.flex-col.items-start gap-4.whitespace-pre-wrap');
  const chatOutput = chatContainer.querySelectorAll('.markdown.prose.w-full.break-words');

  // Filter messages based on user preferences (e.g., both input and output or just output).
  let messages;
  if (contentOption === 'output') {
    messages = Array.from(chatOutput);
  } else {
    messages = Array.from(chatInput).concat(Array.from(chatOutput));
  }

  const filteredMessages = messages.filter((message, index) => {
    return index + 1 >= rangeStart && index + 1 <= rangeEnd;
  });

  return filteredMessages.map((message) => message.textContent);
}

const getCurrentDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}_${month}_${day}`;
}


// Function to generate the PDF with the extracted messages.
const createPdf = (messages) => {
  
	const pdf = new jsPDF();
	messages.forEach((message, index) => {
		pdf.text(message, 10, 10 + index * 10);
	});

	const currentDate = getCurrentDate();
  pdf.save(`${currentDate}_chat.pdf`);
  
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'create-pdf') {
    const { contentOption, rangeStart, rangeEnd } = request;
    const messages = extractMessages(contentOption, rangeStart, rangeEnd);
    createPdf(messages);
  }
});

const sidebarToggle = document.getElementById('sidebar-toggle');
const signOutBtn = document.getElementById('sign-out-btn');
const sidebar = document.querySelector('.sidebar');
const chatContainer = document.querySelector('.chat-container');
const modeToggleCheckbox = document.getElementById('mode-toggle-checkbox');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');
const chatBox = document.getElementById('chat-box');
const newConversationBtn = document.getElementById('new-conversation-btn');

// DO NOT expose API key directly in the frontend. Use a secure server proxy for production.
const apiKey = 'AIzaSyAiqrtLycZBhShdTlZW-g4LxnFLH0nyzxM';

let isSending = false;

async function askQuestion(userInputValue) {
    const requestData = {
        contents: [{
            parts: [{
                text: userInputValue
            }]
        }]
    };

    try {
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
            requestData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('API Response:', JSON.stringify(response.data, null, 2));

        if (response.data?.candidates?.length > 0) {
            const candidate = response.data.candidates[0];
            const generatedContent = candidate?.content?.parts?.[0]?.text || 'No content available.';
            console.log('Generated Content:', generatedContent);

            chatBox.innerText = generatedContent;
        } else {
            console.log('No candidates found in response.');
            chatBox.innerText = 'No content returned. Check API response structure.';
        }
    } catch (error) {
        console.error('Error fetching answer:', error);
        chatBox.innerText = 'An error occurred while fetching the answer.';
    } finally {
        isSending = false;
        sendButton.disabled = false;
        userInput.disabled = false;
        userInput.focus();
    }
}

sidebarToggle.addEventListener('click', function () {
    sidebar.classList.toggle('collapsed');
    chatContainer.classList.toggle('collapsed');
    const icon = sidebarToggle.querySelector('i');
    if (icon) {
        icon.classList.toggle('fa-chevron-right');
        icon.classList.toggle('fa-chevron-left');
    }
});

signOutBtn.addEventListener('click', function () {
    window.location.href = './signup.html';
});

modeToggleCheckbox.addEventListener('change', function () {
    chatContainer.classList.toggle('dark-mode', this.checked);
    chatContainer.classList.toggle('light-mode', !this.checked);
});

function addMessageToChat(sender, message) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBox.appendChild(messageDiv);

    chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: 'smooth'
    });
}

async function handleSendMessage() {
    if (isSending) return;

    const userQuestion = userInput.value.trim();
    if (userQuestion !== "") {
        isSending = true;
        sendButton.disabled = true;
        userInput.disabled = true;

        addMessageToChat("User", userQuestion);

        try {
            await askQuestion(userQuestion);
        } catch (error) {
            console.error('Error while sending the message:', error);
        } finally {
            isSending = false;
            sendButton.disabled = false;
            userInput.disabled = false;
            userInput.focus();
        }
    }
}

userInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSendMessage();
    }
});

sendButton.addEventListener('click', function () {
    handleSendMessage();
});

newConversationBtn.addEventListener('click', function () {
    chatBox.innerHTML = ''; // Clear chat box for new conversation
    addMessageToChat("System", "New conversation started. Ask me anything!");
});

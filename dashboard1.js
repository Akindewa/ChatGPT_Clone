async function askQuestion() {
    // Get references to DOM elements
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const signOutBtn = document.getElementById('sign-out-btn');
    const sidebar = document.querySelector('.sidebar');
    const chatContainer = document.querySelector('.chat-container');
    const modeToggleCheckbox = document.getElementById('mode-toggle-checkbox');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatBox = document.getElementById('chat-box');
    const newConversationBtn = document.getElementById('new-conversation-btn');
    const apiKey = 'AIzaSyBccnj0Xg2Y4ixEDVDfeaR2mahOt3RbSlQ'; // Replace with your actual API key

    // Flag to prevent multiple sends
    let isSending = false;

    // Function to handle the request to the API
    async function fetchAnswer(userInputValue) {
        const requestData = {
            contents: [{
                parts: [{
                    text: userInputValue // Use the question from the input
                }]
            }]
        };

        try {
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('API Response:', JSON.stringify(response.data, null, 2)); // Improved logging

            // Check if the response has the expected structure
            if (response.data.candidates && response.data.candidates.length > 0) {
                const candidate = response.data.candidates[0];
                console.log('First Candidate:', JSON.stringify(candidate, null, 2)); // Log the first candidate

                if (candidate.content && 
                    candidate.content.parts && 
                    candidate.content.parts.length > 0) {
                    
                    const generatedContent = candidate.content.parts[0].text;

                    // Debugging: Check what we're getting
                    console.log('Generated Content:', generatedContent);

                    // Display the generated answer
                    chatBox.innerText = generatedContent; // Directly set the content
                } else {
                    console.log('Content structure is not as expected.');
                    chatBox.innerText = 'No content returned. Check API response structure.';
                }
            } else {
                console.log('No candidates found in response.');
                chatBox.innerText = 'No content returned. Check API response structure.';
            }
        } catch (error) {
            console.error('Error fetching answer:', error);
            chatBox.innerText = 'An error occurred while fetching the answer.';
        } finally {
            isSending = false; // Reset the sending flag after processing
        }
    }

    // Sidebar toggle functionality
    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        chatContainer.classList.toggle('collapsed');
        const icon = sidebarToggle.querySelector('i');
        icon.classList.toggle('fa-chevron-right');
        icon.classList.toggle('fa-chevron-left');
    });

    // Sign out functionality
    signOutBtn.addEventListener('click', function() {
        window.location.href = './signup.html'; // Redirect to signup page (update this link to match your actual signup page)
    });

    // Mode toggle functionality (light/dark mode)
    modeToggleCheckbox.addEventListener('change', function() {
        chatContainer.classList.toggle('dark-mode', this.checked);
        chatContainer.classList.toggle('light-mode', !this.checked);
    });

    // Function to add messages to chat
    function addMessageToChat(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
    }

    // Handle sending messages
    async function handleSendMessage() {
        if (isSending) return; // Prevent multiple sends

        const userQuestion = userInput.value.trim(); // Retrieve user input value
        if (userQuestion !== "") {
            isSending = true; // Set the sending flag
            addMessageToChat("User", userQuestion); // Add user message to chat
            await fetchAnswer(userQuestion); // Call the API and wait for the response
            // Do not clear the input field, so the text remains visible
            userInput.focus(); // Keep focus on the input field
        }
    }

    // Trigger send message when pressing Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission behavior
            handleSendMessage(); // Call the function to send the message
        }
    });

    // Trigger send message when clicking the send button
    sendButton.addEventListener('click', function() {
        handleSendMessage();
    });

    // Start new conversation
    newConversationBtn.addEventListener('click', function() {
        chatBox.innerHTML = ''; // Clear chat box for new conversation
        addMessageToChat("System", "New conversation started. Ask me anything!");
    });
}
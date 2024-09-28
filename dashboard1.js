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
            const response = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, requestData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('API Response:', JSON.stringify(response.data, null, 2));

            if (response.data.candidates && response.data.candidates.length > 0) {
                const candidate = response.data.candidates[0];
                console.log('First Candidate:', JSON.stringify(candidate, null, 2));

                if (candidate.content && 
                    candidate.content.parts && 
                    candidate.content.parts.length > 0) {
                    
                    const generatedContent = candidate.content.parts[0].text;

                    console.log('Generated Content:', generatedContent);

                    chatBox.innerText = generatedContent;
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
            isSending = false;
        }
    }

    sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('collapsed');
        chatContainer.classList.toggle('collapsed');
        const icon = sidebarToggle.querySelector('i');
        icon.classList.toggle('fa-chevron-right');
        icon.classList.toggle('fa-chevron-left');
    });

    signOutBtn.addEventListener('click', function() {
        window.location.href = './signup.html';
    });

    modeToggleCheckbox.addEventListener('change', function() {
        chatContainer.classList.toggle('dark-mode', this.checked);
        chatContainer.classList.toggle('light-mode', !this.checked);
    });

    function addMessageToChat(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight; 
    }

    async function handleSendMessage() {
        if (isSending) return; 

        const userQuestion = userInput.value.trim();
        if (userQuestion !== "") {
            isSending = true;
            addMessageToChat("User", userQuestion); 
            await askQuestion(userQuestion); 
            userInput.focus();
        }
    }

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault(); 
            handleSendMessage(); 
        }
    });

    sendButton.addEventListener('click', function() {
        handleSendMessage();
    });

    newConversationBtn.addEventListener('click', function() {
        chatBox.innerHTML = ''; // Clear chat box for new conversation
        addMessageToChat("System", "New conversation started. Ask me anything!");
    });

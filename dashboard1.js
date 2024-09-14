document.addEventListener("DOMContentLoaded", function() {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const signOutBtn = document.getElementById('sign-out-btn');
    const sidebar = document.querySelector('.sidebar');
    const chatContainer = document.querySelector('.chat-container');
    const modeToggleCheckbox = document.getElementById('mode-toggle-checkbox');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');
    const chatBox = document.getElementById('chat-box');
    const newConversationBtn = document.getElementById('new-conversation-btn');

    // Predefined questions and answers
    const questions = [
        // History-related questions
        "Who was the first president of the United States?",
        "When did World War II start?",
        "Who discovered America?",
        "What is the significance of the Magna Carta?",
        "When was the Great Wall of China built?",
        "Who was Cleopatra?",
        "What caused the fall of the Roman Empire?",
        "Who was the first emperor of China?",
        "When was the Declaration of Independence signed?",
        "Who was Napoleon Bonaparte?",
        "What was the Industrial Revolution?",
        "Who invented the printing press?",
        "What was the Cold War?",
        "What is the Renaissance?",
        "Who was the first woman to win a Nobel Prize?",
        
        // Tech-related questions
        "Who is the founder of Microsoft?",
        "What is the difference between software and hardware?",
        "Who is the CEO of Apple?",
        "What is the Turing Test?",
        "What does HTTP stand for?",
        "What is the difference between the internet and the web?",
        "Who invented the World Wide Web?",
        "What is the significance of the first iPhone?",
        "What is quantum computing?",
        "What is cloud computing?",
        "What is cybersecurity?",
        "Who founded Amazon?",
        "What is the function of a microprocessor?",
        "What is artificial general intelligence (AGI)?",
        "What are autonomous vehicles?",
    
        // Famous people and wealth-related questions
        "Who is the richest person in the world?",
        "Who was the richest person in history?",
        "What is Elon Musk known for?",
        "Who is Jeff Bezos?",
        "Who founded Tesla?",
        "Who is the founder of Facebook?",
        "Who is the first trillionaire?",
        "Who was Bill Gates?",
        "Who is the richest woman in the world?",
        "What is Warren Buffett known for?",
        "Who is Mark Zuckerberg?",
        "Who is Oprah Winfrey?",
        "What is Richard Branson known for?",
        "Who is the youngest billionaire?",
        "What is Steve Jobs known for?",
        "What is blockchain technology?",
    ];
    
    const answers = [
        // History-related answers
        "The first president of the United States was George Washington.",
        "World War II started on September 1, 1939.",
        "America was discovered by Christopher Columbus in 1492.",
        "The Magna Carta, signed in 1215, is a historic document that limited the powers of the English monarchy.",
        "The Great Wall of China was built over many dynasties, with its earliest construction starting in the 7th century BC.",
        "Cleopatra was the last active ruler of the Ptolemaic Kingdom of Egypt.",
        "The fall of the Roman Empire was caused by a combination of internal weaknesses and invasions from barbarian tribes in 476 AD.",
        "The first emperor of China was Qin Shi Huang, who unified China in 221 BC.",
        "The Declaration of Independence was signed on July 4, 1776.",
        "Napoleon Bonaparte was a French military leader who became emperor of France and is known for his role in the Napoleonic Wars.",
        "The Industrial Revolution was a period of rapid industrial growth during the 18th and 19th centuries.",
        "The printing press was invented by Johannes Gutenberg in the 15th century.",
        "The Cold War was a period of geopolitical tension between the United States and the Soviet Union after World War II.",
        "The Renaissance was a cultural movement that marked the revival of art, science, and learning in Europe from the 14th to the 17th century.",
        "Marie Curie was the first woman to win a Nobel Prize, awarded in 1903 for Physics.",
    
        // Tech-related answers
        "The founder of Microsoft is Bill Gates.",
        "Software refers to the programs and operating systems used by a computer, while hardware refers to the physical components of the computer.",
        "The CEO of Apple is Tim Cook.",
        "The Turing Test is a test of a machine's ability to exhibit intelligent behavior indistinguishable from that of a human, proposed by Alan Turing.",
        "HTTP stands for HyperText Transfer Protocol.",
        "The internet is a global network of interconnected computers, while the web is a service that runs on the internet to access websites.",
        "The World Wide Web was invented by Tim Berners-Lee in 1989.",
        "The first iPhone, released in 2007, revolutionized the smartphone industry by combining a phone, an iPod, and an internet communicator.",
        "Quantum computing is a type of computing that uses quantum-mechanical phenomena, such as superposition and entanglement, to perform operations.",
        "Cloud computing is the delivery of computing services over the internet, allowing users to access data and applications remotely.",
        "Cybersecurity refers to the practice of protecting systems, networks, and programs from digital attacks.",
        "Amazon was founded by Jeff Bezos in 1994.",
        "A microprocessor is the central unit that performs the processing tasks in a computer.",
        "Artificial general intelligence (AGI) refers to a type of AI that can perform any intellectual task that a human can do.",
        "Autonomous vehicles, also known as self-driving cars, are vehicles capable of sensing their environment and navigating without human input.",
    
        // Famous people and wealth-related answers
        "As of 2024, the richest person in the world is Elon Musk, the CEO of Tesla and SpaceX.",
        "The richest person in history is believed to be Mansa Musa, the emperor of the Mali Empire in the 14th century.",
        "Elon Musk is known for founding companies such as Tesla, SpaceX, Neuralink, and The Boring Company.",
        "Jeff Bezos is the founder of Amazon and one of the wealthiest individuals in the world.",
        "Tesla was founded by Martin Eberhard and Marc Tarpenning, but Elon Musk joined the company early and became its largest shareholder and CEO.",
        "Facebook was founded by Mark Zuckerberg in 2004.",
        "Currently, there is no official trillionaire, but some forecasts suggest Elon Musk could become the first.",
        "Bill Gates is the co-founder of Microsoft and was once the richest person in the world.",
        "The richest woman in the world is Francoise Bettencourt Meyers, heiress to the L'Oréal fortune.",
        "Warren Buffett is known as one of the most successful investors in the world and is the CEO of Berkshire Hathaway.",
        "Mark Zuckerberg is the founder and CEO of Meta Platforms (formerly Facebook).",
        "Oprah Winfrey is a media mogul, talk show host, and philanthropist.",
        "Richard Branson is the founder of the Virgin Group and is known for his adventurous spirit and business ventures.",
        "As of 2024, Alexandr Wang, founder of Scale AI, is considered one of the youngest billionaires.",
        "Steve Jobs co-founded Apple and was known for his role in revolutionizing personal computing and consumer electronics.",
        "Blockchain technology is a decentralized ledger system used to securely record transactions across a network of computers."
    ];
    

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
        if (this.checked) {
            chatContainer.classList.remove('light-mode');
            chatContainer.classList.add('dark-mode');
        } else {
            chatContainer.classList.remove('dark-mode');
            chatContainer.classList.add('light-mode');
        }
    });

    // Function to add messages to chat
    function addMessageToChat(sender, message) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
    }

    // Function to get an answer for the user's question
    function getAnswer(userQuestion) {
        const questionIndex = questions.findIndex(q => userQuestion.toLowerCase().includes(q.toLowerCase()));
        if (questionIndex !== -1) {
            return answers[questionIndex];
        } else {
            return "Sorry, I don't have an answer for that right now. Can you try asking something else?";
        }
    }

    // Handle sending messages
    function handleSendMessage() {
        const userQuestion = userInput.value.trim();
        if (userQuestion !== "") {
            addMessageToChat("User", userQuestion);
            const response = getAnswer(userQuestion);
            addMessageToChat("ChatGPT", response);
            userInput.value = '';  // Clear the input field
        }
    }

    // Trigger send message when pressing Enter key
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    });

    // Trigger send message when clicking the send button
    sendButton.addEventListener('click', function() {
        handleSendMessage();
    });

    // Start new conversation
    newConversationBtn.addEventListener('click', function() {
        chatBox.innerHTML = '';  // Clear chat box for new conversation
        addMessageToChat("System", "New conversation started. Ask me anything!");
    });
    
});

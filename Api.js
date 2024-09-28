async function askQuestion() {
    const apiKey = 'AIzaSyBccnj0Xg2Y4ixEDVDfeaR2mahOt3RbSlQ';  // Replace with your actual API key
    const question = document.getElementById('question').value;

    const requestData = {
        contents: [{
            parts: [{
                text: question // Use the question from the input
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
                document.getElementById('chat-box').innerText = generatedContent;
            } else {
                console.log('Content structure is not as expected.');
                document.getElementById('chat-box').innerText = 'No content returned. Check API response structure.';
            }
        } else {
            console.log('No candidates found in response.');
            document.getElementById('chat-box').innerText = 'No content returned. Check API response structure.';
        }
    } catch (error) {
        console.error('Error fetching answer:', error);
        document.getElementById('chat-box').innerText = 'An error occurred while fetching the answer.';
    }
}
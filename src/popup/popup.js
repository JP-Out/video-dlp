async function getProgress() {
    try {
        const response = await fetch('http://localhost:5000/progress', {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        document.getElementById('progress').innerText = data.percent + '%';
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

// Update progress every second
setInterval(getProgress, 1000);
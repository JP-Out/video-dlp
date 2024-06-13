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

        const rawPercent = data.percent;
        debugger
        const percent = rawPercent.replace(/\x1b\[[0-9;]*m/g, '').trim(); // [0;94m 6.6[0m%

        // Formatar percentagem e exibir
        document.getElementById('progress').innerText = percent;
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }

    // Update progress every second
    setInterval(getProgress, 1000);

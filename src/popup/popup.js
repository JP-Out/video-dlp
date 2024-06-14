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
        const withoutPercent = rawPercent.replace(/\x1b\[[0-9;]*m/g, '').trim(); // [0;94m 6.6[0m%
        console.log(withoutPercent);
        const percent = withoutPercent.endsWith('%') ? withoutPercent: `${withoutPercent}%`;

        document.getElementById('progress-bar').innerText = percent;
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    }

    setInterval(getProgress, 1000);

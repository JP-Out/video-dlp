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
    const contentLength = data.content_length;

    const withoutPercent = rawPercent.replace(/\x1b\[[0-9;]*m/g, '').trim();
    const percent = withoutPercent.endsWith('%') ? withoutPercent : `${withoutPercent}%`;

    const progressBar = document.getElementById('progress-bar');
    const progressPercent = document.getElementById('progress-percent');

    const percentValue = parseFloat(withoutPercent);

    progressBar.style.width = percent;
    progressPercent.innerText = percent;

    const serverDonwloading = await serverIsDownloading();

    // Change background color based on percentage
    if (percentValue > 95) {
      progressBar.style.backgroundColor = '#0065ff'; // Blue
    } else if (percentValue > 75) {
      progressBar.style.backgroundColor = '#4caf50'; // Green
    } else if (percentValue > 50) {
      progressBar.style.backgroundColor = '#ffeb3b'; // Yellow
    } else if (percentValue > 25) {
      progressBar.style.backgroundColor = '#ff9800'; // Orange
    } else {
      progressBar.style.backgroundColor = '#f44336'; // Red
    }

    console.log(`Percent: ${percent}, Content Length: ${contentLength}`);

  } catch (error) {
    
    console.warn('There has been a problem with your fetch operation:', error);
    document.getElementById('warn').innerText = 'Conection Error:\nMake sure you have started the server in app.py';
  }
}

// async function serverIsDownloading() {
//   const response = await fetch('http://localhost:5000/status', {
//     method: 'GET',
//     mode: 'cors',
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });
  
//   const data = await response.json();

//   const serverStatus = data.status;
//   return serverStatus === 'downloading';
// }

// const serverDownloading = serverIsDownloading();

// if (serverDownloading){
//   setInterval(getProgress, 1000);
// }

setInterval(getProgress, 1000);
const downloaderStatus = document.getElementById('status');

function enableProgressBar() {
  if (!document.getElementById('progress-bar')) {
    // Create ProgressBar div
    var elementProgressBar = document.createElement('div');
    elementProgressBar.id = 'progress-bar';

    // Create ProgressFill div
    var elementProgressFill = document.createElement('div');
    elementProgressFill.id = 'progress-fill';

    // Add ProgressFill inside ProgressBar
    elementProgressBar.appendChild(elementProgressFill);

    // Add ProgressBar inside ProgressContainer
    document.getElementById('progress-container').appendChild(elementProgressBar);

    var elementProgressPercent = document.createElement('div');
    elementProgressPercent.id = 'progress-percent';
    elementProgressPercent.textContent = '0%';

    // Add ProgressPercent inside ProgressContainer
    document.getElementById('progress-container').appendChild(elementProgressPercent);
  }
}

async function fetchFromServer(endpoint) {
  try {
    const response = await fetch(`http://localhost:5000/${endpoint}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }

    return await response.json();
  } catch {
    downloaderStatus.innerText = 'Connection Error: Make sure you have started the server in app.py';
    downloaderStatus.style.color = '#f44336'; // Red
    return null;
  }
}

async function getProgress() {
  const data = await fetchFromServer('progress');
  if (!data) return;

  const rawPercent = data.percent;
  const withoutPercent = rawPercent.replace(/\x1b\[[0-9;]*m/g, '').trim();
  const percent = withoutPercent.endsWith('%') ? withoutPercent : `${withoutPercent}%`;

  const progressFill = document.getElementById('progress-fill');
  const progressPercent = document.getElementById('progress-percent');

  const percentValue = parseFloat(withoutPercent);

  progressFill.style.width = percent;
  progressPercent.innerText = percent;

  // Change background color based on percentage
  if (percentValue > 95) {
    progressFill.style.backgroundColor = '#0065ff'; // Blue
  } else if (percentValue > 75) {
    progressFill.style.backgroundColor = '#4caf50'; // Green
  } else if (percentValue > 50) {
    progressFill.style.backgroundColor = '#ffeb3b'; // Yellow
  } else if (percentValue > 25) {
    progressFill.style.backgroundColor = '#ff9800'; // Orange
  } else {
    progressFill.style.backgroundColor = '#f44336'; // Red
  }

  let title = data.title;
  if (title.length > 70) {
    title = title.substring(0, 67).trimEnd() + '...';
  }

  downloaderStatus.style.color = '#ffff'
  downloaderStatus.innerHTML = `Downloading video: <span class="video-title">${title}</span>`;
  console.log(`Percent: ${percent}`);
}

async function getServerStatus() {
  const data = await fetchFromServer('status');
  if (!data) return;
  return data.status;
}

async function checkAndStartProgress() {
  const serverStatus = await getServerStatus();

  // data.download_finished;
  if (serverStatus === 'downloading') {
    enableProgressBar();
    setInterval(getProgress, 500);

  } else if (serverStatus === 'idle') {
    downloaderStatus.innerText = 'Server is running. Waiting for a link...';
    downloaderStatus.style.color = '#ffffff'; // White
  }
}

// Call the function to check the server status and start progress monitoring
checkAndStartProgress();

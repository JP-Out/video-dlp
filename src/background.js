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

async function is_finish_download() {
    const data = await fetchFromServer('status');
    if (!data) return false;

    return data.download_finished;
}

async function download_notify() {
    const is_finished = await is_finish_download();

    if (is_finished) {
        chrome.action.setBadgeBackgroundColor({ color: '#FF0000' });
        chrome.action.setBadgeText({ text: '1' });
    }
}

// Function to periodically check the progress
async function monitorDownloadProgress() {
    const intervalId = setInterval(async () => {
        const is_finished = await is_finish_download();

        if (is_finished) {
            await download_notify(); // Notifies that the download has completed
            clearInterval(intervalId); // Stops checking after the download is finished
        }
    }, 1000);  // Checks the status every 1 second
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "FinderVideoContextMenu",
        title: "Baixar video na resolução...",
        contexts: ["all"]
    });

    const resolutions = ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'];
    resolutions.forEach(resolution => {
        chrome.contextMenus.create({
            id: `FinderVideoContextMenu-${resolution}`,
            parentId: "FinderVideoContextMenu",
            title: `Baixar em ${resolution}`,
            contexts: ["all"]
        });
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    const resolutions = ['2160p', '1440p', '1080p', '720p', '480p', '360p', '240p', '144p'];
    const resolution = resolutions.find(res => info.menuItemId.endsWith(res));

    if (resolution) {
        console.log(`Menu de contexto clicado para ${resolution}`);
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: (resolution) => {
                let videoUrl = window.location.href;
                console.log('Video URL found:', videoUrl);

                function sendLink(videoUrl, resolution) {
                    console.log('Enviando URL:', videoUrl, 'Resolução:', resolution);
                    fetch('http://localhost:5000/download', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ url: videoUrl, resolution: resolution })
                    })
                        .then(response => response.json())
                        .then(data => console.log('Success:', data))
                        .catch((error) => console.error('Error:', error));
                }

                sendLink(videoUrl, resolution);
            },
            args: [resolution]
        }, (results) => {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
            } else {
                console.log("Script executado:", results);
                monitorDownloadProgress();
            }
        });
    }
});
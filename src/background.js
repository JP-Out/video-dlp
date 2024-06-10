chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "FinderVideoContextMenu",
        title: "Baixar video na resolução...",
        contexts: ["all"]
    });

    const resolutions = ['2160p', '1080p', '720p', '480p', '360p', '240p', '144p'];
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
            }
        });
    }
});

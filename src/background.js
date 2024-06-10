chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "FinderVideoContextMenu",
        title: "Item de teste",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "FinderVideoContextMenu"){
        chrome.scripting.executeScript({
            target: { tabId : tab.id },
            function: getYoutubeUrl
        });
    }
});

function getYoutubeUrl() {
    let videoUrl = window.location.href;
    console.log('Video URL found:', videoUrl);
    return videoUrl;
}

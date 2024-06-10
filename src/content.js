// function findVideoUrls(){
//     let videosUrls = [];

//     let videoElements = document.querySelectorAll('video');
//     videoElements.forEach (video => {
//         if (video.src) {
//             videosUrls.push(video.src);
//         } else {
//             // Caso os vídeos usem <source> tags
//             let sourceElements = video.querySelectorAll('source');
//             sourceElements.forEach (source => {
//                 if (source.src) {
//                     videosUrls.push(source.src);    
//                 }
//             });
//         }
//     });

//     let iframeElements = document.querySelectorAll('iframe');
//     iframeElements.forEach (iframe => {
//         if (iframe.src.includes('youtube.com/embed/') || iframe.src.includes('youtube.com/v/') || iframe.src.includes('youtube.com/watch?v=')){
//             videosUrls.push(iframe.src);
//         } else if (iframe.src.includes('player.vimeo.com/video/')) {
//             videoUrls.push(iframe.src);
//         }
//     });

//     return videosUrls;
// }

// let videoUrls = findVideoUrls();
// console.log('Video URLs found:', videoUrls);

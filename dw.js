// dw.js

document.addEventListener('DOMContentLoaded', function() {
    const apiUrls = {
        tiktokVideo: 'https://widipe.com/download/ttdl?url=',
        tiktokAudio: 'https://widipe.com/download/ttdl?url=',
        instagram: 'https://api.betabotz.eu.org/api/download/fbdown?url=',
        facebook: 'https://skizo.tech/api/facebook?apikey=avatar&url=',
        youtubeVideo: 'https://skizo.tech/api/y2mate?apikey=avatar&url=',
        youtubeAudio: 'https://skizo.tech/api/y2mate?apikey=avatar&url='
    };

    function handleDownload(platform, type) {
        const urlInput = document.getElementById(`${platform}-url`);
        const downloadButton = document.getElementById(`${platform}-download`);
        const loadingSpinner = document.getElementById(`${platform}-loading`);
        const downloadLink = document.getElementById(`${platform}-link`);
        const audioLink = document.getElementById(`${platform}-audio-link`);

        downloadButton.addEventListener('click', async function() {
            const url = urlInput.value.trim();
            if (url) {
                loadingSpinner.classList.add('loading-active');
                try {
                    const response = await fetch(apiUrls[`${platform}${type}`] + encodeURIComponent(url));
                    const data = await response.json();
                    if (data.success && data.url) {
                        if (type === 'Video') {
                            downloadLink.href = data.url;
                            downloadLink.textContent = 'Download Video';
                            downloadLink.classList.remove('hidden-link');
                        } else if (type === 'Audio') {
                            audioLink.href = data.url;
                            audioLink.textContent = 'Download Audio';
                            audioLink.classList.remove('hidden-link');
                        }
                    } else {
                        alert('Failed to get download link');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('An error occurred. Please try again.');
                } finally {
                    loadingSpinner.classList.remove('loading-active');
                }
            } else {
                alert('Please enter a URL');
            }
        });
    }

    handleDownload('tiktok', 'Video');
    handleDownload('tiktok', 'Audio');
    handleDownload('instagram', 'Link');
    handleDownload('facebook', 'Link');
    handleDownload('youtube', 'Video');
    handleDownload('youtube', 'Audio');
});

$(document).ready(function() {
    // Toggle overlay visibility
    $('.tribal-icon').click(function() {
        $('.overlay').toggle();
    });

    $('.close-btn').click(function() {
        $('.overlay').hide();
    });

    // Handle form submissions
    $('#tiktok-form').submit(function(event) {
        event.preventDefault();
        var url = $('#tiktok-url').val();
        if ($('#download-mp4').is(':visible')) {
            handleDownload(url, 'https://widipe.com/download/ttdl?url=', '#tiktok-loading', 'video');
        } else if ($('#download-audio').is(':visible')) {
            handleDownload(url, 'https://widipe.com/download/ttdl?url=', '#tiktok-loading', 'audio');
        }
    });

    $('#instagram-form').submit(function(event) {
        event.preventDefault();
        handleDownload($('#instagram-url').val(), 'https://widipe.com/download/igdl?url=', '#instagram-loading', 'video');
    });

    $('#facebook-form').submit(function(event) {
        event.preventDefault();
        handleDownload($('#facebook-url').val(), 'https://api.shannmoderz.xyz/downloader/facebook?url=', '#facebook-loading', 'video');
    });

    $('#youtube-form').submit(function(event) {
        event.preventDefault();
        var url = $('#youtube-url').val();
        if ($('#download-youtube-mp4').is(':visible')) {
            handleDownload(url, 'https://skizo.tech/api/y2mate?apikey=avatar&url=', '#youtube-loading', 'video');
        } else if ($('#download-youtube-audio').is(':visible')) {
            handleDownload(url, 'https://skizo.tech/api/y2mate?apikey=avatar&url=', '#youtube-loading', 'audio');
        }
    });

    // Generic download handling function
    function handleDownload(url, apiUrl, loaderSelector, type) {
        $(loaderSelector).show();
        fetch(apiUrl + encodeURIComponent(url))
            .then(response => response.json())
            .then(data => {
                $(loaderSelector).hide();
                var downloadUrl = '';
                if (type === 'video') {
                    downloadUrl = getVideoUrl(data);
                } else if (type === 'audio') {
                    downloadUrl = getAudioUrl(data);
                }

                if (downloadUrl) {
                    $('#hidden-link').attr('href', downloadUrl).attr('download', downloadUrl.split('/').pop()).get(0).click();
                } else {
                    alert('Terjadi kesalahan, coba lagi nanti.');
                }
            })
            .catch(error => {
                $(loaderSelector).hide();
                console.error('Error:', error);
                alert('Terjadi kesalahan, coba lagi nanti.');
            });
    }

    function getVideoUrl(data) {
        // Update with actual data parsing logic
        if (data.result && data.result.video) {
            return data.result.video[0];
        }
        return '';
    }

    function getAudioUrl(data) {
        // Update with actual data parsing logic
        if (data.result && data.result.audio) {
            return data.result.audio[0];
        }
        return '';
    }
});

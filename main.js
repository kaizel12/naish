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
        handleDownload('#tiktok-url', 'https://widipe.com/download/ttdl?url=', '#tiktok-loading');
    });

    $('#instagram-form').submit(function(event) {
        event.preventDefault();
        handleDownload('#instagram-url', 'https://widipe.com/download/igdl?url=', '#instagram-loading');
    });

    $('#facebook-form').submit(function(event) {
        event.preventDefault();
        handleDownload('#facebook-url', 'https://api.shannmoderz.xyz/downloader/facebook?url=', '#facebook-loading');
    });

    $('#youtube-form').submit(function(event) {
        event.preventDefault();
        handleDownload('#youtube-url', 'https://skizo.tech/api/y2mate?apikey=avatar&url=', '#youtube-loading');
    });

    // Generic download handling function
    function handleDownload(urlSelector, apiUrl, loaderSelector) {
        var url = $(urlSelector).val();
        if (url) {
            $(loaderSelector).show();
            fetch(apiUrl + encodeURIComponent(url))
                .then(response => response.json())
                .then(data => {
                    $(loaderSelector).hide();
                    var downloadUrl = '';
                    if (urlSelector === '#tiktok-url') {
                        if ($('#download-mp4').is(':visible')) {
                            downloadUrl = data.result.video[0]; // MP4 URL
                        } else if ($('#download-audio').is(':visible')) {
                            downloadUrl = data.result.audio[0]; // Audio URL
                        }
                    } else if (urlSelector === '#instagram-url') {
                        downloadUrl = data.result[0].url; // Instagram URL
                    } else if (urlSelector === '#facebook-url') {
                        downloadUrl = data.result[0].downloadLink; // Facebook URL
                    } else if (urlSelector === '#youtube-url') {
                        if ($('#download-youtube-mp4').is(':visible')) {
                            downloadUrl = data.formats.video.mp4[0].convert; // MP4 URL
                        } else if ($('#download-youtube-audio').is(':visible')) {
                            downloadUrl = data.formats.audio[0].convert; // Audio URL
                        }
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
    }
});

$(document).ready(function () {
    function handleFormSubmit(formId, apiUrl, loadingId, buttonId) {
        $(formId).submit(function (event) {
            event.preventDefault();
            var button = $(this).find(buttonId);
            var url = $(this).find('input').val();
            var isAudio = buttonId === '#download-audio' || buttonId === '#download-youtube-audio';

            button.prop('disabled', true); // Disable button
            $(loadingId).addClass('loading-active'); // Show loading spinner

            $.get(apiUrl + encodeURIComponent(url), function (data) {
                var downloadUrl;

                if (formId === '#instagram-form') {
                    downloadUrl = data.result[0].url;
                } else if (formId === '#tiktok-form') {
                    if (isAudio) {
                        downloadUrl = data.result.audio[0]; // Assuming the response contains audio URLs
                    } else {
                        downloadUrl = data.result.video[0]; // MP4 URL
                    }
                } else if (formId === '#facebook-form') {
                    downloadUrl = data.result[0].downloadLink; // Adjusted for Facebook response structure
                } else if (formId === '#youtube-form') {
                    if (isAudio) {
                        downloadUrl = data.formats.audio.mp3.find(item => item.quality === 320).convert; // Using the provided mp3 link for the highest quality
                    } else {
                        downloadUrl = data.formats.video.mp4.find(item => item.quality === "1080p60").convert; // Using the provided mp4 link for the highest quality
                    }
                }

                if (downloadUrl) {
                    var link = document.getElementById('hidden-link');
                    link.href = downloadUrl;
                    link.download = downloadUrl.split('/').pop();
                    link.click();
                } else {
                    alert('Terjadi kesalahan, coba lagi nanti.');
                }
            }).fail(function () {
                alert('Terjadi kesalahan, coba lagi nanti.');
            }).always(function () {
                button.prop('disabled', false); // Re-enable button
                $(loadingId).removeClass('loading-active'); // Hide loading spinner
            });
        });
    }

    handleFormSubmit('#tiktok-form', 'https://widipe.com/download/ttdl?url=', '#tiktok-loading', '#download-mp4');
    $('#download-audio').click(function () {
        var url = $('#tiktok-url').val();
        var button = $(this);
        var loadingId = '#tiktok-loading';

        button.prop('disabled', true); // Disable button
        $(loadingId).addClass('loading-active'); // Show loading spinner

        $.get('https://widipe.com/download/ttdl?url=' + encodeURIComponent(url), function (data) {
            var downloadUrl = data.result.audio[0]; // Assuming the response contains audio URLs

            if (downloadUrl) {
                var link = document.getElementById('hidden-link');
                link.href = downloadUrl;
                link.download = downloadUrl.split('/').pop();
                link.click();
            } else {
                alert('Terjadi kesalahan, coba lagi nanti.');
            }
        }).fail(function () {
            alert('Terjadi kesalahan, coba lagi nanti.');
        }).always(function () {
            button.prop('disabled', false); // Re-enable button
            $(loadingId).removeClass('loading-active'); // Hide loading spinner
        });
    });

    handleFormSubmit('#instagram-form', 'https://widipe.com/download/igdl?url=', '#instagram-loading', 'button');
    handleFormSubmit('#facebook-form', 'https://api.shannmoderz.xyz/downloader/facebook?url=', '#facebook-loading', 'button');
    handleFormSubmit('#youtube-form', 'https://skizo.tech/api/y2mate?apikey=avatar&url=', '#youtube-loading', '#download-youtube-mp4');
    
    $('#download-youtube-audio').click(function () {
        var url = $('#youtube-url').val();
        var button = $(this);
        var loadingId = '#youtube-loading';

        button.prop('disabled', true); // Disable button
        $(loadingId).addClass('loading-active'); // Show loading spinner

        $.get('https://skizo.tech/api/y2mate?apikey=avatar&url=' + encodeURIComponent(url), function (data) {
            var downloadUrl = data.formats.audio.mp3.find(item => item.quality === 320).convert; // Using the provided mp3 link for the highest quality

            if (downloadUrl) {
                var link = document.getElementById('hidden-link');
                link.href = downloadUrl;
                link.download = downloadUrl.split('/').pop();
                link.click();
            } else {
                alert('Terjadi kesalahan, coba lagi nanti.');
            }
        }).fail(function () {
            alert('Terjadi kesalahan, coba lagi nanti.');
        }).always(function () {
            button.prop('disabled', false); // Re-enable button
            $(loadingId).removeClass('loading-active'); // Hide loading spinner
        });
    });
});

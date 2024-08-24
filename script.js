$(document).ready(function() {
    $('#tiktok-form').submit(function(event) {
        event.preventDefault(); // Mencegah reload halaman
        var url = $('#tiktok-url').val();
        var apiUrl = `https://apikeykaizel.vercel.app/api/tiktok?url=${encodeURIComponent(url)}`;

        $.get(apiUrl, function(data) {
            console.log('TikTok data received:', data);
            var videoUrl = data.result.video;

            if (videoUrl) {
                var link = $('#tiktok-link');
                link.attr('href', videoUrl);
                link.show();
                link.get(0).click(); // Memicu klik otomatis
            } else {
                alert('Video TikTok tidak tersedia.');
            }
        }).fail(function() {
            alert('Gagal mengambil data dari TikTok.');
        });
    });

    $('#instagram-form').submit(function(event) {
        event.preventDefault();
        var url = $('#instagram-url').val();
        var apiUrl = `https://api.shannmoderz.xyz/downloader/instagram?url=${encodeURIComponent(url)}`;

        $.get(apiUrl, function(data) {
            console.log('Instagram data received:', data);
            var videoUrl = data.result.videoUrl;

            if (videoUrl) {
                var link = $('#instagram-link');
                link.attr('href', videoUrl);
                link.show();
                link.get(0).click();
            } else {
                alert('Video Instagram tidak tersedia.');
            }
        }).fail(function() {
            alert('Gagal mengambil data dari Instagram.');
        });
    });

    $('#facebook-form').submit(function(event) {
        event.preventDefault();
        var url = $('#facebook-url').val();
        var apiUrl = `https://skizo.tech/api/facebook?apikey=avatar&url=${encodeURIComponent(url)}`;

        $.get(apiUrl, function(data) {
            console.log('Facebook data received:', data);
            var videoUrl = data.find(video => video.quality === 'HD')?.url;

            if (videoUrl) {
                var link = $('#facebook-link');
                link.attr('href', videoUrl);
                link.show();
                link.get(0).click();
            } else {
                alert('Video Facebook HD tidak tersedia.');
            }
        }).fail(function() {
            alert('Gagal mengambil data dari Facebook.');
        });
    });

    $('#youtube-form').submit(function(event) {
        event.preventDefault();
        var url = $('#youtube-url').val();
        var apiUrl = `https://skizo.tech/api/y2mate?apikey=avatar&url=${encodeURIComponent(url)}`;

        $.get(apiUrl, function(data) {
            console.log('YouTube data received:', data);
            var videoUrl = data.formats.video.mp4.find(format => format.quality === '480p')?.convert;

            if (videoUrl) {
                var link = $('#youtube-link');
                link.attr('href', videoUrl);
                link.show();
                link.get(0).click();
            } else {
                alert('Video YouTube dengan kualitas 480p tidak tersedia.');
            }
        }).fail(function() {
            alert('Gagal mengambil data dari YouTube.');
        });
    });
});

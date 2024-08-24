$(document).ready(function() {
    // Fungsi untuk mengatur pengunduhan TikTok
    $('#tiktok-form').submit(function(event) {
        event.preventDefault();
        var url = $('#tiktok-url').val();
        var apiUrl = `https://apikeykaizel.vercel.app/api/tiktok?url=${encodeURIComponent(url)}`;

        $.get(apiUrl, function(data) {
            var videoUrl = data.result.video;
            if (videoUrl) {
                var link = document.createElement('a');
                link.href = videoUrl;
                link.download = 'video.mp4';
                link.click(); // Otomatis download
            } else {
                alert('Video TikTok tidak tersedia.');
            }
        }).fail(function() {
            alert('Gagal mengambil data dari TikTok.');
        });
    });

    // Fungsi untuk mengatur pengunduhan Instagram
    $('#instagram-form').submit(function(event) {
        event.preventDefault();
        var url = $('#instagram-url').val();
        var apiUrl = `https://api.shannmoderz.xyz/downloader/instagram?url=${encodeURIComponent(url)}`;

        $.get(apiUrl, function(data) {
            var videoUrl = data.result.videoUrl;
            if (videoUrl) {
                var link = document.createElement('a');
                link.href = videoUrl;
                link.download = 'video.mp4';
                link.click(); // Otomatis download
            } else {
                alert('Video Instagram tidak tersedia.');
            }
        }).fail(function() {
            alert('Gagal mengambil data dari Instagram.');
        });
    });

    // Fungsi untuk mengatur pengunduhan Facebook
    $('#facebook-form').submit(function(event) {
        event.preventDefault();
        var url = $('#facebook-url').val();
        var apiUrl = `https://skizo.tech/api/facebook?apikey=avatar&url=${encodeURIComponent(url)}`;

        $.get(apiUrl, function(data) {
            var videoUrl = data.find(video => video.quality === 'HD')?.url;
            if (videoUrl) {
                var link = document.createElement('a');
                link.href = videoUrl;
                link.download = 'video.mp4';
                link.click(); // Otomatis download
            } else {
                alert('Video Facebook HD tidak tersedia.');
            }
        }).fail(function() {
            alert('Gagal mengambil data dari Facebook.');
        });
    });

    // Fungsi untuk mengatur pengunduhan YouTube
    $('#youtube-form').submit(function(event) {
        event.preventDefault();
        var url = $('#youtube-url').val();
        var apiUrl = `https://skizo.tech/api/y2mate?apikey=avatar&url=${encodeURIComponent(url)}`;

        $.get(apiUrl, function(data) {
            var videoUrl = data.formats.video.mp4.find(format => format.quality === '480p')?.convert;
            if (videoUrl) {
                var link = document.createElement('a');
                link.href = videoUrl;
                link.download = 'video.mp4';
                link.click(); // Otomatis download
            } else {
                alert('Video YouTube dengan kualitas 480p tidak tersedia.');
            }
        }).fail(function() {
            alert('Gagal mengambil data dari YouTube.');
        });
    });
});

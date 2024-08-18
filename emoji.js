(function() {
    'use strict';

    function updateEmoji() {
        chrome.storage.sync.get('emoji', (data) => {
            const emoji = data.emoji || '👀';

            fetch('https://api.omg.lol/statuslog/emoji/' + encodeURIComponent(emoji))
                .then((response) => response.json())
                .then((data) => {
                    let emojiImg = document.getElementById('emoji_img');
                    let glyph = document.getElementById('glyph');
                    if (emojiImg && glyph) {
                        emojiImg.setAttribute('src', data.response.img);
                        glyph.value = data.response.emoji;
                    }
                })
                .catch((error) => console.error('API request error:', error));
        });
    }

    window.addEventListener('load', updateEmoji);
})();

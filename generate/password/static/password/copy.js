document.addEventListener('DOMContentLoaded', function() {
    const copyButton = document.getElementById('copy-for-js');
    const passwordElement = document.getElementById('pass-for-js');

    if (copyButton && passwordElement) {
        copyButton.addEventListener('click', function() {
            const password = passwordElement.textContent;

            navigator.clipboard.writeText(password).then(() => {
                copyButton.textContent = 'СКОПИРОВАНО!';
                copyButton.classList.add('copied');

                setTimeout(() => {
                    copyButton.textContent = 'СКОПИРОВАТЬ';
                    copyButton.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                const range = document.createRange();
                range.selectNode(passwordElement);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);

                try {
                    document.execCommand('copy');
                    copyButton.textContent = 'СКОПИРОВАНО!';
                    copyButton.classList.add('copied');

                    setTimeout(() => {
                        copyButton.textContent = 'СКОПИРОВАТЬ';
                        copyButton.classList.remove('copied');
                    }, 2000);
                } catch (e) {
                    alert('Не удалось скопировать пароль. Попробуйте вручную.');
                }

                window.getSelection().removeAllRanges();
            });
        });
    }
});

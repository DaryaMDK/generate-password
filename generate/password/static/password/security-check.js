document.addEventListener('DOMContentLoaded', function() {
    const checkBtn = document.getElementById('check-btn');
    const passwordInput = document.getElementById('password-input');
    const resultBox = document.getElementById('security-result');
    const resultText = document.getElementById('result-text');

    if (checkBtn && passwordInput) {
        checkBtn.addEventListener('click', function() {
            const password = passwordInput.value.trim();

            if (!password) {
                resultText.textContent = '⚠️ Пожалуйста, введите пароль';
                resultText.className = 'error';
                resultBox.style.display = 'block';
                return;
            }

            fetch('/check-ajax/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'X-CSRFToken': getCookie('csrftoken')
                },
                body: 'password=' + encodeURIComponent(password)
            })
            .then(response => response.json())
            .then(data => {
                resultText.textContent = data.result;
                resultText.className = data.result.includes('безопасен') ? 'success' : 'error';
                resultBox.style.display = 'block';
            })
            .catch(error => {
                console.error('Ошибка:', error);
                resultText.textContent = '⚠️ Ошибка при проверке пароля';
                resultText.className = 'error';
                resultBox.style.display = 'block';
            });
        });

        // Проверка при нажатии Enter
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                checkBtn.click();
            }
        });
    }
});

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

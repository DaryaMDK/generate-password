# Генератор паролей на Django

Веб-приложение для генерации безопасных паролей с проверкой их надёжности.


## Возможности

- Генерация паролей с настройкой длины и типов символов
- Копирование пароля в буфер обмена
- Проверка пароля на безопасность


## Технологии

- Django 5.0.6
- Python 3.12.4
- Ruff (линтер и форматтер)
- Pre-commit хуки


## Установка и запуск

```bash
# Клонирование репозитория
git clone https://github.com/DaryaMDK/generate-password.git
cd generate-password

# Создание виртуального окружения
python -m venv .venv

# Активация (Windows)
.venv\Scripts\activate

# Установка зависимостей
pip install -r requirements.txt

# Запуск сервера
python manage.py runserver

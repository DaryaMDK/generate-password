import re
import secrets
import string

from django.shortcuts import render

from .forms import PassOptionForm


def generate_password(length, use_uppercase, use_digits, use_special_chars):
    """Генерация пароль с различными комбинациями."""
    characters = string.ascii_lowercase
    if use_uppercase:
        characters += string.ascii_uppercase
    if use_digits:
        characters += string.digits
    if use_special_chars:
        characters += string.punctuation
    if not characters:
        return 'Ошибка: выберите хотя бы один тип символов'

    return ''.join(secrets.choice(characters) for _ in range(length))


def check_password(password):
    """Проверка пароля на безопасность."""
    if (
        len(password) > 7
        and re.search(r'[A-Z]', password)
        and re.search(r'[a-z]', password)
        and re.search(r'\d', password)
    ):
        return 'Пароль безопасен'
    return 'Пароль небезопасен'


def index(request):
    """Обработчик данных, полученных методом POST (генерация и проверка пароля)."""
    form = PassOptionForm()
    pass_value = None
    check_result = None

    if request.method == 'POST':
        if 'generate' in request.POST:
            form = PassOptionForm(request.POST)
            if form.is_valid():
                length = form.cleaned_data['length']
                use_uppercase = form.cleaned_data['use_uppercase']
                use_digits = form.cleaned_data['use_digits']
                use_special_chars = form.cleaned_data['use_special_chars']
                pass_value = generate_password(
                    length, use_uppercase, use_digits, use_special_chars
                )

        elif 'check' in request.POST:
            password = request.POST.get('password', '')
            if password:
                check_result = check_password(password)
            else:
                check_result = 'Пожалуйста, введите пароль'

    return render(
        request,
        'password/index.html',
        {
            'form': form,
            'pass_key': pass_value,
            'check_result': check_result,
        },
    )

from django import forms


class PassOptionForm(forms.Form):
    """Класс для формы генерации паролей с разными параметрами."""

    length = forms.IntegerField(
        label='Длина пароля (от 7 до 35 символов)',
        min_value=7,
        max_value=35,
        initial=15,
    )
    use_uppercase = forms.BooleanField(
        label='Заглавные буквы (от A до Z)',
        initial=True,
        required=False,
    )
    use_digits = forms.BooleanField(
        label='Цифры (от 0 до 9)',
        initial=True,
        required=False,
    )
    use_special_chars = forms.BooleanField(
        label='Специальные символы (!"#$%& и другие)',
        initial=False,
        required=False,
    )

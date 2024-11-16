from django import forms
from django.contrib.auth.models import User
from .models import Profile
# for login 
class LoginForm(forms.Form):
    username = forms.CharField()
    password = forms.CharField(widget=forms.PasswordInput)


# for signup
class UserRegistrationForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']

    password = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder' : 'your password',
    }))

    password2 = forms.CharField(widget=forms.PasswordInput(attrs={
        'placeholder' : 'Repeat password',
    }))


    def clean_password2(self):
        cd = self.cleaned_data
        if cd['password'] != cd['password2']:
            raise forms.ValidationError("Passwords don't match.")
        return cd['password2']

    def clean_email(self):
        data = self.cleaned_data['email']

        if User.objects.filter(email=data).exists():
            raise forms.ValidationError('Email already in use.')

            return data

class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username','first_name', 'last_name', 'email']

    username = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder' : 'Username',
    }))

    first_name = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder' : 'joe',
    }))

    last_name = forms.CharField(widget=forms.TextInput(attrs={
        'placeholder' : 'doe',
    }))

    email = forms.CharField(widget=forms.EmailInput(attrs={
        'placeholder' : 'youraddress@gmail.com',
    }))

    def clean_email(self):
        data = self.cleaned_data['email']
        qs = User.objects.exclude(id=self.instance.id).filter(email=data)
        if qs.exists():
            raise forms.ValidationError('Email already in use')
            return data
            
class ProfileEditForm(forms.ModelForm):
    class Meta:
        model = Profile
        fields = ['date_of_birth', 'photo']

    date_of_birth = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))

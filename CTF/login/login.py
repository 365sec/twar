from django.shortcuts import render, redirect
from functools import wraps


def re_login(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        print username, password
        html_template = 'index.html'
        return (request, html_template)
    else:
        html_template = 'login.html'
        return render(request, html_template)


def check_login(f):
    @wraps(f)
    def inner(request, *arg, **kwargs):
        if 1:
            return f(request, *arg, **kwargs)
        else:
            return redirect('/login/login')

    return inner

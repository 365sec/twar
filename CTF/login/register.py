from django.http import HttpResponseRedirect
from django.shortcuts import render


def re_register(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        remark = request.POST.get('remark')
        print username, password, remark
        html_template = 'login.html'
        return HttpResponseRedirect('/login/login')

    else:
        html_template = 'register.html'
        return render(request, html_template)

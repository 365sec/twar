from django.shortcuts import render
from login.login import check_login

@check_login
def re_index(request):
    html_template = 'index.html'
    return render(request, html_template)
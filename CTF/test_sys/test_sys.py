from django.shortcuts import render
from login_register.login import check_login

@check_login
def re_test_sys(request):
    html_template = 'test_sys.html'
    return render(request, html_template)
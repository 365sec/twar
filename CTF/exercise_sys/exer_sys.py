from django.shortcuts import render
from login_register.login import check_login

@check_login
def re_exercise_sys(request):
    html_template = 'exercise_test.html'
    return render(request, html_template)
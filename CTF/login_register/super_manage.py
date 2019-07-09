from django.shortcuts import render


def re_manage(request):
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        print username,password
        html_template='manage.html'
        return render(request, html_template)
    else:
        html_template='manage.html'
        return render(request,html_template)
from django.shortcuts import render

def re_megagame_detail(request):

    html_template = 'mega_detail.html'
    return render(request, html_template)
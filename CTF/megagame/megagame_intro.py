from django.shortcuts import render

def re_megagame_intro(request):
    html_template = 'megagame_intro.html'
    return render(request, html_template)
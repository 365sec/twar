from django.shortcuts import render
def re_head(request):
    html_template = 'head_content.html'
    return render(request, html_template)
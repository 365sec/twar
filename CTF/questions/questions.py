import json
from django.http import HttpResponse
from django.shortcuts import render
from models import models


def re_question(request):
    qu_id = request.GET.get('qu_id')
    qu_class = request.GET.get('qu_class')
    temp = models.Question.objects.get(qu_id=qu_id, qu_class=qu_class)
    if temp.qu_class == 0:
        html_template = 'choice_template.html'
    elif temp.qu_class == 1:
        html_template = 'operator_template.html'
    elif temp.qu_class == 2:
        html_template = 'flag_template.html'
    else:
        return HttpResponse(request, 'no page')
    return render(request, html_template, {'data': temp})


def re_check_result(request):
    qu_id = request.POST.get('qid')
    qu_class = request.POST.get('type')
    answer = request.POST.get('answer')
    temp = models.Question.objects.get(qu_id=qu_id, qu_class=qu_class)
    if temp.qu_correction == answer:
        data = {
            "code": 200,
            'data': {
                'CorrectAnswer': temp.qu_correction,
                'AnswerIsRight': "true"
            },
            'massage': 'success'
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    elif temp.qu_correction != answer:
        data = {
            "code": 200,
            'data': {
                'CorrectAnswer': temp.qu_correction,
                'AnswerIsRight': "false"
            },
            'massage': 'success'
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        data = {
            "code": 400,
        }
        return HttpResponse(json.dumps(data), content_type='application/json')

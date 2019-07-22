#coding=utf-8

from django.core.paginator import PageNotAnInteger, InvalidPage, EmptyPage, Paginator
import json
from django.http import HttpResponse
from django.shortcuts import render
from mysql import models


def re_pages(request):
    if request.method == "GET":
        sort = request.GET.get('sort')
        kind = request.GET.get('kind')
        if not kind:
            kind = "理论知识"
        if not sort:
            sort = 'default'
        if sort == 'hottest':
            question_temp = models.ExerciseQuestion.objects.filter(kind = kind ).order_by('-pageview')
        elif sort == 'newest':
            question_temp= models.ExerciseQuestion.objects.filter(kind = kind).order_by('-id')
        else:
            question_temp = models.ExerciseQuestion.objects.filter(kind = kind).order_by('-pageview')

        paginator = Paginator(question_temp, 20)
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page')
        if not page:
            page =1
        try:
            question_list = paginator.page(page)
        # todo: 注意捕获异常
        except PageNotAnInteger:
            # 如果请求的页数不是整数, 返回第一页。
            question_list = paginator.page(1)
        except InvalidPage:
            # 如果请求的页数不存在, 重定向页面
            return HttpResponse('找不到页面的内容')
        except EmptyPage:
            # 如果请求的页数不在合法的页数范围内，返回结果的最后一页。
            question_list = paginator.page(paginator.num_pages)
    template_view = 'exer_system.html'
    return render(request, template_view, {'question_list': question_list,'page':page,'sort':sort,'num_pages':paginator.num_pages,'kind':kind})


def re_question(request):
    id = request.GET.get('id')
    temp=models.Question.objects.get(id=id)
    if temp.type == 0:
        html_template = 'choice_template.html'
    elif temp.type == 1:
        html_template = 'operator_template.html'
    elif temp.type ==2:
        html_template = 'flag_template.html'
    else:
        return HttpResponse(request,'no page')
    return render(request, html_template,{'data':temp})

def re_check_result(request):
    id = request.POST.get('qid')
    print id
    answer=request.POST.get('answer')
    temp=models.Question.objects.get(id=id)
    if temp.correction == answer:
        data={
            "code": 200,
            'data': {'CorrectAnswer': temp.correction, 'AnswerIsRight': "true"},
            'massage':'success'
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    elif temp.correction != answer:
        data = {
            "code": 200,
            'data': {'CorrectAnswer': temp.correction, 'AnswerIsRight': "false"},
            'massage': 'success'
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        data = {
            "code": 400,
        }
        return HttpResponse(json.dumps(data), content_type='application/json')




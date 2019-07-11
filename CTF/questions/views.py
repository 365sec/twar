#coding=utf-8

from django.core.paginator import PageNotAnInteger, InvalidPage, EmptyPage, Paginator
import json
from django.http import HttpResponse
from django.shortcuts import render
from mysql import models


def re_pages(request):
    if request.method == "GET":
        sort = request.GET.get('sort')
        qu_class = request.GET.get('qu_class')
        if not qu_class:
            qu_class = "理论知识"
        if not sort:
            sort = 'hottest'
        if sort == 'hottest':
            question_temp = models.ques_database.objects.filter(qu_class = qu_class ).order_by('-qu_page_view')
        elif sort == 'newest':
            question_temp= models.ques_database.objects.filter(qu_class = qu_class).order_by('-id')
        else:
            question_temp = models.ques_database.objects.filter(qu_class = qu_class).order_by('-qu_page_view')

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
    return render(request, template_view, {'question_list': question_list,'page':page,'sort':sort,'num_pages':paginator.num_pages,'qu_class':qu_class})


def re_question(request):
    qu_id = request.GET.get('qu_id')
    temp=models.ques_database.objects.get(qu_id=qu_id)
    if temp.qu_type == 0:
        html_template = 'choice_template.html'
    elif temp.qu_type == 1:
        html_template = 'operator_template.html'
    elif temp.qu_type ==2:
        html_template = 'flag_template.html'
    else:
        return HttpResponse(request,'no page')
    html_template
    return render(request, html_template,{'data':temp})

def re_check_result(request):
    qu_id = request.POST.get('qid')
    print qu_id
    answer=request.POST.get('answer')
    temp=models.ques_database.objects.get(qu_id=qu_id)
    if temp.qu_correction == answer:
        data={
            "code": 200,
            'data': {'CorrectAnswer': temp.qu_correction, 'AnswerIsRight': "true"},
            'massage':'success'
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    elif temp.qu_correction != answer:
        data = {
            "code": 200,
            'data': {'CorrectAnswer': temp.qu_correction, 'AnswerIsRight': "false"},
            'massage': 'success'
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        data = {
            "code": 400,
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    session.close()



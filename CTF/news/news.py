#ecoding=utf-8
from django.core.paginator import *
from django.http import HttpResponse
from django.shortcuts import render

from models import models


def news_summary(request):
    if request.method == "GET":
        question_temp = models.News.objects.filter().order_by('priority')
        paginator = Paginator(question_temp, 10)
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page')
        if not page:
            page = 1
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
    return render(
        request, 'news_summary.html', {
            'question_list': question_list,
            'page': page,
            'num_pages': paginator.num_pages,
        })


def news_detail(request):
    id = request.GET.get('id')
    temp = models.News.objects.get(id=id)
    return render(request, "news_detail.html", {'data': temp})

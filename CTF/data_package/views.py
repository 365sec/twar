#coding=utf-8
from django.core import paginator
from django.core.paginator import PageNotAnInteger, InvalidPage, EmptyPage, Paginator
from django.http import HttpResponse
from django.shortcuts import render
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from SQLAl_chemy import create_question_lib
import model
from SQLAl_chemy import test_example


def re_pages(request):
    Base = declarative_base()
    engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
    Base.metadata.create_all(engine)
    SessionF = sessionmaker(bind=engine)
    session = SessionF()
    question_temp= session.query(create_question_lib.Chices_ques)
    session.close()
    paginator = Paginator(question_temp, 10)
    if request.method == "GET":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page')
        print page
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
    return render(request, template_view, {'question_list': question_list,'page':page})


def re_websafe(request):
    Base = declarative_base()
    engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
    Base.metadata.create_all(engine)
    SessionF = sessionmaker(bind=engine)
    session = SessionF()
    question_temp= session.query(create_question_lib.Chices_ques)
    session.close()
    paginator = Paginator(question_temp, 10)
    if request.method == "GET":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page')
        print page
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
    return render(request, template_view, {'question_list': question_list,'page':page})

    url(r'^exercise/websafe', re_websafe),
    url(r'^exercise/passwd', re_passwd),
    url(r'^exercise/sundry', re_sundry),
    url(r'^exercise/forensic', re_forensic),


def re_passwd(request):
    Base = declarative_base()
    engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
    Base.metadata.create_all(engine)
    SessionF = sessionmaker(bind=engine)
    session = SessionF()
    question_temp= session.query(create_question_lib.Chices_ques)
    session.close()
    paginator = Paginator(question_temp, 10)
    if request.method == "GET":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page')
        print page
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
    return render(request, template_view, {'question_list': question_list,'page':page})

def re_reverse(request):
    Base = declarative_base()
    engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
    Base.metadata.create_all(engine)
    SessionF = sessionmaker(bind=engine)
    session = SessionF()
    question_temp= session.query(create_question_lib.Chices_ques)
    session.close()
    paginator = Paginator(question_temp, 10)
    if request.method == "GET":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page')
        print page
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
    return render(request, template_view, {'question_list': question_list,'page':page})

def re_sundry(request):
    Base = declarative_base()
    engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
    Base.metadata.create_all(engine)
    SessionF = sessionmaker(bind=engine)
    session = SessionF()
    question_temp= session.query(create_question_lib.Chices_ques)
    session.close()
    paginator = Paginator(question_temp, 10)
    if request.method == "GET":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page')
        print page
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
    return render(request, template_view, {'question_list': question_list,'page':page})

def re_forensic(request):
    Base = declarative_base()
    engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
    Base.metadata.create_all(engine)
    SessionF = sessionmaker(bind=engine)
    session = SessionF()
    question_temp= session.query(create_question_lib.Chices_ques)
    session.close()
    paginator = Paginator(question_temp, 10)
    if request.method == "GET":
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page')
        print page
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
    return render(request, template_view, {'question_list': question_list,'page':page})


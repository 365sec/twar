#ecoding=utf-8
import os
from django.core.paginator import Paginator, PageNotAnInteger, InvalidPage, EmptyPage
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
import json,uuid,time
from models import models


def map_tools(x):
    x.create_time = x.create_time.strftime("%Y-%m-%d %H:%M:%S")

def re_add_exercise(request):
    if request.method == "POST":
        temp = request.POST
        type = int(temp.get('type'))
        hint = temp.get('hint')
        correction = temp.get('correction')
        description = temp.get('description')
        kind = temp.get('kind')
        source = temp.get('source')
        id = uuid.uuid1()
        if type == 0:
            option0 = temp.get('option0')
            option1 = temp.get('option1')
            option2 = temp.get('option2')
            option3 = temp.get('option3')
            question = models.Exercise(id=id,
                                    type=type,
                                    description=description,
                                    option0=option0,
                                    kind=kind,
                                    option1=option1,
                                    option2=option2,
                                    option3=option3,
                                    hint=hint,
                                    correction=correction,
                                    source=source)
            question.save()
        elif type == 2:
            file_path = temp.get('file_path')
            question = models.Question(id=id,
                                    type=type,
                                    description=description,
                                    file_path=file_path,
                                    hint=hint,
                                    correction=correction,
                                    source=source)
            question.save()
        elif type == 3:
            flag_url = temp.get('flag_url')
            question = models.Question(id=id,
                                    type=type,
                                    description=description,
                                    flag_url=flag_url,
                                    hint=hint,
                                    correction=correction,
                                    source=source)
            question.save()
        else:
            return HttpResponse(request, 'False')
        return HttpResponse(request, 'True')
    else:
        return render(request, 'manage_question.html')


def re_add_news(request):
    if request.method == "POST":
        title = request.POST.get('title','')
        priority = request.POST.get('priority','')
        remark = request.POST.get('remark','')
        content = request.POST.get('editorValue','')
        state = request.POST.get('state','True')
        source = request.POST.get('source','')
        pic = request.POST.get('pic','')
        file = request.POST.get('file','')
        create_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                    time.localtime(time.time()))
        question = models.News(title=title,
                            priority=priority,
                            remark=remark,
                            content=content,
                            state=state,
                            source=source,
                            create_time=create_time,
                            pic=pic,
                            file=file,
                               )
        question.save()
        dct = {'code': 1, 'url': '/manage/add_news', 'massage': 'none'}
        return HttpResponse(json.dumps(dct))
    return render(request, 'admin/news_add.html')


def upload_file(request):
    if request.method == "POST":  # 请求方法为POST时，进行处理
        path = "./accessory/file"
        if not os.path.exists(path):
            os.makedirs(path)
        myFile = request.FILES.get("file", None)  # 获取上传的文件，如果没有文件，则默认为None
        if not myFile:
            return HttpResponse("no files for upload!")
        file_path = str(uuid.uuid1())
        destination = open(os.path.join(path, file_path),
                           'wb+')  # 打开特定的文件进行二进制的写操作
        for chunk in myFile.chunks():  # 分块写入文件
            destination.write(chunk)
        destination.close()
        dct = {
            'code': 1,
            'url': '/accessory/file/' + file_path,
            'massage': 'none'
        }
        return HttpResponse(json.dumps(dct))


def upload_pic(request):
    if request.method == 'POST':
        path = "./accessory/images"
        if not os.path.exists(path):
            os.makedirs(path)
        pic_path = str(uuid.uuid1())
        myFile = request.FILES.get("file", None)  # 获取上传的文件，如果没有文件，则默认为None
        if not myFile:
            return HttpResponse("no files for upload!")
        destination = open(os.path.join(path, pic_path),
                           'wb+')  # 打开特定的文件进行二进制的写操作
        for chunk in myFile.chunks():  # 分块写入文件
            destination.write(chunk)
        destination.close()
        dct = {
            'code': 1,
            'url': '/accessory/images/' + pic_path,
            'massage': 'none'
        }
        return HttpResponse(json.dumps(dct))




def exercise_index(request):
    if request.method == 'GET':
        temp = models.Exercise.objects.filter().order_by()
        temp1 = models.Exercise.objects.filter().first()
        paginator = Paginator(temp, 20)
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page',1)
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
        if question_list:
            map(map_tools, question_list)
        return render(
            request, 'admin/exercise_index.html', {
                'question_list': question_list,
                'page': page,
                'megagame_info': temp1,
                'id': id,
                'num_pages': paginator.num_pages,
                'last_page': paginator.num_pages,
                'last_second': paginator.num_pages - 1
            })


def add_exercise(request):
    if request.method == "POST":
        print request.POST
        option0 = ''
        option1 = ''
        option2 = ''
        option3 = ''
        kind = request.POST.get('kind')
        description = request.POST.get('description')
        type = int(unicode.encode(request.POST.get('type')))
        hint = request.POST.get('hint')
        if type == 0:
            option0 = request.POST.getlist('option0')[0]
            option1 = request.POST.getlist('option1')[0]
            option2 = request.POST.getlist('option2')[0]
            option3 = request.POST.getlist('option3')[0]
        elif type == 1:
            option0 = request.POST.getlist('option0')[1]
            option1 = request.POST.getlist('option1')[1]
            option2 = request.POST.getlist('option2')[1]
            option3 = request.POST.getlist('option3')[1]
        option4 = request.POST.get('option4','')
        option5 = request.POST.get('option5','')
        option6 = request.POST.get('option6','')
        option7 = request.POST.get('option7','')
        source = request.POST.get('source',"管理员")
        file_path = request.POST.getlist('file')[0]
        flag_url = request.POST.get('flag')
        create_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                    time.localtime(time.time()))
        correction = request.POST.get('correction')
        temp=models.Exercise(
            type=type,
            kind=kind,
            description=description,
            hint=hint,
            source=source,
            option0=option0,
            option1=option1,
            option2=option2,
            option3=option3,
            option4=option4,
            option5=option5,
            option6=option6,
            option7=option7,
            correction=correction,
            file_path=file_path,
            flag_url=flag_url,
            create_time=create_time,
        )
        temp.save()
        return HttpResponseRedirect('/manage/exercise_index')
    id = request.GET.get('id')
    return render(request, 'admin/add_exercise.html', {'id': id})




def add_match_info(request):
    if request.method == "POST":
        print request.POST
        type = request.POST.get('type')
        theme = request.POST.get('theme')
        organizers = request.POST.get('organizers')
        rules = request.POST.get('rules')
        state = request.POST.get('state','False')
        apply_start_time = request.POST.get('apply_start_time')
        apply_end_time = request.POST.get('apply_end_time')
        answer_start_time = request.POST.get('apply_start_time')
        answer_end_time = request.POST.get('apply_end_time')
        message =  request.POST.get('editorValue')
        brief= request.POST.get('introduce')
        file_path = request.POST.get('file')[0]
        source = request.POST.get('source','管理员A')
        create_time = time.strftime("%Y-%m-%d %H:%M:%S",time.localtime(time.time()))


        match=models.MatchInfo(type=type,
                                source=source,
                                organizers=organizers,
                                theme=theme,
                                state=state,
                                rules=rules,
                                create_time=create_time,
                                apply_start_time=apply_start_time,
                                apply_end_time=apply_end_time,
                                answer_start_time=answer_start_time,
                                answer_end_time=answer_end_time,
                               message=message,
                               brief=brief,
                               file_path=file_path
                               )
        match.save()
        dct = {'code': 1, 'url': '/manage/add_match_info', 'massage': 'none'}
        return HttpResponse(json.dumps(dct))
    return render(request, 'admin/add_match_info.html')


def match_index(request):
    if request.method == 'GET':
        temp = models.MatchInfo.objects.filter().order_by('id')
        paginator = Paginator(temp, 2)
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page',1)
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
        if question_list:
            map(map_tools, question_list)
        return render(
            request, 'admin/megagame_index.html', {
                'question_list': question_list,
                'page': page,
                'last_page': paginator.num_pages,
                'last_second': paginator.num_pages - 1
            })


def re_news_index(request):
    if request.method == "GET":
        question_temp = models.News.objects.filter().order_by('priority')
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        paginator = Paginator(question_temp, 10)
        page = request.GET.get('page',1)
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
        if question_list:
            map(map_tools, question_list)

    return render(
        request, 'admin/news_index.html', {
            'question_list': question_list,
            'page': page,
            'num_pages': paginator.num_pages,
            'last_page': paginator.num_pages,
            'last_second': paginator.num_pages - 1
        })


def del_match_info(request):
    if request.method == 'GET':
        match_id = int(request.GET.get('match_id'))
        temp = models.MatchInfo.objects.filter(id=id)
        if temp:
            temp.delete()
            dict = {'code': 1, 'msg': 'success'}

        else:
            dict = {'code': -1, 'msg': 'fail'}
        return HttpResponse(json.dumps(dict))


def add_challenge(request):
    if request.method == "POST":
        print request.POST
        id = request.POST.get('id')
        print request.POST
        option0 = ''
        option1 = ''
        option2 = ''
        option3 = ''
        kind = request.POST.get('kind')
        description = request.POST.get('description')
        type = int(unicode.encode(request.POST.get('type')))
        hint = request.POST.get('hint')
        if type == 0:
            option0 = request.POST.getlist('option0')[0]
            option1 = request.POST.getlist('option1')[0]
            option2 = request.POST.getlist('option2')[0]
            option3 = request.POST.getlist('option3')[0]
        elif type == 1:
            option0 = request.POST.getlist('option0')[1]
            option1 = request.POST.getlist('option1')[1]
            option2 = request.POST.getlist('option2')[1]
            option3 = request.POST.getlist('option3')[1]
        option4 = request.POST.get('option4','')
        option5 = request.POST.get('option5','')
        option6 = request.POST.get('option6','')
        option7 = request.POST.get('option7','')
        source = request.POST.get('source',"管理员")
        file_path = request.POST.getlist('file')[0]
        flag_url = request.POST.get('flag')
        print flag_url, '***********'
        create_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                    time.localtime(time.time()))
        correction = request.POST.get('correction')
        score = request.POST.get('q_score')
        temp=models.Challenge(
            match_id = id,
            type=type,
            kind=kind,
            description=description,
            hint=hint,
            source=source,
            option0=option0,
            option1=option1,
            option2=option2,
            option3=option3,
            option4=option4,
            option5=option5,
            option6=option6,
            option7=option7,
            correction=correction,
            file_path=file_path,
            flag_url=flag_url,
            create_time=create_time,
            q_score=score,
        )
        temp.save()
        dict = {
            'code': 1,
            'url': '/manage/add_megagame_questions',
            'massage': 'none'
        }
        return HttpResponseRedirect('/manage/challenge_info?id=' +
                                    id)
    id = request.GET.get('id')
    return render(request, 'admin/add_challenge_info.html', {'id': id})


def challenge_info(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        temp = models.Challenge.objects.filter(match_id=id).order_by('id')
        temp1 = models.Challenge.objects.filter(match_id=id).first()
        paginator = Paginator(temp, 20)
        # 获取 url 后面的 page 参数的值, 首页不显示 page 参数, 默认值是 1
        page = request.GET.get('page',1)
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
        if question_list:
            map(map_tools, question_list)
        return render(
            request, 'admin/challenge.html', {
                'question_list': question_list,
                'page': page,
                'megagame_info': temp1,
                'id': id,
                'num_pages': paginator.num_pages,
                'last_page': paginator.num_pages,
                'last_second': paginator.num_pages - 1
            })



def del_exercise(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        temp = models.Exercise.objects.filter(id=id)
        if temp:
            temp.delete()
            dict = {'code': 1, 'msg': 'success'}

        else:
            dict = {'code': -1, 'msg': 'fail'}
        return HttpResponse(json.dumps(dict))


def re_manage_index(request):
    return render(request, 'login.html')


def challenge_del(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        temp = models.Challenge.objects.filter(id=id)
        if temp:
            temp.delete()
            dict = {'code': 1, 'msg': 'success'}

        else:
            dict = {'code': -1, 'msg': 'fail'}
        return HttpResponse(json.dumps(dict))

def re_del_megagame_news(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        temp = models.News.objects.filter(id=id)
        if temp:
            temp.delete()
            dict = {'code': 1, 'msg': 'success'}

        else:
            dict = {'code': -1, 'msg': 'fail'}
        return HttpResponse(json.dumps(dict))

def challenge_detail(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        temp = models.Challenge.objects.filter(id=id).first()
        return render(request, 'admin/challenge_detail.html',
                      {'question': temp})

def exercise_detail(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        temp = models.Exercise.objects.filter(id=id).first()
        return render(request, 'admin/exercise_detail.html',
                      {'question': temp})

def challenge_update(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        temp = models.Challenge.objects.filter(id=id).first()
        print temp.type
        if not temp.option4:
            temp.option4 ='null'
        if not temp.option5:
            temp.option5 ='null'
        if not temp.option6:
            temp.option6 ='null'
        if not temp.option7:
            temp.option7 ='null'
        question_kind = temp.kind
        return render(request, "admin/challenge_update.html",
                      {'question': temp,'question_kind':question_kind})
    elif request.method == 'POST':
        print request.POST
        id = request.GET.get('id')
        temp = models.Challenge.objects.filter(id=id).first()
        print request.POST
        option0 = ''
        option1 = ''
        option2 = ''
        option3 = ''
        kind = request.POST.get('kind')
        description = request.POST.get('description')
        type = int(unicode.encode(request.POST.get('type')))
        hint = request.POST.get('hint')
        if type == 0:
            option0 = request.POST.getlist('option0')[0]
            option1 = request.POST.getlist('option1')[0]
            option2 = request.POST.getlist('option2')[0]
            option3 = request.POST.getlist('option3')[0]
        elif type == 1:
            option0 = request.POST.getlist('option0')[1]
            option1 = request.POST.getlist('option1')[1]
            option2 = request.POST.getlist('option2')[1]
            option3 = request.POST.getlist('option3')[1]
        option4 = request.POST.get('option4','')
        option5 = request.POST.get('option5','')
        option6 = request.POST.get('option6','')
        option7 = request.POST.get('option7','')
        source = request.POST.get('source', "管理员")
        file_path = request.POST.getlist('file')[0]
        flag_url = request.POST.get('flag')
        create_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                    time.localtime(time.time()))
        correction = request.POST.get('correction')
        score = request.POST.get('q_score')
        temp.type=type
        temp.kind=kind
        temp.description=description
        temp.hint=hint
        temp.source=source
        temp.option0=option0
        temp.option1=option1
        temp.option2=option2
        temp.option3=option3
        temp.option4=option4
        temp.option5=option5
        temp.option6=option6
        temp.option7=option7
        temp.correction=correction
        temp.file_path=file_path
        temp.flag_url=flag_url
        temp.create_time=create_time
        temp.q_score=score
        temp.save()
        return HttpResponseRedirect('/manage/challenge_info?id=' +id)

def exercise_update(request):
    if request.method == 'GET':
        id = request.GET.get('id')
        temp = models.Exercise.objects.filter(id=id).first()
        print temp.type
        if not temp.option4:
            temp.option4 ='null'
        if not temp.option5:
            temp.option5 ='null'
        if not temp.option6:
            temp.option6 ='null'
        if not temp.option7:
            temp.option7 ='null'
        question_kind = temp.kind
        return render(request, "admin/exercise_update.html",
                      {'question': temp,'question_kind':question_kind})
    elif request.method == 'POST':
        print request.POST
        id = request.GET.get('id')
        temp = models.Exercise.objects.filter(id=id).first()
        print request.POST
        option0 = ''
        option1 = ''
        option2 = ''
        option3 = ''
        kind = request.POST.get('kind')
        description = request.POST.get('description')
        type = int(unicode.encode(request.POST.get('type')))
        hint = request.POST.get('hint')
        if type == 0:
            option0 = request.POST.getlist('option0')[0]
            option1 = request.POST.getlist('option1')[0]
            option2 = request.POST.getlist('option2')[0]
            option3 = request.POST.getlist('option3')[0]
        elif type == 1:
            option0 = request.POST.getlist('option0')[1]
            option1 = request.POST.getlist('option1')[1]
            option2 = request.POST.getlist('option2')[1]
            option3 = request.POST.getlist('option3')[1]
        option4 = request.POST.get('option4','')
        option5 = request.POST.get('option5','')
        option6 = request.POST.get('option6','')
        option7 = request.POST.get('option7','')
        source = request.POST.get('source', "管理员")
        file_path = request.POST.getlist('file')[0]
        flag_url = request.POST.get('flag')
        create_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                    time.localtime(time.time()))
        correction = request.POST.get('correction')
        score = request.POST.get('q_score')
        temp.type=type
        temp.kind=kind
        temp.description=description
        temp.hint=hint
        temp.source=source
        temp.option0=option0
        temp.option1=option1
        temp.option2=option2
        temp.option3=option3
        temp.option4=option4
        temp.option5=option5
        temp.option6=option6
        temp.option7=option7
        temp.correction=correction
        temp.file_path=file_path
        temp.flag_url=flag_url
        temp.create_time=create_time
        temp.q_score=score
        temp.save()
        return HttpResponseRedirect('/manage/exercise_index?id=' +id)
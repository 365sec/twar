#ecoding=utf-8
import os
import uuid as uuid
from django.core.files.base import ContentFile
from django.core.paginator import Paginator, PageNotAnInteger, InvalidPage, EmptyPage
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from mysql import models
import uuid,json,time,datetime
import hashlib
from megagame.models import *


def re_add_questions(request):
    if request.method == "POST":
        temp = request.POST
        type=int(temp.get('type'))
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
            main1=models.Question(id=id,type=type,description=description,option0=option0,kind=kind,option1=option1,option2=option2,option3=option3,hint=hint,correction=correction,source=source)
            main1.save()
        elif type ==1:
            file_path = temp.get('file_path')
        elif type == 2:
            flag_url=temp.get('flag_url')
        else:
            return HttpResponse(request, 'False')
        return HttpResponse(request,'True' )
    else:
        return render(request,'manage_question.html')


def re_add_news(request):
    if request.method == "POST":
        title = request.POST.get('title')
        priority = request.POST.get('priority')
        remark = request.POST.get('remark')
        editorValue = request.POST.get('editorValue')
        state = request.POST.get('state')
        pic = request.POST.get('pic')
        file =  request.POST.get('file')
        create_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime( time.time()))
        main1 = models.News(
            title=title,
            priority=priority,
            remark=remark,
            editorValue=editorValue,
            state=state,
            create_time=create_time,
            pic = pic,
            file = file
        )
        main1.save()

        dct={
            'code':1,
            'url':'/manage/add_news',
            'massage':'none'
        }
        return HttpResponse(json.dumps(dct))
    return render(request,'admin/news_add.html')

def upload_file(request):
    if request.method == "POST":    # 请求方法为POST时，进行处理
        path = "./accessory/file"
        if not os.path.exists(path):
            os.makedirs(path)
        myFile =request.FILES.get("file", None)    # 获取上传的文件，如果没有文件，则默认为None
        if not myFile:
            return HttpResponse("no files for upload!")
        m2 = hashlib.md5()
        m2.update(myFile.name)
        destination = open(os.path.join(path,m2.hexdigest()),'wb+')    # 打开特定的文件进行二进制的写操作
        for chunk in myFile.chunks():      # 分块写入文件
            destination.write(chunk)
        destination.close()
        dct = {
            'code': 1,
            'url': '/accessory/file/' +m2.hexdigest(),
            'massage': 'none'
        }
        return HttpResponse(json.dumps(dct))



def upload_pic(request):
    if request.method == 'POST':
        path = "./accessory/images"
        if not os.path.exists(path):
            os.makedirs(path)
        myFile = request.FILES.get("file", None)  # 获取上传的文件，如果没有文件，则默认为None
        if not myFile:
            return HttpResponse("no files for upload!")
        m2 = hashlib.md5()
        m2.update(myFile.name)
        destination = open(os.path.join(path, m2.hexdigest()), 'wb+')  # 打开特定的文件进行二进制的写操作
        for chunk in myFile.chunks():  # 分块写入文件
            destination.write(chunk)
        destination.close()
        dct = {
            'code': 1,
            'url': '/accessory/images/' + m2.hexdigest(),
            'massage': 'none'
        }
        return HttpResponse(json.dumps(dct))


def add_megagame(request):
    if request.method == 'POST':
        temp= request.POST
        uid = uuid.uuid1()
        type = temp.get('type')
        title = temp.get('title')
        source = temp.get('source')
        editorValue = temp.get('editorValue')
        apply_start_time = temp.get('apply_start_time')
        apply_end_time = temp.get('apply_end_time')
        organizers = temp.get('organizers')
        introduce =  temp.get('introduce')
        rules =  temp.get('rules')
        meg1=Megagame(uid)
        meg1.create_megagame(type=type,title=title,source=source,editorValue=editorValue,apply_start_time=apply_start_time,apply_end_time=apply_end_time,organizers=organizers,introduce=introduce,rules=rules)


def re_exercise_questions_index(request):
    return render(request,'admin/exercise_index.html')

def re_add_exercise_questions(request):
    if request.method == "POST":
        temp = request.POST
        type=int(temp.get('type'))
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
            main1=models.Question(id=id,type=type,description=description,option0=option0,kind=kind,option1=option1,option2=option2,option3=option3,hint=hint,correction=correction,source=source)
            main1.save()
        elif type ==1:
            file_path = temp.get('file_path')
            main1 = models.Question(id=id, type=type, description=description, file_path=file_path, hint=hint, correction=correction,
                                    source=source)
            main1.save()
        elif type == 2:
            flag_url=temp.get('flag_url')
            main1 = models.Question(id=id, type=type, description=description, flag_url=flag_url, hint=hint, correction=correction,
                                    source=source)
            main1.save()
        else:
            return HttpResponse(request, 'False')
        return HttpResponse(request,'True' )
    else:
        return render(request,'admin/add_exercise_questions.html')


def re_add_megagame_info(request):
    if request.method == "POST":
        print request.POST
        remark = 0
        uid = uuid.uuid1()
        title = request.POST.get('title')
        organizers = request.POST.get('organizers')
        type = request.POST.get('type')
        editorValue = request.POST.get('editorValue')
        state = request.POST.get('state')
        apply_start_time = request.POST.get('apply_start_time')
        apply_end_time = request.POST.get('apply_end_time')
        introduce = request.POST.get('introduce')
        rules = request.POST.get('rules')
        source=request.POST.get('source')
        file =  request.POST.get('file')
        create_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime( time.time()))
        mega1=Megagame(uid)
        mega1.create_megagame(

            title=title,
            source=source,
            organizers=organizers,
            type=type,
            editorValue=editorValue,
            state=state,
            create_time=create_time,
            apply_start_time=apply_start_time,
            apply_end_time=apply_end_time,
            introduce=introduce,
            rules=rules,
            file=file
        )
        dct={
            'code':1,
            'url':'/manage/add_news',
            'massage':'none'
        }
        return HttpResponse(json.dumps(dct))
    return render(request,'admin/add_megagame_info.html')


def re_news_index(request):
    return render(request, 'admin/news_index.html')

def re_megagame_index(request):
    if request.method == 'GET':
        temp = models.MegagameInformation.objects.filter().order_by('id')
        paginator = Paginator(temp, 10)
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
        return render(request,'admin/megagame_index.html',{'question_list':question_list, 'page':page})

def re_del_megagame_info(request):
    if request.method == 'GET':
        uid = request.GET.get('uid')
        temp = models.MegagameInformation.objects.filter(uid=uid)
        if temp:
            temp.delete()
            dict={
                'code':1,
                'msg':'success'
            }

        else:
            dict = {
                'code': -1,
                'msg': 'fail'
            }
        return HttpResponse(json.dumps(dict))


def re_add_megagame_questions(request):
    if request.method == "POST":
        uid = request.POST.get('uid')
        print request.POST
        option0 = ''
        option1 = ''
        option2 = ''
        option3 = ''
        kind = request.POST.get('kind')
        description = request.POST.get('description')
        type =  int(unicode.encode(request.POST.get('type')))

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
        option4 = request.POST.get('option4')
        option5 = request.POST.get('option5')
        option6 = request.POST.get('option6')
        option7 = request.POST.get('option7')
        source = request.POST.get('source')
        if not source:
            source = '管理员'
        file_path = request.POST.getlist('file')[0]
        flag_url = request.POST.get('flag_url')
        print file_path,'------------'
        print flag_url,'***********'
        create_time = time.strftime("%Y-%m-%d %H:%M:%S", time.localtime(time.time()))
        correction=request.POST.get('correction')
        score=request.POST.get('q_score')
        ques1=Megagame(uid)
        ques1.add_megagame_questions(
            ttype =type,
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
            q_score = score,
        )
        dict = {
            'code': 1,
            'url': '/manage/add_megagame_questions',
            'massage': 'none'
        }
        return HttpResponseRedirect('/manage/megagame_question_info?uid='+uid)
    uid = request.GET.get('uid')
    return render(request,'admin/add_megagame_questions.html',{'uid':uid})

def re_megagame_question_info(request):
    if request.method == 'GET':
        uid = request.GET.get('uid')
        temp = models.MegagameQuestions.objects.filter(uid=uid).order_by('id')
        temp1 = models.MegagameInformation.objects.filter(uid=uid).first()
        paginator = Paginator(temp, 20)
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
        return render(request,'admin/megagame_questions_index.html',{'question_list':question_list, 'page':page,'megagame_info':temp1,'uid':uid})


def re_del_megagame_questions(request):
    if request.method == 'GET':
        uid = request.GET.get('uid')
        temp = models.MegagameQuestions.objects.filter(uid=uid)
        if temp:
            temp.delete()
            dict={
                'code':1,
                'msg':'success'
            }

        else:
            dict = {
                'code': -1,
                'msg': 'fail'
            }
        return HttpResponse(json.dumps(dict))


def re_manage_index(request):
    return render(request,'login.html')


def re_del_megagame_question(request):
    if request.method == 'GET':
        qid = request.GET.get('qid')
        temp = models.MegagameQuestions.objects.filter(qid=qid)
        if temp:
            temp.delete()
            dict={
                'code':1,
                'msg':'success'
            }

        else:
            dict = {
                'code': -1,
                'msg': 'fail'
            }
        return HttpResponse(json.dumps(dict))


def re_megagame_question_detail(request):
    if request.method == 'GET':
        qid = request.GET.get('qid')
        temp = models.MegagameQuestions.objects.filter(qid=qid).first()
        return render(request,'admin/manage_megagame_question_detail.html',{'question':temp})
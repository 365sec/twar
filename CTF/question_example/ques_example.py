import json

from django.http import HttpResponse
from django.shortcuts import render
from SQLAl_chemy.create_question_lib import *
def re_question(request):
    qu_id = request.GET.get('qu_id')
    qu_class = request.GET.get('qu_class')
    engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
    SessionF = sessionmaker(bind=engine)
    session = SessionF()
    temp=session.query(Chices_ques).filter_by(qu_id=qu_id,qu_class=qu_class)
    session.close()
    html_template = 'ques_exam.html'
    return render(request, html_template,{'data':temp[0]})

def re_check_result(request):
    print '---------------->'
    qu_id = request.POST.get('qid')
    qu_class = request.POST.get('type')
    answer=request.POST.get('answer')
    print qu_id,qu_class,answer
    engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
    SessionF = sessionmaker(bind=engine)
    session = SessionF()
    temp = session.query(Chices_ques).filter_by(qu_id=qu_id, qu_class=qu_class)
    if temp[0].qu_correction == answer:
        data={
            "code": 200,
            'data': {'CorrectAnswer': "B", 'AnswerIsRight': "true"},
            'massage':'success'
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    elif temp[0].qu_correction != answer:
        data = {
            "code": 200,
            'data': {'CorrectAnswer': temp[0].qu_correction, 'AnswerIsRight': "False"},
            'massage': 'success'
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        data = {
            "code": 400,
        }
        return HttpResponse(json.dumps(data), content_type='application/json')
    session.close()

from django.http import HttpResponse
from django.shortcuts import render
from mysql import models
import uuid

def re_add_questions(request):
    if request.method == "POST":
        temp = request.POST
        qu_type=int(temp.get('qu_type'))
        qu_hint = temp.get('qu_hint')
        qu_correction = temp.get('qu_correction')
        qu_description = temp.get('qu_description')
        qu_class = temp.get('qu_class')
        qu_source = temp.get('qu_source')
        qu_id = uuid.uuid1()
        if qu_type == 0:
            qu_option0 = temp.get('qu_option0')
            qu_option1 = temp.get('qu_option1')
            qu_option2 = temp.get('qu_option2')
            qu_option3 = temp.get('qu_option3')
            main1=models.ques_database(qu_id=qu_id,qu_type=qu_type,qu_description=qu_description,qu_option0=qu_option0,qu_class=qu_class,qu_option1=qu_option1,qu_option2=qu_option2,qu_option3=qu_option3,qu_hint=qu_hint,qu_correction=qu_correction,qu_source=qu_source)
            main1.save()
        elif qu_type ==1:
            qu_file_path = temp.get('qu_file_path')
        elif qu_type == 2:
            qu_flag_url=temp.get('qu_flag_url')
        else:
            return HttpResponse(request, 'False')
        return HttpResponse(request,'True' )
    else:
        html_template='manage_question.html'
        return render(request,html_template)
"""CTF URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from login_register import login,register,super_manage
from index import index
from test_sys.test_sys import re_test_sys
from exercise_sys.exer_sys import re_exercise_sys
from megagame.megagame_intro import re_megagame_intro
from megagame.megagame_det import re_megagame_detail
import test
from question_example.ques_example import re_question,re_check_result
from data_package import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/login', login.re_login),
    url(r'^manage', super_manage.re_manage),
    url(r'^login/register', register.re_register),
    url(r'^login/login_fail/$', login.re_login),
    url(r'^index/main',index.re_index),
    url(r'^test/system',re_test_sys),
    url(r'^exercise/system$',views.re_pages),
    url(r'^exercise/system/detail',re_question),
    url(r'^exercise/answer_check$',re_check_result),
    url(r'^exercise/websafe$',views.re_websafe),
    url(r'^exercise/passwd$',views.re_passwd),
    url(r'^exercise/sundry$',views.re_sundry),
    url(r'^exercise/reverse$',views.re_reverse),
    url(r'^exercise/forensic$',views.re_forensic),
    url(r'^megagame/introduce',re_megagame_intro),
    url(r'^megagame/detail',re_megagame_detail),
    url(r'^head/test',test.re_head),


    
]

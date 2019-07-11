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
from login import login,register
from manger import manager
from index import index
from megagame.megagame_intro import re_megagame_intro
from megagame.megagame_det import re_megagame_detail
from questions.views import re_question,re_check_result,re_pages
from personal_center import user

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/login', login.re_login),
    url(r'^manage/question$', manager.re_add_questions),
    url(r'^login/register', register.re_register),
    url(r'^index/main',index.re_index),
    url(r'^exercise/system$',re_pages),
    url(r'^exercise/system/detail',re_question),
    url(r'^exercise/answer_check$',re_check_result),
    url(r'^megagame/introduce',re_megagame_intro),
    url(r'^megagame/detail',re_megagame_detail),
    url(r'^user/profile/info', user.user_info),
    url(r'^user/profile/verify', user.user_verify),
    url(r'^message/system', user.user_message_system),
    url(r'^message/friend', user.user_message_friend),

]

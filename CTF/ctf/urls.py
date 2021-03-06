"""ctf URL Configuration

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
from django.conf.urls import url, include
from django.contrib import admin
from login import login, register
from manager import manager
from index import index
from megagame.views import *
from questions.views import re_question, re_check_result, re_pages
from personal_center import user
from news import news
from django.views.static import serve
import settings
from rank.view import re_rank_index

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^login/login', login.re_login),
    url(r'^manage/add_exercise_question$', manager.re_add_exercise_questions),
    url(r'^manage/index', login.re_login),
    url(r'^manage/exercise_question_index$',
        manager.re_exercise_questions_index),
    url(r'^manage/add_megagame_questions$', manager.re_add_megagame_questions),
    url(r'^manage/megagame_question_info$', manager.re_megagame_question_info),
    url(r'^manage/megagame_question_detail$',
        manager.re_megagame_question_detail),
    url(r'^manage/update_megagame_question$',
        manager.re_update_megagame_question),
    url(r'^manage/add_news$', manager.re_add_news),
    url(r'^rank/index$', re_rank_index),
    url(r'^manage/news_index$', manager.re_news_index),
    url(r'^manage/add_megagame_info$', manager.re_add_megagame_info),
    url(r'^manage/del_megagame_info$', manager.re_del_megagame_info),
    url(r'^manage/del_megagame_question$', manager.re_del_megagame_question),
    url(r'^manage/megagame_info$', manager.re_megagame_index),
    url(r'^manage/upload_pic$', manager.upload_pic),
    url(r'^manage/upload_file$', manager.upload_file),
    url(r'^login/register', register.re_register),
    url(r'^index/main', index.re_index),
    url(r'^exercise/system$', re_pages),
    url(r'^test/system$', re_pages),
    url(r'^exercise/system/detail$', re_question),
    url(r'^exercise/answer_check$', re_check_result),
    url(r'^megagame/introduce$', re_megagame_intro),
    url(r'^megagame/detail$', re_megagame_detail),
    url(r'^megagame/competition$', re_competition),
    url(r'^megagame/choice$', re_megagame_choice),
    url(r'^megagame/questions_list$', re_megagame_questions_list),
    url(r'^megagame/question/detail$', re_megagame_questions_detail),
    url(r'^megagame/operation_list$', re_operation),
    url(r'^megagame/operator/check$', re_megagame_operator_check),
    url(r'^megagame/choice/check$', re_megagame_choice_check),
    url(r'^megagame/ctf2018$', re_megagame_ctf2018),
    url(r'^megagame/join', re_join_megagame),
    url(r'^user/profile/info', user.user_info),
    url(r'^user/profile/verify', user.user_verify),
    url(r'^message/system', user.user_message_system),
    url(r'^message/friend', user.user_message_friend),
    url(r'^news/summary', news.news_summary),
    url(r'^news/detail', news.news_detail),
    url('^accessory/(?P<path>.*)$', serve,
        {'document_root': settings.MEDIA_ROOT}),
    url(r'^ueditor/', include('ueditor.urls')),
    url(r'^$', index.re_index),
    url(r'^$', index.re_index),
]

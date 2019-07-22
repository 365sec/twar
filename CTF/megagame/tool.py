#coding=utf-8

from random import sample
from models import models
import logging, uuid, time


class Megagame():
    def __init__(self, uid):
        self.uid = uid
        self.type = 0
        self.title = 0
        self.source = 0
        self.editorValue = 0
        self.create_time = 0
        self.apply_start_time = 0
        self.apply_end_time = 0
        self.state = 0
        self.organizers = 0
        self.introduce = 0
        self.file_path = 0

    def create_megagame(self, type, title, state, source, editorValue,
                        apply_start_time, apply_end_time, rules, organizers,
                        introduce, create_time, file):
        self.type = type
        self.title = title
        self.source = source
        self.editorValue = editorValue
        self.create_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                         time.localtime(time.time()))
        self.apply_start_time = apply_start_time
        self.apply_end_time = apply_end_time
        self.state = state
        self.create_time = create_time
        self.rules = rules
        self.organizers = organizers
        self.introduce = introduce
        self.file_path = file
        query1 = models.MegagameInformation.objects.filter(title=self.title)
        if query1:
            return False
        else:
            temp = models.MegagameInformation(
                uid=self.uid,
                type=self.type,
                title=self.title,
                source=self.source,
                editorValue=self.editorValue,
                apply_start_time=self.apply_start_time,
                rules=self.rules,
                apply_end_time=self.apply_end_time,
                organizers=self.organizers,
                introduce=self.introduce,
                file_path=self.file_path,
                create_time=self.create_time)
            temp.save()
            return True

    def update_megagame(self, uid, type, title, source, editorValue,
                        apply_start_time, apply_end_time, rules, organizers,
                        introduce):
        self.uid = uid
        self.type = type
        self.title = title
        self.source = source
        self.editorValue = editorValue
        self.create_time = time.strftime("%Y-%m-%d %H:%M:%S",
                                         time.localtime(time.time()))
        self.apply_start_time = apply_start_time
        self.apply_end_time = apply_end_time
        self.state = 0
        self.rules = rules
        self.organizers = organizers
        self.introduce = introduce

        query1 = models.MegagameInformation.objects.filter(uid=self.uid)
        if query1:
            return False
        else:
            try:
                query1.update(uid=self.uid,
                              type=self.type,
                              title=self.title,
                              source=self.source,
                              editorValue=self.editorValue,
                              apply_start_time=self.apply_start_time,
                              rules=self.rules,
                              apply_end_time=self.apply_end_time,
                              organizers=self.organizers,
                              introduce=self.introduce)
                return True
            except Exception, e:
                return False

    def re_megagame_state(self):
        temp = models.MegagameInformation.objects.filter(uid=self.uid)
        return temp.state

    def start_megagame(self):
        query1 = models.MegagameInformation.objects.filter(uid=self.uid)
        if query1:
            temp = models.MegagameInformation.objects.filter(uid=self.uid)
            temp.update(state=1)
        else:
            return False

    def over_megagame(self):
        query1 = models.MegagameInformation.objects.filter(uid=self.uid)
        if query1:
            temp = models.MegagameInformation.objects.filter(uid=self.uid)
            temp.update(state=0)
        else:
            return False

    def add_megagame_questions(self, ttype, kind, description, hint, option0,
                               option1, option2, option3, option4, option5,
                               option6, option7, correction, file_path,
                               flag_url, source, create_time, q_score):
        qid = uuid.uuid1()
        if ttype == 0:  #选择题
            print 0
            add_q = models.MegagameQuestions(uid=self.uid,
                                             type=ttype,
                                             qid=qid,
                                             kind=kind,
                                             description=description,
                                             correction=correction,
                                             hint=hint,
                                             option0=option0,
                                             option1=option1,
                                             option3=option3,
                                             option2=option2,
                                             source=source,
                                             create_time=create_time,
                                             q_score=q_score)
            add_q.save()
        elif ttype == 1:  #多选题
            print 1
            add_q = models.MegagameQuestions(uid=self.uid,
                                             type=ttype,
                                             qid=qid,
                                             kind=kind,
                                             description=description,
                                             correction=correction,
                                             hint=hint,
                                             option0=option0,
                                             option1=option1,
                                             option3=option3,
                                             option2=option2,
                                             option4=option4,
                                             option5=option5,
                                             option6=option6,
                                             option7=option7,
                                             source=source,
                                             create_time=create_time,
                                             q_score=q_score)
            add_q.save()
        elif ttype == 2:  # 操作题
            print 2
            add_q = models.MegagameQuestions(uid=self.uid,
                                             qid=qid,
                                             type=ttype,
                                             kind=kind,
                                             correction=correction,
                                             description=description,
                                             hint=hint,
                                             source=source,
                                             file_path=file_path,
                                             create_time=create_time,
                                             q_score=q_score)
            add_q.save()
        elif ttype == 3:  # 夺旗题
            print 3
            add_q = models.MegagameQuestions(uid=self.uid,
                                             qid=qid,
                                             type=ttype,
                                             kind=kind,
                                             correction=correction,
                                             description=description,
                                             hint=hint,
                                             flag_url=flag_url,
                                             source=source,
                                             create_time=create_time,
                                             q_score=q_score)
            add_q.save()


class PersonMegagame():
    def __init__(self, user_ID):
        self.user_ID = user_ID

    def re_state(self, uid):
        temp = models.Members.objects.filter(user_ID=self.user_ID,
                                             uid=uid).first()
        return temp

    def join_megagame(self, name, uid):
        query1 = models.Members.objects.filter(user_ID=self.user_ID,
                                               uid=uid,
                                               name=name)
        if query1.exists():
            return True
        else:
            try:
                temp = models.Members(user_ID=self.user_ID, name=name, uid=uid)
                temp.save()
                return True
            except Exception, e:
                logging.debug(e),
                return False

    def quit_megagame(self, uid):
        query = models.Members.objects.filter(user_ID=self.user_ID,
                                              uid=uid).first()
        if query.exists():
            try:
                query.delete()
                return True
            except Exception, e:
                logging.debug(e),
                return False
        else:
            return False


'''
class Team_Megagame():
    def __init__(self):
        '''


class competition():
    def __init__(self):
        pass

    def re_rand_lists(self):
        count = models.Question.objects.all().count()
        rand_ids = sample(range(1, count), 10)
        print(rand_ids)
        temp = models.Question.objects.filter(id__in=rand_ids)
        return temp

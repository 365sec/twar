from django.db import models


class ExerciseQuestion(models.Model):
    type = models.IntegerField(default=0)
    kind = models.CharField(max_length=50, null=False)
    uuid = models.CharField(max_length=50, null=False, unique=True)
    source = models.CharField(max_length=100, null=False)
    description = models.CharField(max_length=200, null=False)
    hint = models.CharField(max_length=100)
    option0 = models.CharField(max_length=200)
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    option5 = models.CharField(max_length=200)
    option6 = models.CharField(max_length=200)
    option7 = models.CharField(max_length=200)
    correction = models.CharField(max_length=30, null=False)
    file_path = models.CharField(max_length=100)
    flag_url = models.CharField(max_length=100)
    answer_num = models.IntegerField(default=0)
    collections = models.IntegerField(default=0)
    pageview = models.IntegerField(default=0)
    create_time = models.DateTimeField()

    def __str__(self):
        return self.description

    class Meta:
        db_table = 't_exercise_questions'


class News(models.Model):
    title = models.CharField(max_length=200, null=False)
    source = models.CharField(max_length=100)
    editorValue = models.CharField(max_length=10000)
    create_time = models.DateTimeField()
    pageview = models.IntegerField(default=0)
    attachment = models.CharField(max_length=100)
    remark = models.CharField(max_length=200)
    priority = models.IntegerField(default=99)
    state = models.IntegerField(default=0)
    pic = models.CharField(max_length=100)
    file = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 't_news'


class MegagameInformation(models.Model):
    uid = models.CharField(max_length=100)
    type = models.IntegerField(default=0)
    title = models.CharField(max_length=200, null=False)
    source = models.CharField(max_length=100, null=True)
    editorValue = models.CharField(max_length=10000)
    create_time = models.DateTimeField()
    apply_start_time = models.CharField(max_length=50, null=False)
    apply_end_time = models.CharField(max_length=50, null=False)
    state = models.IntegerField(default=0)
    organizers = models.CharField(max_length=100)
    introduce = models.CharField(max_length=1000, null=False)
    rules = models.CharField(max_length=50, null=False)
    members = models.IntegerField(default=0)
    file_path = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 't_megagame_information'


class Answer(models.Model):
    qid = models.CharField(max_length=50, null=False)
    user_answer = models.CharField(max_length=50, null=False)
    user_ID = models.CharField(max_length=50, null=False)
    reply_time = models.DateTimeField()
    member = models.ForeignKey("Members", on_delete=models.CASCADE)

    class Meta:
        db_table = 't_answer'


class Members(models.Model):
    user_ID = models.CharField(max_length=50)
    name = models.CharField(max_length=50)
    uid = models.CharField(max_length=50)
    user_score = models.IntegerField(null=True, default=0)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_members'


class Teams(models.Model):
    captain_id = models.CharField(max_length=50)
    member1_id = models.CharField(max_length=50, null=True)
    member2_id = models.CharField(max_length=50, null=True)
    mumbers = models.IntegerField(default=1)
    team_name = models.CharField(max_length=50, null=False)
    megagame_id = models.CharField(max_length=50)

    def __str__(self):
        return self.team_name

    class Meta:
        db_table = 't_teams'


class MegagameQuestions(models.Model):
    type = models.IntegerField()
    kind = models.CharField(max_length=50)
    uid = models.CharField(max_length=50, null=False)
    qid = models.CharField(max_length=50, null=False, unique=True)
    source = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=200, null=False)
    hint = models.CharField(max_length=100)
    option0 = models.CharField(max_length=200)
    option1 = models.CharField(max_length=200)
    option2 = models.CharField(max_length=200)
    option3 = models.CharField(max_length=200)
    option4 = models.CharField(max_length=200)
    option5 = models.CharField(max_length=200)
    option6 = models.CharField(max_length=200)
    option7 = models.CharField(max_length=200)
    correction = models.CharField(max_length=30, null=False)
    file_path = models.CharField(max_length=100)
    flag_url = models.CharField(max_length=100)
    create_time = models.DateTimeField()
    q_score = models.IntegerField()

    def __str__(self):
        return self.description

    class Meta:
        db_table = 't_megagame_questions'

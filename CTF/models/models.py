from django.db import models

class News(models.Model):
    title = models.CharField(max_length=200, null=False)
    source = models.CharField(max_length=100)
    content = models.CharField(max_length=10000)
    create_time = models.DateTimeField()
    pageview = models.IntegerField(default=0)
    remark = models.CharField(max_length=200)
    priority = models.IntegerField(default=99)
    state = models.BooleanField()
    pic = models.CharField(max_length=100)
    file = models.CharField(max_length=100)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 't_news'

class Team(models.Model):
    name = models.CharField(max_length=20)
    desc = models.CharField(max_length=200, null=True)
    create_time = models.DateTimeField()


    def __str__(self):
        return self.name

    class Meta:
        db_table = 't_team'

class User(models.Model):
    user_name = models.CharField(max_length=20)
    user_pwd = models.CharField(max_length=16)
    user_nickname = models.CharField(max_length=20,null=True)
    user_auto = models.CharField(max_length=200,null=True)
    real_name = models.CharField(max_length=20,null=True)
    user_sex = models.IntegerField(default=0,null=True)
    user_cardnum = models.CharField(max_length=18,null=True)
    user_education = models.CharField(max_length=5,null=True)
    user_area = models.CharField(max_length=20,null=True)
    user_address = models.CharField(max_length=50,null=True)
    user_state = models.IntegerField(default=0,null=True)
    user_pic = models.CharField(max_length=100,null=True)
    num_flags = models.IntegerField(default=0,null=False)
    theoretical_value = models.IntegerField(default=0,null=False)
    achievement_flags = models.IntegerField(default=0,null=False)
    card_count = models.IntegerField(default=0,null=False)
    num_contribution = models.IntegerField(default=0,null=False)
    num_fans = models.IntegerField(default=0,null=False)
    user_team = models.ForeignKey("Team", on_delete=models.CASCADE)

    def __str__(self):
        return self.user_name

    class Meta:
        db_table = 't_user'

class Exercise(models.Model):
    type = models.CharField(max_length=50, null=False)
    kind = models.CharField(max_length=50, null=False)
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
        db_table = 't_exercise'

class ExerciseUser(models.Model):
    answer = models.CharField(max_length=100,null=False)
    answer_time = models.DateTimeField()
    validity = models.BooleanField()
    exercise = models.ForeignKey("Exercise",on_delete=models.CASCADE)
    user = models.ForeignKey("User", on_delete=models.CASCADE)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_exercise_user'



class MatchInfo(models.Model):
    type = models.CharField(max_length=50, null=False)
    theme = models.CharField(max_length=200, null=False)
    create_time = models.DateTimeField()
    source = models.CharField(max_length=50, null=False)
    apply_start_time = models.CharField(max_length=50, null=False)
    apply_end_time = models.CharField(max_length=50, null=False)
    answer_start_time = models.DateTimeField()
    answer_end_time = models.DateTimeField()
    state = models.BooleanField(default=False)
    organizers = models.CharField(max_length=100)
    rules = models.CharField(max_length=50, null=False)
    brief = models.CharField(max_length=1000, null=False)
    message = models.CharField(max_length=10000)
    file_path = models.CharField(max_length=100)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_match_info'

class MatchNotice(models.Model):
    title = models.CharField(max_length=200, null=False)
    brief = models.CharField(max_length=1000, null=False)
    message = models.CharField(max_length=10000)
    file_path = models.CharField(max_length=100)



    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_match_notice'

class UserMatchInfo(models.Model):
    score = models.IntegerField(null=True,default=0)
    join_time = models.DateTimeField()
    user = models.ForeignKey("User",on_delete=models.CASCADE)
    match_info = models.ForeignKey("matchInfo", on_delete=models.CASCADE)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_user_match_info'

class TeamMatchInfo(models.Model):
    score = models.IntegerField(null=True,default=0)
    join_time = models.DateTimeField()
    team = models.ForeignKey("Team",on_delete=models.CASCADE)
    match_info = models.ForeignKey("matchInfo", on_delete=models.CASCADE)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_team_match_info'

class Challenge(models.Model):
    type = models.CharField(max_length=50, null=False)
    kind = models.CharField(max_length=50)
    source = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=200, null=False)
    hint = models.CharField(max_length=100)
    option0 = models.CharField(max_length=200,null=True)
    option1 = models.CharField(max_length=200,null=True)
    option2 = models.CharField(max_length=200,null=True)
    option3 = models.CharField(max_length=200,null=True)
    option4 = models.CharField(max_length=200,null=True,default='null')
    option5 = models.CharField(max_length=200,null=True,default='null')
    option6 = models.CharField(max_length=200,null=True,default='null')
    option7 = models.CharField(max_length=200,null=True,default='null')
    correction = models.CharField(max_length=30, null=False)
    file_path = models.CharField(max_length=100)
    flag_url = models.CharField(max_length=100)
    create_time = models.DateTimeField()
    q_score = models.IntegerField()
    match = models.ForeignKey("matchInfo",on_delete=models.CASCADE)

    def __str__(self):
        return self.description

    class Meta:
        db_table = 't_challenge'

class UserChallenge(models.Model):
    score = models.IntegerField(null=True,default=0)
    answer_time =  models.DateTimeField()
    user = models.ForeignKey("User",on_delete=models.CASCADE)
    challenge = models.ForeignKey("Challenge", on_delete=models.CASCADE)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_user_challenge'

class TeamChallenge(models.Model):
    score = models.IntegerField(null=True,default=0)
    answer_time = models.DateTimeField()
    Team = models.ForeignKey("Team",on_delete=models.CASCADE)
    challenge = models.ForeignKey("Challenge", on_delete=models.CASCADE)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_team_challenge'

class FriendLink(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=100)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_friend_link'

class Sponsor(models.Model):
    name = models.CharField(max_length=100)
    link = models.CharField(max_length=100)
    accessory = models.CharField(max_length=100)

    def __str__(self):
        return self.id

    class Meta:
        db_table = 't_sponsor'






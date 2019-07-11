
from django.db import models

class ques_database(models.Model):
    qu_type = models.IntegerField()
    qu_class = models.CharField(max_length=50,null=False)
    qu_id = models.CharField(max_length=50,null=False)
    qu_source = models.CharField(max_length=100,null=False)
    qu_description = models.CharField(max_length=200,null=False)
    qu_hint = models.CharField(max_length=100)
    qu_option0 = models.CharField(max_length=200)
    qu_option1 = models.CharField(max_length=200)
    qu_option2 = models.CharField(max_length=200)
    qu_option3 = models.CharField(max_length=200)
    qu_option4 = models.CharField(max_length=200)
    qu_option5 = models.CharField(max_length=200)
    qu_correction = models.CharField(max_length=30,null=False)
    qu_file_path = models.CharField(max_length=100)
    qu_flag_url = models.CharField(max_length=100)
    qu_answer_num = models.IntegerField(default=0)
    qu_collections = models.IntegerField(default=0)
    qu_page_view = models.IntegerField(default=0)






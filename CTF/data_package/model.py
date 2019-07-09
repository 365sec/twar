

class Questions_model():
    def __init__(self):
        self.qu_type = ''
        self.qu_class = ''
        self.qu_id = ''
        self.qu_source = ''
        self.qu_description='',
        self.qu_hint=''
        self.qu_options=[]
        self.qu_create_time = ''

    def set_question_info(self,question_list):
        self.qu_type = question_list.get('qu_type')
        self.qu_id = question_list.get('qu_id')
        self.qu_class = question_list.get('qu_class')
        self.qu_hint = question_list.get('qu_hint')
        self.qu_source = question_list.get('qu_source')
        self.qu_description = question_list.get('qu_description')
        self.qu_options = question_list.get('qu_options')
        self.qu_create_time = question_list.get('qu_create_time')






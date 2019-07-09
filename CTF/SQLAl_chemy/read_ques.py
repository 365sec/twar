from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from create_question_lib import *


engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
SessionF = sessionmaker(bind=engine)
session = SessionF()

def to_dict(self):
    result = {}
    for key in self.__mapper__.c.keys():
        if getattr(self, key) is not None:
            result[key] = str(getattr(self, key))
        else:
            result[key] = getattr(self, key)
    return result

for suj in  session.query(Chices_ques).filter_by(qu_id=05):
    print suj.qu_id
    print to_dict(suj)



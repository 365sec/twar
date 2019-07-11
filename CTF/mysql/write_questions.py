import  test_example
from models import Chices_ques,engine,Operator_ques,Get_flag
from sqlalchemy.orm.session import Session, sessionmaker
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base


def writein(subject):
    Base = declarative_base()
    engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
    Base.metadata.create_all(engine)
    SessionF = sessionmaker(bind=engine)
    session = SessionF()
    qu_type = subject.get('qu_type')
    if qu_type==1 or qu_type == 0:
        qu_class = subject.get('qu_class')
        qu_id = subject.get('qu_id')
        qu_source = subject.get('qu_source')
        qu_description = subject.get('qu_description')
        qu_hint = subject.get('qu_hint')
        qu_options = subject.get('qu_options')
        qu_create_time = subject.get('qu_create_time')
        qu_correction=subject.get('qu_correction')
        question1=Chices_ques(qu_type=qu_type,
                              qu_class=qu_class,
                              qu_id=qu_id,
                              qu_source=qu_source,
                              qu_description=qu_description,
                              qu_hint=qu_hint,
                              qu_option0=qu_options[0],
                              qu_option1=qu_options[1],
                              qu_option2=qu_options[2],
                              qu_option3=qu_options[3],
                              qu_option4=qu_options[4],
                              qu_option5=qu_options[5],
                              qu_correction=qu_correction,
                              qu_create_time=qu_create_time
                          )
    elif qu_type == 2:
        qu_class = subject.get('qu_class')
        qu_id = subject.get('qu_id')
        qu_source = subject.get('qu_source')
        qu_description = subject.get('qu_description')
        qu_hint = subject.get('qu_hint')
        qu_correction = subject.get('qu_correction')
        qu_if_have_file = subject.get('qu_if_have_file')
        qu_create_time = subject.get('qu_create_time')
        question1 = Operator_ques(qu_type=qu_type,
                                qu_class=qu_class,
                                qu_id=qu_id,
                                qu_source=qu_source,
                                qu_description=qu_description,
                                qu_hint=qu_hint,
                                qu_if_have_file=qu_if_have_file,
                                qu_correction=qu_correction,
                                qu_create_time=qu_create_time
                                )
    elif qu_type == 3:
        qu_class = subject.get('qu_class')
        qu_id = subject.get('qu_id')
        qu_source = subject.get('qu_source')
        qu_description = subject.get('qu_description')
        qu_hint = subject.get('qu_hint')
        qu_correction = subject.get('qu_correction')
        qu_url = subject.get('qu_url')
        qu_create_time = subject.get('qu_create_time')
        question1 = Get_flag(qu_type=qu_type,
                                qu_class=qu_class,
                                qu_id=qu_id,
                                qu_source=qu_source,
                                qu_description=qu_description,
                                qu_hint=qu_hint,
                                qu_url=qu_url,
                                qu_correction=qu_correction,
                                qu_create_time=qu_create_time
                                )
    else:
        session.close()
        return
    session.add(question1)
    session.commit()
    session.close()

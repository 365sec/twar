import sqlal
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship, backref, session
from sqlalchemy.orm.session import Session, sessionmaker
Base = declarative_base()
class Chices_ques(Base):
    __tablename__ = 'chices_ques_lib'
    id = Column(Integer, primary_key=True)
    qu_type = Column(String(30), nullable=False)
    qu_class = Column(String(30), nullable=False)
    qu_id = Column(String(20), nullable=False)
    qu_source = Column(String(30))
    qu_description = Column(String(200), nullable=False)
    qu_hint = Column(String(30))
    qu_option0 = Column(String(30), nullable=False)
    qu_option1 = Column(String(30), nullable=False)
    qu_option2 = Column(String(30), nullable=False)
    qu_option3 = Column(String(30), nullable=False)
    qu_option4 = Column(String(30))
    qu_option5 = Column(String(30))
    qu_correction = Column(String(30), nullable=False)
    qu_create_time = Column(Date)


class Operator_ques(Base):
    __tablename__ = 'operator_ques_lib'
    id = Column(Integer, primary_key=True)
    qu_type = Column(Integer, nullable=False)
    qu_class = Column(String(30), nullable=False)
    qu_id = Column(String(30), nullable=False)
    qu_source = Column(String(30))
    qu_description = Column(String(200), nullable=False)
    qu_correction= Column(String(100), nullable=False)
    qu_if_have_file = Column(Integer, nullable=False)
    qu_hint = Column(String(30))
    qu_create_time = Column(Date)

class Get_flag(Base):
    __tablename__ = 'get_flag_ques_lib'
    id = Column(Integer, primary_key=True)
    qu_type = Column(Integer, nullable=False)
    qu_class = Column(String(30), nullable=False)
    qu_id = Column(String(30), nullable=False)
    qu_source = Column(String(30))
    qu_description = Column(String(200), nullable=False)
    qu_correction = Column(String(100), nullable=False)
    qu_url = Column(String(30), nullable=False)
    qu_hint = Column(String(30))
    qu_create_time = Column(Date)

#engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
#Base.metadata.create_all(engine)


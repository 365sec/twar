#coding=utf-8
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship, backref, session
from sqlalchemy.orm.session import Session, sessionmaker

Base = declarative_base()


# 定义表结构
class GameCompany(Base):
    __tablename__ = 'game_company'

    id = Column(Integer, primary_key=True)
    name = Column(String(200), nullable=False)
    country = Column(String(50))


class Game(Base):
    __tablename__ = 'game'

    id = Column(Integer, primary_key=True)
    company_id = Column(Integer, ForeignKey('game_company.id'), index=True)
    category = Column(String(10))
    name = Column(String(200), nullable=False)
    release_date = Column(Date)

    # 和Django不同，外键需要显式定义，具体好坏见仁见智
    # 此处的relation可以为lazy加载外键内容时提供一些可配置的选项
    company = relationship('GameCompany', backref=backref('games'))


# 此处定义要使用的数据库
engine = create_engine('mysql+pymysql://root:Gtms@gsc123@172.16.39.74:3306/ctf?charset=utf8')
# 调用create_all来创建表结构，已经存在的表将被忽略
Base.metadata.create_all(engine)

SessionF = sessionmaker(bind=engine)
session = SessionF()
nintendo = GameCompany(name="Nintendo", country="Japan")
capcom = GameCompany(name="Capcom", country="Japan")
game1 = Game(
    company=nintendo,
    category="ACT",
    name="Super Mario Bros",
    release_date='1985-10-18'
)
game2 = Game(
    company=capcom,
    category="ACT",
    name="Devil May Cry 3: Dante's Awakening",
    release_date="2005-03-01",
)
game3 = Game(
    company=nintendo,
    category="RPG",
    name="Mario & Luigi: Dream Team",
    release_date="2013-08-11",
)

# 使用add_all来让这些objects和session产生关系
session.add_all([nintendo, capcom, game1, game2])
# 在没有开启autocommit的模式下，不要忘了调用commit来让数据写到数据库中
session.commit()
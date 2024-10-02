import mysql.connector
import os
from dotenv import load_dotenv
from fastapi.responses import JSONResponse

# .env 파일 로드
load_dotenv(dotenv_path="kordlefront/.env")

user = os.getenv('user')
password = os.getenv('password')

# MySQL 서버에 연결
connection = mysql.connector.connect(
    host="localhost",       # MySQL 서버 호스트 주소 (로컬이면 'localhost')
    user=user,   # MySQL 사용자 이름
    password=password, # MySQL 비밀번호
    database="ggodle",  # 사용할 데이터베이스 이름
    port=4000 #포트번호
)

if connection.is_connected():
    print("MySQL에 성공적으로 연결되었습니다.")
    
cursor = connection.cursor(dictionary=True) #데이터를 가져올 때 dict 형태로 가지고 오기

create_table_query = """
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    time INT NOT NULL,
    count INT,
    score INT,
    isSolved BOOLEAN
);
"""
cursor.execute(create_table_query)

async def add_user(user):
    name=user.name
    time=user.time
    count=user.count
    score=user.score
    isSolved=user.isSolved
    
    user_info=[name,time,count,score,isSolved]
    sql = "INSERT INTO users (name, time, count, score, isSolved) VALUES (%s, %s,%s,%s,%s)"
    
    cursor.execute(sql, user_info)

    # 변경 사항을 커밋
    connection.commit()

    print("데이터가 성공적으로 삽입되었습니다.")
    print(user_info)
    
    return 200

async def get_user():
    
    sql = "SELECT * FROM users"
    
    cursor.execute(sql)

    # 결과 가져오기
    users = cursor.fetchall()  # 모든 행 가져오기
    
    print(users)
    
    return JSONResponse(content=users)

async def delete_all():
    sql = "TRUNCATE TABLE users"
    
    cursor.execute(sql)
    
    print("삭제됨")
    
    return 200
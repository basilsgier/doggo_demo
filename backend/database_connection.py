from backend.config import DB_PASSWORD, DB_NAME

connection = pymysql.connect(
    host='localhost',
    user='root',
    password=DB_PASSWORD,
    db=DB_NAME,
    charset='utf8',
    cursorclass=pymysql.cursors.DictCursor
)

if connection.open:
    print("the connection is opened")
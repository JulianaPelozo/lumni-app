import pymysql

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='root',
    database='lumni_db'
    port=3306
)
print("Conexão com o MySQL estabelecida com sucesso!")
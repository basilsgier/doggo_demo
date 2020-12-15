from database_connection import connection
import pymysql
import requests


def add_new_user():
    pass


def main_db(action, *args):
    try:
        with connection.cursor() as cursor:
            if action == 'new_user':
                pass
            else:
                return {'error': 400, 'details': 'Invalid option '}
    except Exception as err:
        print("500 - Internal error", err)



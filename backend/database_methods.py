from database_connection import connection
import requests


def add_new_user(cursor, args):
    user = args[0]
    table_name = 'user'
    temp_user = {}
    attributes = {'id', 'first_name', 'last_name', 'user_name', 'password', 'age', 'gender', 'city', 'phone_number'}
    for attribute in attributes:
        temp_user[attribute] = user.get(attribute, None)
    try:
        columns = ', '.join("`" + str(x).replace('/', '_') + "`" for x in temp_user.keys())
        values = ', '.join("'" + str(x).replace('/', '_') + "'" for x in temp_user.values())
        query = "INSERT into %s (%s) VALUES (%s);" % (table_name, columns, values)
        cursor.execute(query)
        connection.commit()
    except Exception as e:
        return {'error': 500, 'details': 'adding user ' + str(e)}


def add_new_dog(cursor, args):
    dog = args[0]
    table_name = 'dog'
    temp_dog = {}
    attributes = {'id', 'photo_url', 'dog_name', 'description', 'owner_id'}
    for attribute in attributes:
        temp_dog[attribute] = dog.get(attribute, None)
    try:
        columns = ', '.join("`" + str(x).replace('/', '_') + "`" for x in temp_dog.keys())
        values = ', '.join("'" + str(x).replace('/', '_') + "'" for x in temp_dog.values())
        query = "INSERT into %s (%s) VALUES (%s);" % (table_name, columns, values)
        cursor.execute(query)
        connection.commit()
    except Exception as e:
        return {'error': 500, 'details': 'adding dog ' + str(e)}


def add_new_friends(cursor, args):
    try:
        friend1_id = args[0]
        friend2_id = args[1]
        query = f"INSERT into friends_connection  VALUES ('{friend1_id}', '{friend2_id}');"
        cursor.execute(query)
        connection.commit()
    except Exception as e:
        return {'error': 500, 'details': 'adding friends' + str(e)}


def main_db(action, *args):
    try:
        with connection.cursor() as cursor:
            if action == 'new_user':
                return add_new_user(cursor, args)
            elif action == 'new_dog':
                return add_new_dog(cursor, args)
            elif action == 'new_friends':
                return add_new_friends(cursor, args)
            else:
                return {'error': 400, 'details': 'Invalid option '}
    except Exception as err:
        print("500 - Internal error", err)


new_user = {
    "id": "0",
    'first_name': "Amjad",
    'last_name': "Bashiti",
    'user_name': "amjad.love",
    'password': "555",
    'age': 24,
    'gender': "M",
    'city': "Yassef",
    'phone_number': "0526488801"
}

new_dog = {
    "id": "0",
    'photo_url': "C:\\Users\\basil\\Desktop\\excellant_team\\python_projects\\doggo_demo\\backend\\pictures\\Capture.PNG",
    'dog_name': "shin",
    'description': "a lovely husky dog 4 months old",
    'owner_id': 1,
}

# print(main_db('new_dog', new_dog))
# print(main_db('new_user', new_user))
print(main_db('new_friends', 1, 2))

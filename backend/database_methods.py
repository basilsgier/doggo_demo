from database_connection import connection
import requests


def add_new_user(cursor, args):
    user = args[0]
    table_name = 'user'
    temp_user = {}
    attributes = {'id', 'first_name', 'last_name', 'user_name', 'password', 'age', 'gender', 'city', 'phone_number',
                  'status'}
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


def get_friends(cursor, _id):
    user_id = _id
    query = f"SELECT * from user where id != '{_id}';"
    cursor.execute(query)
    res = cursor.fetchall()
    query = f"SELECT * from friends_connection where id1 = '{user_id}' or id2 = '{user_id}'"
    cursor.execute(query)
    res2 = cursor.fetchall()
    friends_id = []
    result = []
    for relation in res2:
        if relation['id1'] == user_id:
            friends_id.append(relation['id2'])
        if relation['id2'] == user_id:
            friends_id.append(relation['id1'])
    for user in res:
        if user['id'] in friends_id:
            result.append(user)
    return result


def find_match(cursor, args):
    try:
        user_id = args[0]
        user_city = args[1]
        query = f"SELECT * from user where city = '{user_city}'"
        cursor.execute(query)
        res = cursor.fetchall()
        result = []
        for user in res:
            if user['id'] != user_id:
                result.append(user)
        final_res = {
            "friends": [],
            "not_friends": []
        }
        query = f"SELECT * from friends_connection where id1 = '{user_id}' or id2 = '{user_id}'"
        cursor.execute(query)
        res2 = cursor.fetchall()
        friends_id = []
        # friends = []
        # not_friends = []
        for relation in res2:
            if relation['id1'] == user_id:
                friends_id.append(relation['id2'])
            if relation['id2'] == user_id:
                friends_id.append(relation['id1'])
        for user in result:
            if user['id'] in friends_id:
                final_res['friends'].append(user)
            else:
                final_res['not_friends'].append(user)
        # query = f"SELECT * from requests where sender_id = '{user_id}' or id2 = '{user_id}'"
        # cursor.execute(query)
        # res3 = cursor.fetchall()
        #
        # print("FRIENDS", final_res['friends'])
        # print("NOT_FRIENDS", not_friends)
        return final_res
    except Exception as e:
        return {'error': 500, 'details': 'finding match' + str(e)}


def update_request(cursor, args):
    try:
        logged_in_id = args[0]
        id2 = args[1]
        respond = args[2]
        if respond == 'accept':
            query = f"INSERT into friends_connection VALUES ('{logged_in_id}', '{id2}');"
            cursor.execute(query)
            connection.commit()
            query = f"DELETE FROM requests where receiver_id = '{logged_in_id}' and sender_id = '{id2}';"
            cursor.execute(query)
            connection.commit()
        else:
            query = f"DELETE FROM requests where receiver_id = '{logged_in_id}' and sender_id = '{id2}';"
            cursor.execute(query)
            connection.commit()
    except Exception as err:
        print("500 - Internal error", err)


def send_request(cursor, args):
    try:
        sender_id = args[0]
        receiver_id = args[1]
        message = args[2]
        query = f"INSERT into requests  VALUES ('{sender_id}', '{receiver_id}', '{message}');"
        cursor.execute(query)
        connection.commit()
    except Exception as e:
        return {'error': 500, 'details': 'adding friends' + str(e)}


def get_dogs(cursor, args):
    try:
        _id = args[0]
        query = f"SELECT * FROM dog WHERE owner_id = '{_id}';"
        cursor.execute(query)
        res = cursor.fetchall()
        return res
    except Exception as e:
        return {'error': 500, 'details': 'getting dog' + str(e)}


def status_on_friends(cursor, args):
    try:
        _id = args[0]
        friends = get_friends(cursor, _id)
        online_friends = []
        for friend in friends:
            if friend['status'] == 1:
                online_friends.append(friend)
        return online_friends
    except Exception as e:
        return {'error': 500, 'details': 'getting on status friends' + str(e)}


def change_status(cursor, args):
    try:
        _id = args[0]
        result = args[1]
        print("CHANGE", _id, result)
        query = f"UPDATE user SET status = {result} WHERE id = '{_id}';"
        cursor.execute(query)
        connection.commit()
    except Exception as e:
        return {'error': 500, 'details': 'getting on status friends' + str(e)}


def get_user(cursor, args):
    try:
        _id = args[0]
        query = f"SELECT * FROM user WHERE id = '{_id}';"
        cursor.execute(query)
        res = cursor.fetchall()
        if len(res) == 0:
            return {}
        return res[0]
    except Exception as e:
        return {'error': 500, 'details': 'getting user' + str(e)}


def get_requests(cursor, args):
    try:
        _id = args[0]
        query = f"SELECT * FROM requests WHERE receiver_id = '{_id}';"
        cursor.execute(query)
        res = cursor.fetchall()
        dogs = main_db('get_dogs', _id)
        res['dog'] = dogs
        if len(res) == 0:
            return {}
        return res
    except Exception as e:
        return {'error': 500, 'details': 'getting user' + str(e)}


def main_db(action, *args):
    try:
        with connection.cursor() as cursor:
            if action == 'new_user':
                return add_new_user(cursor, args)
            elif action == 'new_dog':
                return add_new_dog(cursor, args)
            elif action == 'new_friends':
                return add_new_friends(cursor, args)
            elif action == 'find_match':
                return find_match(cursor, args)
            elif action == 'send_request':
                return send_request(cursor, args)
            elif action == 'update_request':
                return update_request(cursor, args)
            elif action == 'status_on_friends':
                return status_on_friends(cursor, args)
            elif action == 'get_dogs':
                return get_dogs(cursor, args)
            elif action == 'get_user':
                return get_user(cursor, args)
            elif action == 'change_status':
                return change_status(cursor, args)
            elif action == 'get_requests':
                return get_requests(cursor, args)
            else:
                return {'error': 400, 'details': 'Invalid option '}
    except Exception as err:
        print("500 - Internal error", err)


new_user1 = {
    "id": "0",
    'first_name': "Basil",
    'last_name': "Sgier",
    'user_name': "basilsgier",
    'password': "23",
    'age': 25,
    'gender': "M",
    'city': "Haifa",
    'phone_number': "0533013218",
    'status': 0
}

new_user2 = {
    "id": "0",
    'first_name': "Aseel",
    'last_name': "Sakass",
    'user_name': "AseelSakas",
    'password': "123",
    'age': 25,
    'gender': "F",
    'city': "Yaseef",
    'phone_number': "054421313",
    'status': 0
}

new_user3 = {
    "id": "0",
    'first_name': "Amjad",
    'last_name': "Bashiti",
    'user_name': "AmjadB",
    'password': "123",
    'age': 24,
    'gender': "M",
    'city': "Yaseef",
    'phone_number': "0599321313",
    'status': 0
}

new_user4 = {
    "id": "0",
    'first_name': "adam",
    'last_name': "nope",
    'user_name': "aaa",
    'password': "1",
    'age': 32,
    'gender': "M",
    'city': "Yaseef",
    'phone_number': "053321313",
    'status': 0
}

new_dog1 = {
    "id": "0",
    'photo_url': "Capture.PNG",
    'dog_name': "shane",
    'description': "a lovely husky dog 4 months old",
    'owner_id': 2
}

new_dog2 = {
    "id": "0",
    'photo_url': "Capture2.jpeg",
    'dog_name': "milano",
    'description': "a lovely bommernian dog 2 years old",
    'owner_id': 4
}


# print(main_db('new_user', new_user1))
# print(main_db('new_user', new_user2))
# print(main_db('new_user', new_user3))
# print(main_db('new_user', new_user4))
# print(main_db('new_dog', new_dog1))
# print(main_db('new_dog', new_dog2))
# print(main_db('new_friends', 3, 2))
# print(main_db('new_friends', 2, 4))
# print(main_db('send_request', 3, 1, "Hello friend!!"))
# print(main_db('update_request', 1, 3, "accept"))
# print(main_db('get_dogs', 2))
# print(main_db('find_match', 2, 'Yaseef'))
# print(main_db('status_on_friends', 2))
# print(main_db('find_match', 2, 'Yaseef'))
# print(main_db('change_status', 2, 1))

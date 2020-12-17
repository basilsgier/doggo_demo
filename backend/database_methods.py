from database_connection import connection
import requests


def add_new_user(cursor, args):
    user = args[0]
    table_name = 'user'
    temp_user = {}
    attributes = {'id', 'first_name', 'last_name', 'user_name', 'password', 'age', 'gender', 'city', 'phone_number',
                  'status', 'image_url'}
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
        query = f"SELECT * from user where id = '{user_id}'"
        cursor.execute(query)
        res = cursor.fetchall()
        user_city = res[0]['city']
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
        for relation in res2:
            if relation['id1'] == user_id:
                friends_id.append(relation['id2'])
            if relation['id2'] == user_id:
                friends_id.append(relation['id1'])
        for user in result:
            user['dog'] = main_db('get_dog', user['id'])
            if user['id'] in friends_id:
                final_res['friends'].append(user)
            else:
                final_res['not_friends'].append(user)
        return final_res
    except Exception as e:
        return {'error': 500, 'details': 'finding match' + str(e)}


def update_request(cursor, args):
    try:
        logged_in_id = args[0]
        id2 = args[1]
        respond = args[2]
        print(logged_in_id, id2, respond)
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
        print("FINISHED")
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
        print(_id, res)
        if len(res) == 0:
            return []

        query = f"SELECT * FROM user;"
        cursor.execute(query)
        users = cursor.fetchall()
        sender_ids = set([val['sender_id'] for val in res])
        final_res = []
        for user in users:
            if user['id'] in sender_ids:
                user['dog'] = main_db('get_dogs', user['id'])
                user['status'] = 'not_responded'
                final_res.append(user)
        return final_res
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


user_1 = {
    "id": "0",
    'first_name': "Aseel",
    'last_name': "Sakas",
    'user_name': "AseelSakas",
    'password': "23",
    'age': 25,
    'gender': "F",
    'city': "Kfar Yassif",

    'phone_number': "0544280415",
    'status': 0,
    'image_url': 'aseel.jpeg',
}
dog_1 = {
    "id": "0",
    'photo_url': "shane.jpeg",
    'dog_name': "Shane",
    'description': "Climate change is real but i'm loving it!",
    'owner_id': 1
}

user_2 = {
    "id": "0",
    'first_name': "Paris",
    'last_name': "Hilton",
    'user_name': "paris.hilton",
    'password': "23",
    'age': 25,
    'gender': "F",
    'city': "Haifa",

    'phone_number': "054228899",
    'status': 0,
    'image_url': 'paris_hilton.jpg',
}

dog_2 = {
    "id": "0",
    'photo_url': "chiuaua.jpg",
    'dog_name': "Tinkerbell",
    'description': "Louis Vuitton adores me!",
    'owner_id': 2
}
user_3 = {
    "id": "0",
    'first_name': "Wisam",
    'last_name': "Armaly",
    'user_name': "wisamA",
    'password': "23",
    'age': 24,
    'gender': "M",
    'city': "Haifa",
    'phone_number': "0533013218",
    'status': 0,
    'image_url': 'wisam.jpeg',
}
dog_3 = {
    "id": "0",
    'photo_url': "wisam_max.jpeg",
    'dog_name': "Max",
    'description': "Hard from the outside soft from the inside",
    'owner_id': 3
}

user_4 = {
    "id": "0",
    'first_name': "Barack",
    'last_name': "Obama",
    'user_name': "baracks",
    'password': "23",
    'age': 59,
    'gender': "M",
    'city': "Kfar Yassif",
    'phone_number': "053*******",
    'status': 0,
    'image_url': 'obama.jpg',
}

dog_4 = {
    "id": "0",
    'photo_url': "obama_bo.jpg",
    'dog_name': "Bo",
    'description': "You can call me mr BO",
    'owner_id': 4
}


user_5 = {
    "id": "0",
    'first_name': "Vladimir",
    'last_name': "Putin",
    'user_name': "SU",
    'password': "100",
    'age': 68,
    'gender': "M",
    'city': "Kfar Yassif",
    'phone_number': "053*******",
    'status': 0,
    'image_url': 'putin.jpg',
}
dog_5 = {
    "id": "0",
    'photo_url': "laika.png",
    'dog_name': "Laika",
    'description': "Why run when you can float",
    'owner_id': 5
}
user_6 = {
    "id": "0",
    'first_name': "Basil",
    'last_name': "Sgier",
    'user_name': "basilsgier",
    'password': "23",
    'age': 25,
    'gender': "M",
    'city': "Haifa",
    'phone_number': "0533082496",
    'status': 0,
    'image_url': 'basil.jpeg',

}
dog_6 = {
    "id": "0",
    'photo_url': "basil_dog.jpeg",
    'dog_name': "Milano",
    'description': "Disney princesses have nothing on me",
    'owner_id': 6
}

user_7 = {
    "id": "0",
    'first_name': "Amjad",
    'last_name': "Bashiti",
    'user_name': "AmjadB",
    'password': "123",
    'age': 24,
    'gender': "M",
    'city': "Haifa",

    'phone_number': "0544269758",
    'status': 0,
    'image_url': 'amjad.jpeg'
}
dog_7 = {
    "id": "0",
    'photo_url': "lord.jpeg",
    'dog_name': "Lord",
    'description': "Elegance is an attitude",
    'owner_id': 7
}

user_8 = {
    "id": "0",
    'first_name': "The",
    'last_name': "Queen",
    'user_name': "lili",
    'password': "123",
    'age': 94,
    'gender': "M",
    'city': "Haifa",

    'phone_number': "0547824589",
    'status': 0,
    'image_url': 'queen.jpg'
}
dog_8 = {
    "id": "0",
    'photo_url': "queen_dog.jpg",
    'dog_name': "Corgi",
    'description': "Where's my butler?",
    'owner_id': 8
}


print(main_db('new_user', user_1))
print(main_db('new_user', user_2))
print(main_db('new_user', user_3))
print(main_db('new_user', user_4))
print(main_db('new_user', user_5))
print(main_db('new_user', user_6))
print(main_db('new_user', user_7))
print(main_db('new_user', user_8))

print(main_db('new_dog', dog_1))
print(main_db('new_dog', dog_2))
print(main_db('new_dog', dog_3))
print(main_db('new_dog', dog_4))
print(main_db('new_dog', dog_5))
print(main_db('new_dog', dog_6))
print(main_db('new_dog', dog_7))
print(main_db('new_dog', dog_8))
# print(main_db('new_friends', 3, 2))
# print(main_db('new_friends', 2, 4))
# print(main_db('send_request', 5, 2, "Hello friend!!"))
# print(main_db('send_request', 3, 2, "Hello friend!!"))
# print(main_db('send_request', 4, 2, "Hello friend!!"))
# print(main_db('update_request', 1, 3, "accept"))
# print(main_db('get_dogs', 2))
# print(main_db('find_match', 2, 'Yaseef'))
# print(main_db('status_on_friends', 2))
# print(main_db('find_match', 2, 'Yaseef'))
# print(main_db('change_status', 2, 1))


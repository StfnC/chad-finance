"""
Ce script permet de populer la base de donnees avec des utilisateurs et des transactions fictives
"""

import requests
import random

BASE_API_URL = 'http://127.0.0.1:8000'
token = ""


def create_trade(symbol, quantity, email, password):

    my_headers = {"Authorization": f"JWT {get_token(email, password)}"}
    data = {
        "symbol": symbol,
        "quantity": quantity,
    }
    response = requests.post(
        f"{BASE_API_URL}/api/trade/", data=data, headers=my_headers)

    if(str(response.status_code)[0] == '2'):
        print(response.json())

    else:
        print("error in creating a trade")
        print(response.status_code)


def create_user(email, first_name, last_name, password):

    user = {
        'email': email,
        'first_name': first_name,
        'last_name': last_name,
        'password': password,
        're_password': password,
    }
    response = requests.post(f"{BASE_API_URL}/auth/users/", data=user)


def get_token(email, password):
    data = {
        "email": email,
        "password": password,
    }
    response = requests.post(f"{BASE_API_URL}/auth/jwt/create/", data=data)

    if(str(response.status_code)[0] == '2'):
        token = response.json()['access']
        print(token)
        return token
    else:
        print("error in displaying token")
        print(response.status_code)


def test():
    symbols = ["TSLA", "MSFT", "AAPL", "GME", "AMD"]
    quantities = range(1, 10)

    for x in range(10):
        email = f"test{x}@example.com"
        firstname = f"test{x}"
        lastname = f"test{x}"
        password = "zaqwsx123"

        create_user(email, firstname, lastname, password)

    input("Veuillez activer les utilisateurs dans la page administrateur (appuyez sur ENTER pour continuer): ")

    for x in range(10):
        email = f"test{x}@example.com"
        password = "zaqwsx123"
        print("- email:"+email)
        create_trade(random.choice(symbols), random.choice(
            quantities), email, password)


test()

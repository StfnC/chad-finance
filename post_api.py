#from chad_finance.api.models import Portfolio
import requests

BASE_API_URL = 'http://127.0.0.1:8000'
token = ""

# GET - POST - PUT
# TODO
# Connecter l'utilisateur avec son token comme ca un trade peut s'effectuer


def create_trade(symbol, buy_price, quantity, portfolio, email, password):

    my_headers = {"Authorization": f"JWT {get_token(email, password)}"}
    data = {
        "symbol": symbol,
        "buy_price": buy_price,
        "quantity": quantity,
        "portfolio": portfolio,
    }
    response = requests.post(
        f"{BASE_API_URL}/api/trade/", data=data, headers=my_headers)

    if(str(response.status_code)[0] == '2'):
        print(response.json())

    else:
        print("error in creating a trade")
        print(response.status_code)

    # si le username cherché et le mdp est égale à celui logged in faire ça


def create_user(email, first_name, last_name, password):

    user = {
        'email': email,
        'first_name': first_name,
        'last_name': last_name,
        'password': password,
        're_password': password,
    }
    response = requests.post(f"{BASE_API_URL}/auth/users/", data=user)
    # print(response.status_code)


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


def get_portfolio(email, password):
    my_headers = {"Authorization": f"JWT {get_token(email, password)}"}
    response = requests.get(
        f"{BASE_API_URL}/api/portfolio/", headers=my_headers)

    # Si le code commence par 2, la requete est valide
    if str(response.status_code)[0] == "2":
        return response.json()
    else:
        print("Could not retrieve portfolio")
        print(response.status_code)
        print(response.json())


def test():
    symbol = "TSLA"
    buyprice = 400
    quantity = 3

    for x in range(10):
        email = f"test{x}@example.com"
        firstname = f"test{x}"
        lastname = f"test{x}"
        password = "billiboob54321"

        create_user(email, firstname, lastname, password)

    input("Veuillez activer les utilisateurs dans la page administrateur (appuyez sur ENTER pour continuer): ")

    for x in range(5):
        email = f"test{x+4}@example.com"
        password = "billiboob54321"
        # On recupere le id du portfolio de l'utilisateur
        portfolio = get_portfolio(email, password)["id"]
        print("- email:"+email)
        create_trade(symbol, buyprice, quantity*x +
                     2, portfolio, email, password)


test()

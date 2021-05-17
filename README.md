# Projet d'intégration

![Chad Finance](chad_finance_logo.png)

## Structure du projet

Le projet est séparé en une application Django et une React.

Voici les fichiers qui sont responsables de l'API Rest:

| Fichier | Contenu |
| ------- | ------- |
| views.py | Définit la logique derrière chaque endpoint de l'API |
| urls.py | Définit les différents endpoints et la classe responsable de gérer chaque endpoint |
| serializers.py | Serializers des différents objets de la base de données |
| permissions.py | Définit une permission qui permet de limitter l'accés à l'API |

Voici les fichiers qui sont responsables de la page d'administration:

| Fichier | Contenu |
| ------- | ------- |
| admin.py | Personnalisation de la page d'administration |
| forms.py | Logique des formulaires pour créer et modifier un compte utilisateur depuis la page d'administration |

Voici les fichiers qui sont responsables de l'architecture de la base de données:

| Fichier | Contenu |
| ------- | ------- |
| models.py | Définit la structure de la base de données, comme les tables et les colonnes |
| managers.py | Définit comment enregister un utilisateur dans la base de données |

Ces fichiers se trouvent dans chad_finance/api

Les autres fichiers dans le dossier chad_finance sont générés par Django lors de la création du projet.

Les fichiers responsables des différentes pages web se trouvent dans frontend/src/components.

Les fichiers dans frontend/src/actions et dans frontend/src/reducers sont utilisés pour gérer l'authentification du côté de React en utilisant [Redux](https://redux.js.org/)

Le fichier frontend/src/App.js définit les différents urls de l'application et les components associés à ces pages.

## Installation

Assurez-vous d'avoir [Python](https://www.python.org/) 3.8+ et [Node.JS](https://nodejs.org/) 14.17.0+

Pour le backend:

Activez un environnement virtuel et exécutez la commande suivante pour installer les dépendances.

```code
pip install -r requirements.txt
```

Ensuite, pour activer le serveur de développement, utilisez les commandes suivantes:

```code
cd chad_finance
python manage.py runserver
```

Pour le frontend:

Pour installer les dépendances, utilisez les commandes suivantes:

```code
cd frontend
npm install
```

Pour lancer l'application en mode développement:

```code
npm start
```

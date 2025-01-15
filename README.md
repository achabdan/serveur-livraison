# OSRM Server

Ce serveur est une application Node.js utilisant Express qui permet d'interagir avec le service OSRM (Open Source Routing Machine) pour fournir des itinéraires et rechercher des points proches sur une route.


## Fonctionnalités

- Obtenir un itinéraire entre deux points.
- Trouver le point le plus proche sur une route (Snap to Road).

## Prérequis

- Node.js (version 16 ou supérieure)

## Installation

Clonez ce répertoire :


git clone <url-du-repo>
Accédez au dossier du projet :

cd osrm-server
Installez les dépendances :


npm install
Utilisation
Démarrage du serveur
Pour démarrer le serveur en mode production :


npm start
Pour démarrer le serveur en mode développement (avec redémarrage automatique) :


npm run dev
Le serveur sera accessible à l'adresse : http://localhost:3000.

Routes disponibles
Obtenir un itinéraire
Requête :

http
Copier le code
GET /route?start=lat1,lon1&end=lat2,lon2
Paramètres :

start : Coordonnées GPS du point de départ (format : latitude,longitude).
end : Coordonnées GPS du point d'arrivée (format : latitude,longitude).
Exemple :

http
Copier le code
GET /route?start=13.388860,52.517037&end=13.397634,52.529407
Réponse :

Un objet JSON contenant l'itinéraire calculé par OSRM.

Trouver le point le plus proche
Requête :

http
Copier le code
GET /nearest?coordinates=lat,lon
Paramètres :

coordinates : Coordonnées GPS du point à rechercher (format : latitude,longitude).
Exemple :

http
GET /nearest?coordinates=13.388860,52.517037
Réponse :

Un objet JSON contenant les informations du point le plus proche.

Dépendances
Express : Framework web minimaliste.
node-fetch : Client HTTP pour effectuer des requêtes API.
Exemple d'utilisation
Obtenir un itinéraire :


curl "http://localhost:3000/route?start=13.388860,52.517037&end=13.397634,52.529407"
Trouver un point proche :

curl "http://localhost:3000/nearest?coordinates=13.388860,52.517037"

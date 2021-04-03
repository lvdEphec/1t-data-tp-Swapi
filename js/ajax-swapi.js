"use strict";


/* Exercice réaliser des requêtes ajax sur une api et construire dynmiquement du code HTML */

// Version avec beaucoup de commentaire, pour aider à la compréhension et à la réalisation.

// serveur original (mort) : https://swapi.co/api
// nouveau serveur : https://devweb.ephec.be/swapi


/* Un début de code fonctionnel vous est fourni, avec notamment le premier appel ajax.
L'objectif ici est de construire le <select> avec comme <option> les noms des films (les valeurs étant les id correspondant).
En parallèle, remplir une variable pour garder en mémoire les liens des personnages de ces films.
Ensuite, lors d'un changement dans ce select, 
faire des appels sur ces liens de personnages pour pouvoir afficher les noms des personnages des films dans la liste <ul> de la page.
*/


/* *********** CONSTANTES et variables globales ************* */

// Les id de la page html sont enregistrés dans des constantes
const ID_CHOIX_FILM = "choixFilm";
const ID_LISTE_PERSONNAGES = "listePersonnages";

// Objet faisant le lien entre le numéro de l'épisode du film et les personnages.
// exemple : { "4" : ["https://devweb.ephec.be/swapi/people/1/", "https://devweb.ephec.be/swapi/people/2/", ...],  "1" : [...], ... ]
let filmsLiensActeurs;


/* *********** Fonctions utilitaires ************* */

/**
 * Raccourcit l'écriture de document.getElementById
 * @param {string} id - L'id de l'élément que l'on désire récupérer. Obligatoire.
 * @returns {Element} Retourne la référence à l'objet correspondant à l'élément de la DOM avec l'id recherché (ou nullsi l'id n'est pas retrouvé).
 */
function gid(id) {
    return document.getElementById(id);
}


/* *********** Gestions du chargement initial de la page ************* */

// Définit une fonction appelée lorsque la page est chargée.
// Attention, ici on référence la fonction "initialiser", on ne l'exécute pas, donc pas de parenthèses "initialiser()".
// Autre posibilité : // window.addEventListener('load', initialiser); // ou encore : attribut "onload='initialiser();'" dans le <body> du ficher html
document.addEventListener('DOMContentLoaded', initialiser);

/**
 * Fonction appelée au chargement de la page pour initialiser ce qui doit l'être
 * Ajoute un événement "change" au choix des films.
 * Remplit la liste déroulante avec les films.
 * Pas de paramètre et pas de retour.
 */
function initialiser() {
    // Définit quelle fonction est appelée lorsque le choix de film change.
    // L'élément avec l'id "choixFilm" doit exister pour pouvoir lui ajouter un évènement,
    // cela est donc effectué après le chargement initial de la page dans la fonction "initialiser".
    gid(ID_CHOIX_FILM).addEventListener('change', chargerPersonnages);

    // Requête Ajax et remplissage des titres dans la liste de choix.
    chargerTitres();
}


/************ Chargement de la liste des choix de film **************/

/**
 * Effectue une requête AJAX pour remplir la liste des films.
 * Pas de paramètre et pas de retour.
 */
function chargerTitres() {    
    console.log("--------------- DEBUT chargerTitres()");

    // on crée une nouvelle requête
    let xhr = new XMLHttpRequest();

    // on précise qu'il s'agit d'un GET, l'adresse url et le fait qu'elle soit asynchrone
    xhr.open('get', 'https://devweb.ephec.be/swapi/films/', true);

    // on indique quelle fonction exécuter lorsqu'on reçoit la réponse et que tout va bien
    xhr.onload = callBackRemplirListeFilm;

    // Ici la requête Ajax est minimaliste (on ne teste pas les états, les cas d'erreur, etc...)
    // on exécute la requête
    xhr.send()
    // QUESTION : qu'affichera la ligne suivante, et surtout, comprendre POURQUOI :
    console.log("xhr.responseText : "); // ligne à supprimer
    console.log(xhr.responseText);      // ligne à supprimer

    console.log("--------------- FIN chargerTitres()");
}

/**
 * Fonction callback appelée à la réception d'un appel sur les films
 * pour contruire les options du select du choix des films, l'ajouter à la page
 * et remplir le tableau associatif qui lie l'id des films à un array des liens des personnages de ce film.
 * Pas de paramètre et pas de retour.
 */
function callBackRemplirListeFilm() {
    console.log("--------------- DEBUT callBackRemplirListeFilm()");
    // Attention, "this" ici est... subtile.
    // Etant donné que la variable xhr est déclarée dans "chargerTitres", elle n'est pas connue ici.
    // Pourtant nous en avons besoin ici pour traiter la réponse.
    // =>
    // Nous allons donc ici utiliser la variable "this" de cette fonction.
    // "this" d'une fonction fait référence au contexte dans lequel la fonction est appelée, c'est le propriétaire, celui qui appelle.
    // Quand est-ce que "callBackRemplirListeFilm" est appelé ? Lors du xhr.onload, soit lorsque le xhr recoit une bonne réponse.
    // C'est le xhr qui appelle la fonction "onload", soit "callBackRemplirListeFilm", à ce moment.
    // Le "this" dans cette fonction est donc l'objet xhr.
    // Cela nous permet d'accéder au responseText du xhr. (Ne pas hésiter à regarder les attributs de cet objet en console.
    console.log("this : ");
    console.log(this);    

    // Le JSON.parse permet simplement de convertir la réponse JSON en objet javascript.
    let reponse = JSON.parse(this.responseText);

    // Maintenant, parcourir et récupérer tous les films dans la réponse. Regarder sa tructure :
    console.log("reponse : ");
    console.log(reponse);   
    // On désire afficher la liste des noms de films et avoir comme value l'id de l'épisode.
    // Optionnel : trier les films sur base de l'id de l'épisode 

    console.log("TODO : Traiter la réponse pour charger les titres des films dans la liste déroulante");
    
    // Nous aurons besoin par après de pouvoir appeler les lies des personnages pour récupérer leurs noms et les afficher.
    // Nous allons donc ici en profiter pour remplir la variable globale "filmsLiensActeurs" sur base de la "reponse" parcourue
    console.log("TODO : Remplir \"filmsLiensActeurs\" pour pouvoir plus tard " +
                "récupérer l'array des liens des personnages d'un film sur base de l'id d'un film");

                
    console.log("--------------- FIN callBackRemplirListeFilm()");
    
}


/************ Affichage des personnages du film sélectionné **************/

/**
 * Fonction appelée lors d'un changement de choix de film.
 * Effectue des appels aux liens des films pour récupérer les informatiosn des personnages des films
 * dans l'objectif de compléter la liste des noms des personnages du film sélectionné.
 * Pas de paramètre et pas de retour.
 */
function chargerPersonnages() {
    console.log("--------------- DEBUT chargerPersonnages()");

    // Grâce à l'événement "change" sur le select (élément avec id "choixFilm"), cette fonction sera appelée.
    // Grâce addeventlistener sur le select, c'est le select qui appellera cette fonction.
    // La variable "this" de cette fonction sera donc le select
    // et "this.value" sera la valeur correspondante à l'élément sélectionné, soit l'id du film correspondant.
    console.log("this.value : ");
    console.log(this.value);

    // Grâce à cet id de film, vous allez pouvoir retrouver l'array des liens des personnages du film
    // dans la variable construite "filmsLiensActeurs",
    // puis boucler dessus pour faire à chaque fois un appel ajax sur le lien 
    // et appeler "callBackAjouterPersonnage" lorsque vous recevez le résultat.
    console.log("TODO : charger les personnages du film sélectionné, avec requête Ajax puis construction HTML"); 
    
    // Remarque : vous utiliserez à chaque fois une variable "xhr" (ou "requete" par exemple) pour les différents appels.
    // Il est donc impossible ici d'utiliser "xhr" en variable global, sinon il y aurait des conflits !
    
    console.log("--------------- FIN chargerPersonnages()");
}

/**
 * Fonction callback appelée à la réception d'un appel sur un personnage de film
 * pour contruire un élément de la liste des personnage, et l'ajouter à la page.
 * Pas de paramètre et pas de retour.
 */
function callBackAjouterPersonnage() {
    // A chaque fois que l'on va reevoir les infos d'un personnage, 
    // on va créer un élément <li> avec son nom et l'ajouter à la page. 
    console.log("TODO : ajouter un personnage à la liste dans la page HTML");

    // Avec ce fonctionnement, dès qu'un résultat arrive, il est placé dans la page, on remarque donc :
    // 1) Les noms s'affichent donc rapidement les uns après les autres, pas en une fois.
    // 2) Les noms ne s'affichent pas toujours dans le même ordre. Les appels aux noms étant asynchrones,
    // les réponses n'arrivent pas forcément dans le même ordre
    
    // Si on désire pouvoir afficher tout en une fois, voire afficher les noms triés, 
    // une possibilité est de stocker les réponses reçues tout en comptant le nombre de réponses
    // puis trier et afficher une fois que le nombre de réponses attendu est arrivé. 
    // (D'autres possibilités également, avec Promise.all par exemple, mais cela sort du cadre de ce cours.)
}

/**
 * Met tous les élément <li> de la page en italique.
 * Pas de paramètre et pas de retour.
 */
function mettreListeItalique() {
    console.log("TODO : mettre tous les élément <li> de la page en italique");
}

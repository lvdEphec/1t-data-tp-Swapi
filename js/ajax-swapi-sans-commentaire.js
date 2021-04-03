"use strict";

/* Exercice réaliser des requêtes ajax sur une api et construire dynmiquement du code HTML */

// Version allégée, en ayant retiré commentaires et aide, pour ceux qui préfèrent cela.

/* Un début de code fonctionnel vous est fourni, avec notamment le premier appel ajax.
L'objectif ici est de construire le <select> avec comme <option> les noms des films (les valeurs étant les id correspondant).
En parallèle, remplir une variable pour garder en mémoire les liens des personnages de ces films.
Ensuite, lors d'un changement dans ce select, 
faire des appels sur ces liens de personnages pour pouvoir afficher les noms des personnages des films dans la liste <ul> de la page.
*/


/* *********** CONSTANTES et variables globales ************* */

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

document.addEventListener('DOMContentLoaded', initialiser);

/**
 * Fonction appelée au chargement de la page pour initialiser ce qui doit l'être
 * Ajoute un événement "change" au choix des films.
 * Remplit la liste déroulante avec les films.
 * Pas de paramètre et pas de retour.
 */
function initialiser() {
   
    gid(ID_CHOIX_FILM).addEventListener('change', chargerPersonnages);

    chargerTitres();
}


/************ Chargement de la liste des choix de film **************/

/**
 * Effectue une requête AJAX pour remplir la liste des films.
 * Pas de paramètre et pas de retour.
 */
function chargerTitres() {  
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'https://devweb.ephec.be/swapi/films/', true);
    xhr.onload = callBackRemplirListeFilm;
    xhr.send()
}

/**
 * Fonction callback appelée à la réception d'un appel sur les films
 * pour contruire les options du select du choix des films, l'ajouter à la page
 * et remplir le tableau associatif qui lie l'id des films à un array des liens des personnages de ce film.
 * Pas de paramètre et pas de retour.
 */
function callBackRemplirListeFilm() {

    let reponse = JSON.parse(this.responseText);

    console.log("TODO : Traiter la réponse pour charger les titres des films dans la liste déroulante");
    console.log("TODO : Remplir \"filmsLiensActeurs\" pour pouvoir plus tard " +
                "récupérer l'array des liens des personnages d'un film sur base de l'id d'un film");
}


/************ Affichage des personnages du film sélectionné **************/

/**
 * Fonction appelée lors d'un changement de choix de film.
 * Effectue des appels aux liens des films pour récupérer les informatiosn des personnages des films
 * dans l'objectif de compléter la liste des noms des personnages du film sélectionné.
 * Pas de paramètre et pas de retour.
 */
function chargerPersonnages() {
    console.log("TODO : charger les personnages du film sélectionné, avec requête Ajax puis construction HTML"); 
}

/**
 * Fonction callback appelée à la réception d'un appel sur un personnage de film
 * pour contruire un élément de la liste des personnage, et l'ajouter à la page.
 * Pas de paramètre et pas de retour.
 */
function callBackAjouterPersonnage() {   
    console.log("TODO : ajouter un personnage à la liste dans la page HTML");
}

/**
 * Met tous les élément <li> de la page en italique.
 * Pas de paramètre et pas de retour.
 */
function mettreListeItalique() {
    console.log("TODO : mettre tous les élément <li> de la page en italique");
}

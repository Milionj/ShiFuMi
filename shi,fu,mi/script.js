// les éléments utiles récupéré
let resetBtn = document.getElementById("reset");
let scoreJoueurElement = document.getElementById("score-joueur");
let scoreOrdinateurElement = document.getElementById("score-ordinateur");
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];
let opierreBtn = document.getElementById("opierre");
let ofeuilleBtn = document.getElementById("ofeuille");
let ociseauxBtn = document.getElementById("ociseaux");
let message = document.getElementById("message");
let nextBtn = document.getElementById("next");

let scoreJoueur = 0;
let scoreOrdinateur = 0;
let finDuJeu = false;

const jouerManche = (e) => {
  if (finDuJeu) return;

  let choix = e.target.closest(".btn-joueur");

  btnJoueur.forEach((btn) => {
    btn.classList.add("desactivated");
    btn.removeEventListener("click", jouerManche);
  });

  choix.classList.remove("desactivated");
  choix.classList.add("active");

  let choixJoueur = choix.id;

  let choixOrdi = faireChoixOridnateur();

  verifierGagnant(choixJoueur, choixOrdi);

  nextBtn.style.visibility = "visible";
};

const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

const faireChoixOridnateur = () => {
  // 0 = pierre
  // 1 = feuille
  // 2 = ciseaux

  let nbAleatoire = Math.floor(Math.random() * 3);

  switch (nbAleatoire) {
    case 0:
      opierreBtn.classList.add("active");
      return PIERRE;
    case 1:
      ofeuilleBtn.classList.add("active");
      return FEUILLE;
    default:
      ociseauxBtn.classList.add("active");
      return CISEAUX;
  }
};

const verifierGagnant = (choixJoueur, choixOrdi) => {
  if (choixJoueur == choixOrdi) {
    message.textContent = "Egalité !";
    return;
  }

  if (choixJoueur == PIERRE) {
    if (choixOrdi == FEUILLE) {
      return victoireOrdinateur();
    } else if (choixOrdi == CISEAUX) {
      return victoireJoueur();
    }
  }

  if (choixJoueur == FEUILLE) {
    if (choixOrdi == CISEAUX) {
      return victoireOrdinateur();
    } else if (choixOrdi == PIERRE) {
      return victoireJoueur();
    }
  }

  if (choixJoueur == CISEAUX) {
    if (choixOrdi == PIERRE) {
      return victoireOrdinateur();
    } else if (choixOrdi == FEUILLE) {
      return victoireJoueur();
    }
  }
};

const victoireOrdinateur = () => {
  scoreOrdinateur++;
  message.textContent = "L'ordinateur gagne...";
  mettreAJourScore();
};

const victoireJoueur = () => {
  scoreJoueur++;
  message.textContent = "Vous avez gagné ! :)";
  mettreAJourScore();
};

const preparerNouvelleManche = () => {
  if (finDuJeu) return;

  btnJoueur.forEach((btn) => {
    btn.classList.remove("desactivated");
    btn.classList.remove("active");

    btn.addEventListener("click", jouerManche);
  });

  nextBtn.style.visibility = "hidden";

  opierreBtn.classList.remove("active");
  ofeuilleBtn.classList.remove("active");
  ociseauxBtn.classList.remove("active");

  message.textContent = "A vous de jouer !";
};

const mettreAJourScore = () => {
  scoreJoueurElement.textContent = scoreJoueur;
  scoreOrdinateurElement.textContent = scoreOrdinateur;

  if (scoreJoueur === 5 || scoreOrdinateur === 5) {
    finDuJeu = true;
    afficherMessageFinal();
  }
};

const afficherMessageFinal = () => {
 
  message.textContent = `Fin du jeu. ${
    scoreJoueur > scoreOrdinateur
      ? "Vous avez gagné ! :)"
      : "L'ordinateur a gagné. :("
  }`;


  const arbitreImg = document.getElementById("arbitre-img");
  arbitreImg.style.display = "block";
};


nextBtn.addEventListener("click", preparerNouvelleManche);

btnJoueur.forEach((btn) => btn.addEventListener("click", jouerManche));

resetBtn.addEventListener("click", () => {
  scoreJoueur = 0;
  scoreOrdinateur = 0;
  finDuJeu = false;

  preparerNouvelleManche();
  mettreAJourScore();
});

//--------------------ELMÉLETI INFORMÁCIÓK:--------------------------------
// // camelcase: camelCase tehát minden összetett szó új összetétetelét nagy betűvel ír -- javaScript (mi ezt fogjuk használni)
// // PascalCase --JavaScript
// // snake_case -- Python
// // kebab-case -- CSS
// // ez csak annyit csinál, hogy kiírja az inspector console blokkjába a szöveget:
// console.log("hello world");
// // commentezés jele
// // ha ide beírok egy hibát, akkor innentől nem fut a kód. A consolban látszik majd a hibajelzés:
// // akjsvh;
// console.log("szia világ");
// // változó definiálása, deklarálása:
// let pontszam = 4;
// // nem módosítható változó deklarálása:
// const pi = 3.14;
// // változó értékének módosítása:
// pontszam = pontszam + 1;
// // változó kiírása:
// console.log(pontszam);
// console.log(pi);
// // konstans értékét nem tudom változtatni, ez hibás:
// // const = 3
// // tömb típusú változó: array (többesszámmal jelöljük, megadása []-ban). Az elemszámot később lehet módosítani
// let scores = [2, 3, 4, 5];
// // full array to console:
// console.log(scores);
// // only one item to console:
// console.log(scores[0]);
// // változó típusok:
// // let a = 2 ez szám típus
// // let b = '2' ez szöveg lesz
// // let c = [2, 3] ez array lesz
// //
// // szekvencia: a program sorról sorra fut le.
// //
// string concatenation
// document.querySelector('.dice').setAttribute('src', 'dice-'+dice+'.png');
// // elágazás: feltétel használatával gy adott kódrész csak akkor fut le, ha a feltétel igaz.
// // az elágazásban használható dolgok:
// // == egyenlő de nem vizsgálja a típust
// // === egyenlő és a típust is nézi
// // !== nem egyenlő
// // && ÉS
// //
// // DRY - Do Not Repeat Yourself - egy kódrészt ha megírtál akkor ne ismételd, használj function-t

// // hoisting: kód futtatás két lépcsőben történik, először végignézi a kódot és összegyűjti a változókat és függvényeket (amelyekre érvényes a hoisting). Ilyenkor még nem lesz értéke. így már tudok rá hivatkozni már azelőtt, hogy adnék neki értéket.

// // változót a let vagy a var kulcsszóval adok meg. A var egy régebben használt dolog, és ez egy hoisted típusú változó, már ne hsználjuk.

// -----------ITT KEZDŐDIK A KÓD--------------------------------------

// változó deklarálás (típust nem kell adni, dinamicly declared a javascript)
let scores, roundScore, activePlayer;

function newGame() {
  // 1.a játékosok pontszámai, mindkét játákos null ponttal indul
  // értékadás : value assignment
  scores = [0, 0];

  // 2.forduló alatt megszerzett pontok
  roundScore = 0;

  // 3.az első játékos kezd, ez a változó fogja mutatni, hogy melyik játékos következik
  activePlayer = 0;

  // dom manipuláció (dom: document object model = HTML kód) - ezzel tudjuk átírni a html értékét

  // kiválsztjuk a score-0 id-vel rendelkező html elemet
  // és a tartalmát beállítjuk 0-ra
  document.querySelector("#score-0").textContent = 0;

  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;

  // a játék indításakor a kocka még nem látszik:
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".btn-hold").style.display = "block";
  document.querySelector(".btn-roll").style.display = "block";

  document.querySelector("#name-0").textContent = "Player 1";
  document.querySelector("#name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");

  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

newGame();

// a kokca dobás, gombra kattintás,  erre egy esemény figyelőt ráteszünk, amire egy function-t indítunk
document.querySelector(".btn-roll").addEventListener("click", function () {
  // 1. generálunk egy véletlen számot, 1-6 között
  const dice = Math.floor(Math.random() * 6) + 1;

  // 2. jelenítsük meg az eredményt a UI-on:
  document.querySelector(".dice").style.display = "block";
  // template string
  document.querySelector(".dice").setAttribute("src", `dice-${dice}.png`);

  // ha nem 1 a dobott érték akkor felírjuk a pontszámot, és ugyanaz a játékos dobhat újra
  // elágazás:
  if (dice !== 1) {
    roundScore = roundScore + dice;
    // a UI-on megjelenítjük az eredményt:
    document.querySelector("#current-" + activePlayer).textContent = roundScore;
  } else {
    // ha a dobott érték 1, akkor a pontok elvesznek és a következő játékos jön
    nextPlayer();
  }
});

function nextPlayer() {
  roundScore = 0;
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }
  // UI-on frissítsük az értékeket:
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
}

document.querySelector(".btn-hold").addEventListener("click", function () {
  // 1. a játékos megszerzi a kör alatt szerzett pontjait
  scores[activePlayer] = scores[activePlayer] + roundScore;
  // scores[activePlayer] += roundScore;

  // 2. UI-t frissítsük
  document.querySelector("#score-" + activePlayer).textContent =
    scores[activePlayer];

  // 3. nézzük meg hogy van e nyertes
  if (scores[activePlayer] >= 100) {
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.add("winner");
    document
      .querySelector(`.player-${activePlayer}-panel`)
      .classList.remove("active");

    document.querySelector("#name-" + activePlayer).textContent = "Winner!";
    document.querySelector(".dice").style.display = "none";
    document.querySelector(".btn-hold").style.display = "none";
    document.querySelector(".btn-roll").style.display = "none";
  } else {
    // másik játékos jön:
    nextPlayer();
  }
});

document.querySelector(".btn-new").addEventListener("click", newGame);

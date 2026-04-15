# 🃏 P100 - Joc Multimèdia Memòria

## 📖 Descripció

Joc de memòria desenvolupat amb **HTML5**, **CSS3** i **jQuery**. L'objectiu és trobar totes les parelles de cartes amb el mínim nombre de clics abans d'esgotar els intents disponibles.

Les cartes s'animen amb transformacions 3D en l'eix Y i transicions CSS de 0,5 segons.

---

## 🎮 Com es juga

1. Fes clic en una carta per girar-la.
2. Fes clic en una segona carta.
   - ✅ Si les dues cartes són iguals → desapareixen del taulell.
   - ❌ Si són diferents → es tornen a girar.
3. Troba totes les parelles per **guanyar**.
4. Si superes el **triple de cartes** en clics → **perds la partida**.

---

## 🚀 Funcionalitats

### Obligatòries
- [x] Generació dinàmica del taulell (de 2×2 fins a 4×4 cartes)
- [x] Barreja aleatòria de les cartes
- [x] Generació dels `div` de les cartes en temps d'execució
- [x] Mides del taulell ajustades automàticament
- [x] Detecció de parella correcta (elimina cartes) i incorrecta (les torna a girar)
- [x] Detecció de final de partida (victòria i derrota)
- [x] Missatge de fi de partida i opció de tornar a jugar

### Ampliacions
- [x] Marcador de parelles trobades i clics restants
- [x] Limitació de temps per resoldre el joc
- [x] Pantalla de configuració inicial (setup)
  - Selecció del nombre de cartes
  - Selecció del joc de cartes
  - Animació d'entrada de les cartes des d'una pila
- [x] Efectes sonors (clic, gir, desaparició, victòria, derrota)

---

## 🗂️ Estructura del projecte

```
P100_idgrup/
├── css/
│   └── estils.css
├── images/
│   └── pokemon.jpg       # Sprite amb totes les imatges
├── js/
│   └── p100-memoria.js   # Lògica principal del joc
├── so/
│   └── *.mp3             # Efectes sonors
└── p100-memoria.html     # Punt d'entrada
```

---

## ⚙️ Tecnologies

| Tecnologia | Ús |
|---|---|
| HTML5 | Estructura de la interfície |
| CSS3 | Animacions 3D, transicions, layout |
| jQuery | Manipulació del DOM i events |
| JavaScript | Lògica del joc |

---

## 🖼️ Mecànica de les cartes

Cada carta es compon de dues cares superposades amb `position: absolute`:

```html
<div class="carta">
  <div class="cara davant"></div>
  <div class="cara darrera"></div>
</div>
```

La rotació s'aplica afegint/traient la classe `carta-girada` via jQuery, i el navegador anima la transició automàticament gràcies a `transition-property: transform`.

Les imatges de les cartes s'obtenen d'un únic **sprite** ajustant la propietat `background-position` de cada carta.

---

## 🛠️ Configuració

Per canviar la mida del taulell, modifica les variables al fitxer `p100-memoria.js`:

```javascript
var nFiles = 4;
var nColumnes = 4;
```

---

## 📦 Lliurament

- Carpeta `.zip` amb tots els fitxers necessaris → `P100_idgrup.zip`
- Pla d'equip setmanal (document apart)

---

## 👥 Autors

| Nom |
|---|
| Ferran |
| Xavi |
| Zenon |

---

## 📚 Assignatura

**103133 - Laboratori Multimèdia 3T**  
TecnoCampus · Escola Superior Politècnica  
Universitat Pompeu Fabra · Curs 2025-2026
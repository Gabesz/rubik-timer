# Stopper Óra

Egy egyszerű, de funkcionális stopper óra alkalmazás Vue.js-sel, ami rögzíti a legjobb időket.

## Funkciók

### 🕐 Stopper Óra
- **Start/Stop/Reset** gombok
- **Billentyűzet rövidítések**: Alt+S (Start/Stop), Alt+X (Reset & Save)
- **Század másodperc pontosság** (MM:SS.CC formátum)
- **Nagy, jól olvasható kijelzés** (5.2rem betűméret)

### 📊 Eredmények Kezelése
- **Legjobb 10 idő** automatikus tárolása
- **Időbélyeg** minden eredménynél (mikor készült)
- **Percenkénti frissítés** az időbélyegeknél
- **localStorage** tárolás (adatok megmaradnak)

### 🎨 Két Mód
- **Normál mód** (`index.html`) - Zöld háttér, tiszta megjelenés
- **Edit mód** (`index.html?edit=1`) - Transparent háttér, teljes funkcionalitás

## Használat

### Normál Mód
- Csak az eredmények megtekintése
- Sorra kattintás → törlés (megerősítés nélkül)
- Stopper órára kattintás → edit módba váltás

### Edit Mód
- Teljes stopper funkcionalitás
- X gombok a sorok végén (megerősítéssel)
- Billentyűzet kombinációk megjelenítése
- "Leave edit mode" gomb

## Billentyűzet Rövidítések

- **Alt + S** - Start/Stop váltás
- **Alt + X** - Reset & Save

## Fájlok

- `index.html` - Fő alkalmazás
- `vue.global.js` - Vue.js 3 könyvtár
- `README.md` - Dokumentáció

## Telepítés

1. Töltsd le a fájlokat
2. Nyisd meg az `index.html`-t böngészőben
3. Kész! Offline működik

## Technikai Részletek

- **Vue.js 3** - Modern JavaScript framework
- **localStorage** - Adatok tárolása
- **CSS3** - Modern stílusok és animációk
- **Responsive design** - FullHD kijelzőre optimalizálva

## Működés

1. **Idő mérése**: Start → Stop → Reset & Save
2. **Eredmények**: Automatikusan rangsorolva (legjobb felül)
3. **Törlés**: Normál módban sorra kattintás, edit módban X gomb
4. **Mód váltás**: Stopper órára kattintás vagy "Leave edit mode" gomb

## Színek

- **Normál mód**: Zöld háttér (#00FF00)
- **Edit mód**: Transparent háttér
- **Legjobb eredmény**: Zöld kiemelés
- **Gombok**: Zöld (Start), Piros (Stop), Narancs (Reset), Piros (Leave edit mode)

## Browszer Támogatás

- Chrome, Firefox, Safari, Edge (modern böngészők)
- JavaScript engedélyezve kell legyen
- localStorage támogatás szükséges

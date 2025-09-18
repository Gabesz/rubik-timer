# Stopper Óra

Egy egyszerű, de funkcionális stopper óra alkalmazás Vue.js-sel, ami rögzíti a legjobb időket. **Kifejezetten live stream tartalomhoz készült**, ahol a nézők számára szórakoztató és interaktív időmérési eszköz.

## 🚀 Demo

**Élő demo**: [https://gabesz.github.io/rubik-timer/?edit=1](https://gabesz.github.io/rubik-timer/?edit=1)

## 🎥 Live Stream Használat

Ez az alkalmazás **OBS Studio** és más stream szoftverekkel való használatra lett optimalizálva. A jobb oldali elrendezés és a zöld háttér (normál módban) lehetővé teszi, hogy könnyedén integráld a stream overlay-edbe.

### Ajánlott Stream Beállítások:
- **Forrás típus**: Browser Source
- **URL**: `index.html` (normál mód) vagy `index.html?edit=1` (szerkesztési mód)
- **Pozíció**: Jobb oldali terület
- **Méret**: FullHD kijelző jobb fele
- **Interakció**: Edit módban teljes funkcionalitás, normál módban csak megjelenítés

## Funkciók

### 🕐 Stopper Óra
- **Start/Stop/Reset** gombok
- **Billentyűzet rövidítések**: Alt+S (Start/Stop), Alt+X (Reset & Save)
- **🎤 Hangvezérlés**: "start/indít/kezd", "stop/megáll/állj", "reset/vissza/nulla", "összes töröl/clear"
- **Század másodperc pontosság** (MM:SS.CC formátum)
- **Nagy, jól olvasható kijelzés** (5.2rem betűméret)

### 📊 Eredmények Kezelése
- **Legjobb 10 idő** automatikus tárolása
- **Időbélyeg** minden eredménynél (mikor készült)
- **Percenkénti frissítés** az időbélyegeknél
- **localStorage** tárolás (adatok megmaradnak)

### 🎨 Két Mód
- **Normál mód** (`index.html`) - Zöld háttér, jobb oldali elrendezés, tiszta megjelenés
- **Edit mód** (`index.html?edit=1`) - Transparent háttér, teljes képernyős középre igazított elrendezés, 2x nagyobb stopper óra, responsive design mobilon

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
- "Összes törlése" gomb (megerősítéssel)
- Responsive design mobilon (függőleges gombok, kisebb stopper óra)

## Billentyűzet Rövidítések

- **Alt + S** - Start/Stop váltás
- **Alt + X** - Reset & Save

## 🎤 Hangvezérlés

### Támogatott Parancsok:
- **Indítás**: "start", "indít", "kezd"
- **Megállítás**: "stop", "megáll", "állj"  
- **Reset**: "reset", "vissza", "nulla"
- **Összes törlése**: "összes töröl", "clear", "töröl minden"

### Használat:
- **Edit módban** aktív (`?edit=1`)
- **Mikrofon engedély** szükséges
- **Magyar és angol** parancsok egyaránt támogatottak
- **Gyors reagálás** - köztes eredményeket is figyeli
- **Console logok** - minden parancs látható a böngésző konzoljában

## Fájlok

- `index.html` - Fő alkalmazás
- `assets/` - Mappa a CSS, JS és Vue.js fájlokkal
  - `style.css` - Stílusok
  - `script.js` - Vue.js alkalmazás logika
  - `vue.global.prod.js` - Vue.js 3 production könyvtár
- `favicon.svg` - Stopper óra ikon
- `README.md` - Dokumentáció

## Telepítés

1. Töltsd le a fájlokat
2. Nyisd meg az `index.html`-t böngészőben
3. Kész! Offline működik

## 🎬 OBS Studio Integráció

### Browser Source Beállítása:
1. **OBS Studio** → Add Source → Browser Source
2. **URL**: Add meg a fájl teljes elérési útját (pl. `file:///C:/path/to/index.html`)
3. **Width**: 960px (FullHD jobb fele)
4. **Height**: 1080px
5. **Interact**: ✅ (ha szerkeszteni szeretnéd)

### Stream Overlay Optimalizáció:
- **Normál mód** (`index.html`) - Nézőknek látható, zöld háttér, jobb oldali elrendezés
- **Edit mód** (`index.html?edit=1`) - Szerkesztéshez, transparent háttér, teljes képernyős középre igazított
- **Jobb oldali pozíció** - Nem takarja a fő tartalmat normál módban
- **Nagy betűk** - Jól látható stream minőségben (edit módban 2x nagyobb)
- **Teljes képernyős edit** - Edit módban minden középen, ideális szerkesztéshez
- **Responsive design** - Edit módban mobilon is tökéletesen működik

## Technikai Részletek

- **Vue.js 3** - Modern JavaScript framework (production build)
- **Web Speech API** - Hangfelismerés (Chrome, Edge, Safari)
- **localStorage** - Adatok tárolása
- **CSS3** - Modern stílusok és animációk
- **Responsive design** - FullHD kijelzőre optimalizálva, mobilon is működik
- **SVG favicon** - Stopper óra ikon
- **Media queries** - Tablet és mobil optimalizáció

## Működés

1. **Idő mérése**: Start → Stop → Reset & Save
2. **Eredmények**: Automatikusan rangsorolva (legjobb felül)
3. **Törlés**: Normál módban sorra kattintás, edit módban X gomb
4. **Mód váltás**: Stopper órára kattintás vagy "Leave edit mode" gomb
5. **Elrendezés**: Normál módban jobb oldali, edit módban teljes képernyős középre igazított
6. **Hangvezérlés**: Edit módban mikrofon engedély után beszélheted a parancsokat

## Színek

- **Normál mód**: Zöld háttér (#00FF00)
- **Edit mód**: Transparent háttér
- **Legjobb eredmény**: Zöld kiemelés
- **Gombok**: Zöld (Start), Piros (Stop), Narancs (Reset), Piros (Leave edit mode)

## Böngésző Támogatás

- **Chrome, Edge, Safari** - Teljes támogatás (hangvezérlés is)
- **Firefox** - Alapvető funkciók (hangvezérlés nem támogatott)
- **JavaScript engedélyezve** kell legyen
- **localStorage támogatás** szükséges
- **Mikrofon engedély** szükséges a hangvezérléshez

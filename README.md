# Stopwatch Timer

A simple yet functional stopwatch application built with Vue.js that records the best times. **Specifically designed for live streaming content**, providing an entertaining and interactive timing tool for viewers.

## 🚀 Demo

**Live demo**: [https://gabesz.github.io/rubik-timer/](https://gabesz.github.io/rubik-timer/)

## 🎥 Live Stream Usage

This application is optimized for use with **OBS Studio** and other streaming software. The right-side layout and green background allow you to easily integrate it into your stream overlay.

### Recommended Stream Settings:
- **Source type**: Browser Source
- **URL**: `index.html`
- **Position**: Right side area
- **Size**: Right half of FullHD display (450px width recommended)
- **Interaction**: Enable interaction to use all features

## Features

### 🕐 Stopwatch Timer
- **Start/Stop/Reset/Clear All** buttons (compact, small size)
- **Smart button states**: Reset & Clear All disabled while timer is running
- **Keyboard shortcuts**: Spacebar (Start/Stop), Alt+S (Start/Stop), Alt+X (Reset & Save)
- **Centisecond precision** (MM:SS.CC format)
- **Large, readable display** (5.2rem font size)
- **Bootstrap styled buttons** (Blue Start, Red Stop, Orange Reset, Red Clear All)

### 📊 Results Management
- **Top 10 times** automatically stored per session
- **Average time (AVG)** calculated and displayed
- **Timestamp** for each result (when created)
- **Minute-by-minute updates** for timestamps
- **localStorage** storage (data persists)
- **Click on row** → delete time (with confirmation)
- **Clear All button** → delete all times (with confirmation, disabled while running)
- **Sound feedback** 🔊 - intelligent audio system:
  - **Applause sound** 👏 - plays when stopping **under 60 seconds** (random selection from 3 sounds)
  - **Time-based sounds** ⏱️ - plays appropriate sound based on elapsed time (up to 70 seconds):
    - 0-30s → 30.mp3 + applause
    - 30-40s → 40.mp3 + applause
    - 40-50s → 50.mp3 + applause
    - 50-60s → 60.mp3 + applause
    - 60-70s → 70.mp3 **(no applause, only time sound)**
- **Top 3 legjobb** 🏆 - tracks and displays the best time from each day, keeps only the top 3 days (black background, white text)

### 🎨 Design
- **Green background** (#00FF00) - easy to remove with chroma key
- **Right-side layout** - doesn't cover main content
- **Dark panel** - good contrast for readability
- **Compact buttons** - small size (btn-sm style), all in one row
- **Smart UI states** - buttons disabled when appropriate
- **Clean appearance** - optimized for streaming

## Keyboard Shortcuts

- **Spacebar** - Start/Stop toggle
- **Alt + S** - Start/Stop toggle
- **Alt + X** - Reset & Save

## Files

- `index.html` - Main application
- `assets/` - Folder with CSS, JS and Vue.js files
  - `style.css` - Styles
  - `script.js` - Vue.js application logic
  - `vue.global.prod.js` - Vue.js 3 production library
  - `sounds/` - Folder with sound effects
    - `applause-75314.mp3` - Applause sound 1
    - `applause-alks-ses-efekti-125030.mp3` - Applause sound 2
    - `applause-cheer-236786.mp3` - Applause sound 3
    - `30.mp3` - Time-based sound for 0-30 seconds
    - `40.mp3` - Time-based sound for 30-40 seconds
    - `50.mp3` - Time-based sound for 40-50 seconds
    - `60.mp3` - Time-based sound for 50-60 seconds
    - `70.mp3` - Time-based sound for 60-70 seconds
- `favicon.svg` - Stopwatch icon
- `README.md` - Documentation

## Installation

1. Download the files
2. Open `index.html` in browser
3. Done! Works offline

## 🎬 OBS Studio Integration

### Browser Source Setup:
1. **OBS Studio** → Add Source → Browser Source
2. **URL**: Enter the full file path (e.g. `file:///C:/path/to/index.html`)
3. **Width**: 450px (or 960px for right half of FullHD)
4. **Height**: 1080px
5. **Interact**: ✅ Enable to use buttons and delete times

### Stream Overlay Optimization:
- **Green background** (#00FF00) - Perfect for chroma key removal
- **Right-side layout** - Doesn't cover main content area
- **Dark panel** - High contrast, clearly visible in stream quality
- **Large text** - Easy to read even at lower streaming bitrates
- **Compact design** - Fits perfectly in 450px width sidebar

## Technical Details

- **Vue.js 3** - Modern JavaScript framework (production build)
- **localStorage** - Data storage (persists between sessions)
- **CSS3** - Modern styles and animations
- **SVG favicon** - Stopwatch icon
- **No external dependencies** - All files included, works offline

## How It Works

1. **Time measurement**: Start → Stop → Reset & Save (Reset disabled while running)
2. **Results**: Automatically ranked (best on top) with average time
3. **Sound feedback**: Time-based sounds (30-70s) and applause (under 60s) play automatically when stopping
4. **Daily records**: Automatically saves the best time from each day, displays top 3 days below the list
5. **Deletion**: Click on any time row to delete it (requires confirmation)
6. **Daily record deletion**: Click on any daily record to delete it (requires confirmation)
7. **Clear All**: Delete all saved times (requires confirmation, disabled while timer is running)
8. **Button layout**: All buttons in one row - Start/Stop, Reset & Save, Clear All (compact size)
9. **Keyboard shortcuts**: Spacebar for quick start/stop, Alt+S and Alt+X for other actions
10. **Auto-save**: Times automatically saved to localStorage

## Colors

- **Background**: Green (#00FF00) - chroma key friendly
- **Panel**: Dark transparent (rgba(0, 0, 0, 0.9))
- **Best result**: Highlighted with green border
- **Buttons**: Blue (Start), Red (Stop), Orange (Reset), Red (Clear All)
- **Daily records**: Gold/yellow theme (#FFD700) - trophy feel

## Browser Support

- **Chrome, Edge, Safari, Firefox** - Full support
- **JavaScript must be enabled**
- **localStorage support required**

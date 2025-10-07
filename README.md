# Stopwatch Timer

A simple yet functional stopwatch application built with Vue.js that records the best times. **Specifically designed for live streaming content**, providing an entertaining and interactive timing tool for viewers.

## 🚀 Demo

**Live demo**: [https://gabesz.github.io/rubik-timer/](https://gabesz.github.io/rubik-timer/)

## 🎥 Live Stream Usage

This application is optimized for use with **OBS Studio** and other streaming software. The right-side layout and green background (in normal mode) allow you to easily integrate it into your stream overlay.

### Recommended Stream Settings:
- **Source type**: Browser Source
- **URL**: `index.html` (normal mode) or `index.html?edit=1` (edit mode)
- **Position**: Right side area
- **Size**: Right half of FullHD display
- **Interaction**: Full functionality in edit mode, display only in normal mode

## Features

### 🕐 Stopwatch Timer
- **Start/Stop/Reset** buttons (available in both modes)
- **Keyboard shortcuts**: Spacebar (Start/Stop), Alt+S (Start/Stop), Alt+X (Reset & Save)
- **Centisecond precision** (MM:SS.CC format)
- **Large, readable display** (5.2rem font size)
- **Bootstrap styled buttons** (Blue Start, Red Stop, Orange Reset)

### 📊 Results Management
- **Top 10 times** automatically stored
- **Average time (AVG)** calculated and displayed
- **Timestamp** for each result (when created)
- **Minute-by-minute updates** for timestamps
- **localStorage** storage (data persists)

### 🎨 Two Modes
- **Normal mode** (`index.html`) - Green background, right-side layout, clean appearance, full controls
- **Edit mode** (`index.html?edit=1`) - Transparent background, full-screen centered layout, 2x larger stopwatch, responsive design on mobile

## Usage

### Normal Mode
- Start/Stop/Reset buttons available
- View results with average time
- Click on row → delete (without confirmation)
- Click on stopwatch → switch to edit mode
- Clear All button visible

### Edit Mode
- Full stopwatch functionality
- Keyboard shortcuts display (Spacebar, Alt+S, Alt+X)
- X buttons at end of rows (with confirmation)
- "Leave Edit Mode" button
- "Clear All" button (with confirmation)
- Responsive design on mobile (vertical buttons, smaller stopwatch)

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
- `favicon.svg` - Stopwatch icon
- `.gitignore` - Git ignore file (excludes node_modules)
- `README.md` - Documentation

## Installation

1. Download the files
2. Open `index.html` in browser
3. Done! Works offline

## 🎬 OBS Studio Integration

### Browser Source Setup:
1. **OBS Studio** → Add Source → Browser Source
2. **URL**: Enter the full file path (e.g. `file:///C:/path/to/index.html`)
3. **Width**: 960px (right half of FullHD)
4. **Height**: 1080px
5. **Interact**: ✅ (if you want to edit)

### Stream Overlay Optimization:
- **Normal mode** (`index.html`) - Visible to viewers, green background, right-side layout
- **Edit mode** (`index.html?edit=1`) - For editing, transparent background, full-screen centered
- **Right-side position** - Doesn't cover main content in normal mode
- **Large text** - Clearly visible in stream quality (2x larger in edit mode)
- **Full-screen edit** - Everything centered in edit mode, ideal for editing
- **Responsive design** - Works perfectly on mobile in edit mode

## Technical Details

- **Vue.js 3** - Modern JavaScript framework (production build)
- **Bootstrap 5** - For styling and responsive design
- **localStorage** - Data storage
- **CSS3** - Modern styles and animations
- **Responsive design** - Optimized for FullHD display, works on mobile too
- **SVG favicon** - Stopwatch icon
- **Media queries** - Tablet and mobile optimization

## How It Works

1. **Time measurement**: Start → Stop → Reset & Save
2. **Results**: Automatically ranked (best on top) with average time
3. **Deletion**: Click on row in normal mode, X button in edit mode
4. **Mode switching**: Click on stopwatch or "Leave Edit Mode" button
5. **Layout**: Right-side in normal mode, full-screen centered in edit mode
6. **Keyboard shortcuts**: Spacebar for quick start/stop

## Colors

- **Normal mode**: Green background (#00FF00)
- **Edit mode**: Transparent background
- **Best result**: Highlighted
- **Buttons**: Blue (Start), Red (Stop), Orange (Reset), Red (Leave edit mode)

## Browser Support

- **Chrome, Edge, Safari, Firefox** - Full support
- **JavaScript must be enabled**
- **localStorage support required**

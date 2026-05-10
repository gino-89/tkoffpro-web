# TkOff Pro — Landing Page Notes
> Reference document for building the landing page. DO NOT DELETE.

---

## BRANDING
- **App Name**: TkOff Pro
- **Version**: 1.3.0
- **Created By**: Gino El Arquitecto & Pro Ca-Sa
- **Logo**: `logo.png` — Blue set square (triangle ruler) + orange diagonal arrow pointing up-right. Clean, professional, white background.
- **Color Palette (from app)**:
  - Primary Blue: `#00346f` (dark navy)
  - Accent Orange: `#fd6c00`
  - Secondary Blue: `#255dad`
  - Background Dark: `#1a1a2e` (suggested for landing dark mode)
  - Text Light: `#ffffff`
  - Text Muted: `rgba(255,255,255,0.6)`

---

## TAGLINES (suggestions)
- "The Future of Construction Takeoff"
- "Measure Smarter. Estimate Faster. Build Confidently."
- "Professional Takeoff Software for Architects & Contractors"
- "From Blueprint to Budget — in Minutes."

---

## TARGET AUDIENCE
- Architects
- Contractors & Builders
- Construction Estimators
- Project Managers

---

## APP DESCRIPTION
TkOff Pro is a **desktop application** (Windows & Mac) built on Electron for professional construction takeoff and cost estimating. It allows users to open architectural PDF blueprints and draw directly on them to measure areas, perimeters, linear lengths, and count elements — all while building a live, exportable cost estimate.

---

## CORE FEATURES (from code analysis)

### 1. 📄 PDF Blueprint Viewer
- Opens multi-page PDF architectural plans
- Smooth zoom (mouse wheel + buttons)
- Pan navigation (middle-click drag or pan tool)
- Page thumbnails sidebar with automatic rendering
- Jump to any page instantly
- Smart page caching for fast re-renders

### 2. 📐 Precision Measurement Tools
- **Line Tool** (`L`): Linear measurements (perimeter, walls, lengths)
- **Path Tool** (`P`): Multi-segment polyline measurements
- **Area Tool** (`A`): Polygon area measurements (sq ft / sq m)
- **Count Tool** (`C`): Point/element counting
- **Select Tool** (`Q`): Select, move, delete shapes
- **Tape Measure** (`T/M`): On-the-fly distance reference
- **Scale Tool** (`S`): Set drawing scale precisely

### 3. 📏 Professional Scale System
- **Architectural Scales**: 3"=1', 1½"=1', 1"=1', ¾"=1', ½"=1', ⅜"=1', ¼"=1', etc.
- **Engineering Scales**: 1"=10', 1"=20', 1"=30', ..., 1"=200'
- **Metric Scales**: 1:10, 1:20, 1:25, 1:50, 1:100, 1:200, 1:250, 1:500, 1:1000
- **Custom Scale**: Enter manually (px per unit)
- **Auto-Calibrate**: Draw a known line on the plan and enter real dimension
- **Unit support**: ft, in, m, cm

### 4. 🗂️ Layer Management System
- Create unlimited layers per page
- Name layers with auto-complete (learns your naming history)
- Color-code each layer (9 preset colors + custom color picker)
- Control opacity per layer (0–100%)
- Control stroke/line thickness per layer
- Toggle layer visibility on/off
- Right-click context menu (Properties, Delete, etc.)
- **Smart Layer Lock**: When a layer has content, tool switches automatically to match content type
- **Wall Height**: Set a wall height on linear layers → auto-converts to sq ft area measurement
- **Sub-layers**: Each layer can have sub-cost items for detailed cost breakdown

### 5. 💰 Estimating Module
- Dedicated Estimating View (separate screen from takeoff)
- Groups all measurements by **page/plan sheet**
- Shows: Description, Qty (Plan), Unit, Wall Height, Unit Price ($), Total Cost ($)
- **Math Calculator in Unit Price**: Type expressions like `0.50x4` and it auto-calculates
- **Sub-layer Cost Items**: Each layer can have multiple sub-cost breakdowns with independent prices
- Live **Grand Total** at top of screen
- Real-time updates as you draw more shapes

### 6. 📊 Professional Excel Export
- One-click export to `.xlsx`
- Hierarchical layout: Project Name → Pages → Layers → Sub-layers (`└` indentation)
- Currency formatting (`$1,234.56`) for all monetary columns
- Subtotals per page section
- Grand Total row at bottom
- Filename: `ProjectName_Estimate_YYYY-MM-DD.xlsx` (local date, no timezone errors)
- Proper column widths (Description: 45 chars wide, etc.)

### 7. 💾 Project Management
- Save/Open project files (`.takeoff` format — custom JSON)
- Project name displayed in toolbar (uses filename when saved)
- **Autosave**: Every 2 minutes automatically if project has been saved once
- "Unsaved changes" warning before closing/switching projects
- Full state persistence: layers, measurements, scale, page names, colors, everything

### 8. 🖥️ Interface & UX
- Dark sidebar / Light workspace hybrid design
- Collapsible sidebar panels
- Active tool indicator in toolbar
- **Keyboard shortcuts**: Q (Select), L (Line), P (Path), A (Area), C (Count), T/M (Tape), S (Scale), Escape (Select)
- Toast notifications for scale changes
- Custom context menus (right-click)
- OS-adaptive keyboard labels (Mac vs Windows)
- **About Modal**: Click logo → Shows version + "Created by Gino El Arquitecto & Pro Ca-Sa"

---

## TECHNICAL STACK
- **Framework**: Electron (Desktop app — Windows & Mac)
- **PDF Rendering**: PDF.js (pdfjs-dist)
- **Canvas Drawing**: Konva.js
- **Excel Export**: SheetJS (xlsx)
- **Storage**: Electron's native file system (fs module)
- **Language**: Vanilla JavaScript (Node.js environment)

---

## PLATFORM
- **Windows**: ✅ Full support, installer available
- **Mac**: ✅ Supported (app code is cross-platform)
- **Web**: ❌ Desktop only

---

## DOWNLOAD
- GitHub Repository: `https://github.com/gino-89/TkOff-Pro` (private)
- Current Version: **v1.3.0**
- Format: `.exe` installer (Windows) / `.dmg` (Mac)

---

## LANDING PAGE SECTIONS TO BUILD
1. **Hero** — Logo, tagline, download button, animated background
2. **Features** — 6 key feature cards with icons
3. **How It Works** — 3-step visual workflow (Open PDF → Measure → Export)
4. **Tools Showcase** — Visual display of the measurement tools
5. **Estimating Module** — Highlight the Excel export & cost features
6. **About / Creator** — Gino El Arquitecto & Pro Ca-Sa branding
7. **Download CTA** — Final call to action with download button
8. **Footer** — Version, copyright, links

---

## SCREENSHOTS TO GENERATE (AI mockups)
1. Main PDF viewer with polygon area measurement drawn in blue
2. Sidebar with multiple colored layers and measurements shown
3. Estimating view with full table of costs
4. Excel export result showing professional report
5. Scale selector dropdown open

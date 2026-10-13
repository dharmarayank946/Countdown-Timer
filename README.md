# VEDA Technology Web Development Internship Task 13 — Countdown Timer

A clean, modern, and fully responsive **Countdown Timer** built strictly using **HTML5**, **CSS3**, and **Vanilla JavaScript**. Designed with an exclusive **light teal and pearl-white theme**, the application calculates the remaining time to a specified target date and time across four distinct units (**Days**, **Hours**, **Minutes**, and **Seconds**) with live 1-second interval updates and clean completion handling.

---

## 📌 Project Overview
- **Project Title:** VEDA Technology Web Development Internship Task 13 — Countdown Timer
- **Internship Program:** VEDA Technology Web Development Internship
- **Developer:** Nagalambika D Koralli
- **Core Technologies:** HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Build Tools / Dependencies:** None (Zero npm, Node.js, terminal, or build requirements)
- **Deployment Platform:** GitHub Pages
- **GitHub Repository:** [https://github.com/dharmarayank946/Countdown-Timer.git](https://github.com/dharmarayank946/Countdown-Timer.git)
- **Live Demo (GitHub Pages):** [https://dharmarayank946.github.io/Countdown-Timer/](https://dharmarayank946.github.io/Countdown-Timer/)
- **Unique Theme Palette:**
  - **Background:** `#F4FBFC` (Soft Pearl-White Teal Tint)
  - **Primary Teal:** `#287D85` (Deep Rich Teal)
  - **Light Accent:** `#DDF2F1` (Mint Pearl Accent)
  - **Main Text:** `#243B40` (Slate Teal Charcoal)
  - **Secondary Text:** `#71868A` (Muted Teal Grey)
  - **Card Background:** `#FFFFFF` (Crisp Pearl White)
  - **Border:** `#D7E9E9` (Soft Structural Teal Border)

---

## 🎯 Objectives
1. Implement a real-time countdown timer that counts down to a configurable target date and time.
2. Present four separate time units in distinct, structured cards:
   - **Days**
   - **Hours**
   - **Minutes**
   - **Seconds**
3. Drive live updates every second using `setInterval()`.
4. Configure the target date at the top of `script.js` using a clearly named variable (`TARGET_DATE`) for effortless modification.
5. Accurately calculate time remaining using native JavaScript `Date` objects and millisecond arithmetic.
6. When the countdown reaches zero:
   - Terminate the active interval using `clearInterval()`.
   - Display a prominent, accessible completion message: **"Countdown Complete!"**
   - Lock all units at `00`, strictly preventing negative values.
7. Automatically display the completion state if the configured target date is already in the past upon page load.
8. Perform rigorous memory and interval cleanup whenever the timer finishes, updates, or unloads.
9. Deliver an entirely responsive interface that works flawlessly across smartphones, tablets, and desktop displays with zero horizontal scrolling.

---

## 🛠️ Technologies Used
- **HTML5:** Semantic landmark elements (`<main>`, `<header>`, `<section>`, `<article>`, `<footer>`) with ARIA accessibility roles and polite live regions.
- **CSS3:** Modern CSS Custom Properties (variables), CSS Grid, Flexbox, tabular numerals (`tabular-nums`), responsive fluid typography (`clamp()`), and subtle micro-interactions.
- **JavaScript (Vanilla ES6+):** Pure browser JavaScript with zero external frameworks or libraries, utilizing `Date`, `setInterval()`, `clearInterval()`, and DOM manipulation.
- **Google Fonts:** `Plus Jakarta Sans` and `Inter` for clean, professional, and legible typography.

---

## ✨ Features & Visual Highlights
- 🎨 **Unique Light Teal & Pearl-White Aesthetic:** Fresh, modern palette adhering strictly to the Task 13 design specification (`#F4FBFC`, `#287D85`, `#DDF2F1`, `#243B40`, `#71868A`, `#FFFFFF`, `#D7E9E9`).
- ⏱️ **Four Distinct Unit Cards:** Days, Hours, Minutes, and Seconds presented in isolated pearl-white cards with subtle elevation and micro-lift hover states.
- 🔢 **Zero Jitter Tabular Digits:** Leverages `font-variant-numeric: tabular-nums` to ensure numbers maintain identical widths while changing every second.
- 🔔 **Celebratory Completion State:** Reveals an accessible alert banner reading **"Countdown Complete!"** with an inline SVG indicator upon reaching zero.
- 📱 **Mobile & Phone-Friendly Tester:** Includes convenient quick presets (`+10 Seconds`, `+1 Day`, `Past Date`, `Reset to Config`) and a custom date picker allowing immediate testing directly on a mobile phone without editing code.
- 🚫 **No Negative Numbers Guarantee:** Floor-bound calculations ensure no unit ever renders negative values.
- ⚡ **Lightweight & Fast:** 100% static assets that load instantly with zero dependencies.

---

## 🧮 How the Countdown Calculation Works

The remaining time is computed by calculating the difference between the target timestamp and the current system timestamp:

1. Retrieve the timestamps in milliseconds:
   ```javascript
   const currentTime = new Date().getTime();
   const targetTime = activeTargetDate.getTime();
   const timeDifference = targetTime - currentTime;
   ```

2. If `timeDifference <= 0`, the countdown has concluded:
   - Stop the interval: `clearInterval(countdownInterval)`.
   - Lock values to `00`.
   - Render the `"Countdown Complete!"` banner.

3. If `timeDifference > 0`, break down the milliseconds into individual calendar units:
   ```javascript
   const msInSecond = 1000;
   const msInMinute = 1000 * 60;
   const msInHour   = 1000 * 60 * 60;
   const msInDay    = 1000 * 60 * 60 * 24;

   const days    = Math.floor(timeDifference / msInDay);
   const hours   = Math.floor((timeDifference % msInDay) / msInHour);
   const minutes = Math.floor((timeDifference % msInHour) / msInMinute);
   const seconds = Math.floor((timeDifference % msInMinute) / msInSecond);
   ```

4. Format each value with a leading zero if single-digit:
   ```javascript
   function formatTimeUnit(value) {
     return String(Math.max(0, Math.floor(value))).padStart(2, "0");
   }
   ```

---

## ⚙️ How `setInterval()` and `clearInterval()` Are Used

### 1. Starting the Interval (`setInterval`)
To keep the countdown synchronized in real time, `setInterval()` executes `updateCountdown()` once every 1,000 milliseconds (1 second):

```javascript
countdownInterval = setInterval(updateCountdown, 1000);
```

Before initiating a new interval, an initial call to `updateCountdown()` is immediately invoked to render accurate values without a 1-second delay.

### 2. Stopping the Interval (`clearInterval`)
When the time difference reaches zero or less, or when changing target dates, `clearInterval()` halts execution to prevent CPU cycles and memory leaks:

```javascript
function stopCountdown() {
  if (countdownInterval !== null) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}
```

The application also registers a `beforeunload` event listener to cleanly dispose of the interval when navigating away from the page.

---

## ✏️ How to Change the Target Date

The default target date is configured directly at the top of `script.js` using the clearly named constant `TARGET_DATE`:

1. Open [`script.js`](file:///d:/Projects/Veda/Task13-Countdown-Timer/script.js) in any text editor.
2. Locate the **TARGET DATE CONFIGURATION** section at the top of the file:
   ```javascript
   // Change this target date to any date and time you wish:
   const TARGET_DATE = new Date("2027-01-01T00:00:00");
   ```
3. Update the date string to your desired event. Examples:
   - New Year: `new Date("2027-01-01T00:00:00")`
   - Specific Date & Time: `new Date("2026-12-31T23:59:59")`
   - Human-readable Format: `new Date("November 20, 2026 18:30:00")`
4. Save the file and refresh your browser.

> **Tip:** You can also test any target date on-the-fly directly inside the browser using the interactive **Quick Presets** or **Custom Target Date Picker** form at the bottom of the card without editing any code!

---

## 📂 Project File Structure
```text
Task13-Countdown-Timer/
├── index.html        # Semantic HTML5 markup with 4 time unit cards & completion banner
├── style.css         # Light teal & pearl-white styling, responsive grid, and typography
├── script.js         # Countdown calculation, setInterval/clearInterval, and event logic
└── README.md         # Comprehensive project documentation and user manual
```

---

## 🚀 How to Run the Project Locally

Because this project is built entirely with pure HTML5, CSS3, and JavaScript, **no terminal, Node.js, npm, or build tools are required**:

### Option 1: Direct Browser Launch (Simplest)
1. Navigate to the `Task13-Countdown-Timer` folder on your computer or mobile phone.
2. Double-click or tap `index.html`.
3. The page will immediately open and run in any modern web browser (Chrome, Safari, Firefox, Edge).

### Option 2: Using VS Code Live Server (Optional)
1. Open the project folder in Visual Studio Code.
2. Right-click on `index.html` and select **"Open with Live Server"**.
3. View the project at `http://127.0.0.1:5500`.

---

## 🌐 GitHub Pages Deployment Instructions

This static project can be published to GitHub Pages directly from your phone or desktop:

1. **Create / Navigate to Repository:**
   - Commit and push the `Task13-Countdown-Timer` files to your GitHub repository.
2. **Open Repository Settings:**
   - On GitHub, go to your repository's **Settings** tab.
3. **Navigate to Pages:**
   - In the left sidebar, click on **Pages** (under the "Code and automation" section).
4. **Configure Build and Deployment:**
   - Under **Source**, select **Deploy from a branch**.
   - Under **Branch**, choose `main` (or `master`) and set the folder to `/ (root)` or the respective subfolder.
   - Click **Save**.
5. **Access Your Live Website:**
   - GitHub Pages will build your site within 1-2 minutes.
   - Your live URL will be:
     `https://<your-username>.github.io/<repository-name>/`

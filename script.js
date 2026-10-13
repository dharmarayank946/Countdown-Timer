/**
 * ============================================================================
 * VEDA TECHNOLOGY WEB DEVELOPMENT INTERNSHIP — TASK 13
 * Project: Countdown Timer
 * Author:  Nagalambika D Koralli
 * Technologies: HTML5, CSS3, JavaScript (Vanilla)
 * ============================================================================
 * 
 * FUNCTIONAL REQUIREMENTS:
 * 1. Counts down to a target date and time.
 * 2. Displays four separate values: Days, Hours, Minutes, Seconds.
 * 3. Updates the countdown every second using setInterval().
 * 4. Configured target date using a clearly named variable (TARGET_DATE).
 * 5. Calculates time remaining using JavaScript Date objects.
 * 6. When the countdown reaches zero:
 *    - Stops the interval using clearInterval().
 *    - Displays "Countdown Complete!" message.
 *    - Never displays negative values (locked at 00).
 * 7. If the target date has already passed, displays completion immediately.
 * 8. Cleans up the interval when no longer needed.
 * ============================================================================
 */

// ============================================================================
// 1. TARGET DATE CONFIGURATION
// ----------------------------------------------------------------------------
// Change this variable to any future date & time you wish to count down to.
// Supported formats:
//   - ISO string: "YYYY-MM-DDTHH:mm:ss"  (e.g., "2027-01-01T00:00:00")
//   - Human format: "Month DD, YYYY HH:MM:SS" (e.g., "January 1, 2027 00:00:00")
// ============================================================================
const TARGET_DATE = new Date("2027-01-01T00:00:00");

// ============================================================================
// 2. STATE & VARIABLES
// ============================================================================
let activeTargetDate = new Date(TARGET_DATE);
let countdownInterval = null;

// ============================================================================
// 3. DOM ELEMENTS SELECTION
// ============================================================================
const daysElement = document.getElementById("days-val");
const hoursElement = document.getElementById("hours-val");
const minutesElement = document.getElementById("minutes-val");
const secondsElement = document.getElementById("seconds-val");

const targetDateText = document.getElementById("target-date-text");
const statusIndicator = document.getElementById("status-indicator");
const statusLabel = document.getElementById("status-label");
const completionBanner = document.getElementById("completion-banner");

// Interactive Controls & Presets
const btnPreset10s = document.getElementById("btn-preset-10s");
const btnPreset1d = document.getElementById("btn-preset-1d");
const btnPresetPast = document.getElementById("btn-preset-past");
const btnPresetReset = document.getElementById("btn-preset-reset");
const customDateForm = document.getElementById("custom-date-form");
const customDateInput = document.getElementById("custom-date-input");

// ============================================================================
// 4. HELPER FUNCTIONS
// ============================================================================

/**
 * Format a number with leading zeros (e.g. 5 -> "05", 12 -> "12").
 * Ensures single-digit values are consistently padded and guarantees
 * no negative numbers, NaN, or non-finite values are ever returned.
 * @param {number} value
 * @returns {string}
 */
function formatTimeUnit(value) {
  if (typeof value !== "number" || isNaN(value) || !isFinite(value)) {
    return "00";
  }
  return String(Math.max(0, Math.floor(value))).padStart(2, "0");
}

/**
 * Safely parses any date input (Date object, string, or timestamp).
 * Returns a valid Date object or null if invalid.
 * @param {any} input
 * @returns {Date|null}
 */
function parseTargetDate(input) {
  if (!input) return null;
  const parsed = input instanceof Date ? input : new Date(input);
  return isNaN(parsed.getTime()) ? null : parsed;
}

/**
 * Formats a Date object into a readable string for the target header.
 * e.g., "Jan 1, 2027, 12:00:00 AM"
 * @param {Date} date
 * @returns {string}
 */
function formatReadableDate(date) {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return "Invalid Date";
  }
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "medium"
  });
}

/**
 * Sets display values to zero (00:00:00:00).
 * Guarantees the timer never renders negative numbers.
 */
function renderZeroValues() {
  if (daysElement) daysElement.textContent = "00";
  if (hoursElement) hoursElement.textContent = "00";
  if (minutesElement) minutesElement.textContent = "00";
  if (secondsElement) secondsElement.textContent = "00";
}

/**
 * Updates the UI to show the "Countdown Complete!" message and state.
 */
function showCompletionState() {
  renderZeroValues();

  // Reveal completion banner
  if (completionBanner) {
    completionBanner.removeAttribute("hidden");
    completionBanner.setAttribute("aria-hidden", "false");
  }

  // Update status badge
  if (statusIndicator) {
    statusIndicator.classList.remove("error");
    statusIndicator.classList.add("complete");
  }
  if (statusLabel) {
    statusLabel.textContent = "COUNTDOWN COMPLETE";
  }
}

/**
 * Updates the UI to handle an invalid target date safely.
 */
function showInvalidDateState() {
  renderZeroValues();

  // Hide completion banner
  if (completionBanner) {
    completionBanner.setAttribute("hidden", "true");
    completionBanner.setAttribute("aria-hidden", "true");
  }

  // Update status badge and target info
  if (statusIndicator) {
    statusIndicator.classList.remove("complete");
    statusIndicator.classList.add("error");
  }
  if (statusLabel) {
    statusLabel.textContent = "INVALID TARGET DATE";
  }
  if (targetDateText) {
    targetDateText.textContent = "Please configure a valid date in script.js";
  }
}

/**
 * Updates the UI to show the active countdown state.
 */
function showActiveState() {
  // Hide completion banner
  if (completionBanner) {
    completionBanner.setAttribute("hidden", "true");
    completionBanner.setAttribute("aria-hidden", "true");
  }

  // Update status badge
  if (statusIndicator) {
    statusIndicator.classList.remove("complete");
    statusIndicator.classList.remove("error");
  }
  if (statusLabel) {
    statusLabel.textContent = "TIME REMAINING";
  }
}

// ============================================================================
// 5. CORE COUNTDOWN LOGIC
// ============================================================================

/**
 * Calculates remaining time using Date objects and updates DOM elements.
 * Invoked every 1000ms by setInterval().
 */
function updateCountdown() {
  if (!activeTargetDate || isNaN(activeTargetDate.getTime())) {
    stopCountdown();
    showInvalidDateState();
    return;
  }

  const currentTime = Date.now();
  const targetTime = activeTargetDate.getTime();
  const timeDifference = targetTime - currentTime;

  // Requirement 6 & 7: If target has been reached or is already in the past
  if (timeDifference <= 0) {
    // Stop the interval using clearInterval()
    stopCountdown();
    // Display completion message and lock at 00 (no negatives)
    showCompletionState();
    return;
  }

  // Ensure active state banner is displayed
  showActiveState();

  // Time unit calculations:
  // 1000 ms = 1 second
  // 60 seconds = 1 minute (60 * 1000 ms)
  // 60 minutes = 1 hour (60 * 60 * 1000 ms)
  // 24 hours = 1 day (24 * 60 * 60 * 1000 ms)
  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  const days = Math.floor(timeDifference / msInDay);
  const hours = Math.floor((timeDifference % msInDay) / msInHour);
  const minutes = Math.floor((timeDifference % msInHour) / msInMinute);
  const seconds = Math.floor((timeDifference % msInMinute) / msInSecond);

  // Render four separate values padded to two digits
  if (daysElement) daysElement.textContent = formatTimeUnit(days);
  if (hoursElement) hoursElement.textContent = formatTimeUnit(hours);
  if (minutesElement) minutesElement.textContent = formatTimeUnit(minutes);
  if (secondsElement) secondsElement.textContent = formatTimeUnit(seconds);
}

/**
 * Clears the active countdown interval using clearInterval().
 * Requirement 6 & 8: Clean up interval when no longer needed.
 */
function stopCountdown() {
  if (countdownInterval !== null) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

/**
 * Starts or restarts the countdown timer.
 * Requirement 3: Update countdown every second using setInterval().
 * @param {Date|string|number} newTargetDate
 */
function startCountdown(newTargetDate) {
  // Clean up any previously running interval
  stopCountdown();

  // Validate and parse target date safely
  const parsedDate = parseTargetDate(newTargetDate);
  if (!parsedDate) {
    activeTargetDate = null;
    showInvalidDateState();
    return;
  }

  // Assign validated target date
  activeTargetDate = parsedDate;

  // Display target date text
  if (targetDateText) {
    targetDateText.textContent = formatReadableDate(activeTargetDate);
  }

  // Pre-fill custom date input with local ISO string if available
  if (customDateInput) {
    const localIso = new Date(activeTargetDate.getTime() - activeTargetDate.getTimezoneOffset() * 60000)
      .toISOString()
      .slice(0, 16);
    customDateInput.value = localIso;
  }

  // Execute immediate check so there is no 1-second visual delay
  // Handles requirement 7 (immediate display if target is already passed)
  updateCountdown();

  // If time still remains, start repeating 1-second interval
  if (activeTargetDate && activeTargetDate.getTime() > Date.now()) {
    countdownInterval = setInterval(updateCountdown, 1000);
  }
}

// ============================================================================
// 6. EVENT LISTENERS & PRESET HANDLERS
// ============================================================================

// Preset: +10 Seconds (Allows rapid testing of zero-reach & completion state)
if (btnPreset10s) {
  btnPreset10s.addEventListener("click", () => {
    const testDate = new Date(Date.now() + 10 * 1000);
    startCountdown(testDate);
  });
}

// Preset: +1 Day (24 hours from now)
if (btnPreset1d) {
  btnPreset1d.addEventListener("click", () => {
    const tomorrow = new Date(Date.now() + 24 * 60 * 60 * 1000);
    startCountdown(tomorrow);
  });
}

// Preset: Past Date (Requirement 7 test: immediately displays completion)
if (btnPresetPast) {
  btnPresetPast.addEventListener("click", () => {
    const pastDate = new Date(Date.now() - 5000);
    startCountdown(pastDate);
  });
}

// Preset: Reset to configured TARGET_DATE variable
if (btnPresetReset) {
  btnPresetReset.addEventListener("click", () => {
    startCountdown(TARGET_DATE);
  });
}

// Custom Date Form Submission
if (customDateForm) {
  customDateForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!customDateInput || !customDateInput.value) return;

    const parsedDate = new Date(customDateInput.value);
    if (!isNaN(parsedDate.getTime())) {
      startCountdown(parsedDate);
    } else {
      alert("Please select a valid date and time.");
    }
  });
}

// Window unload cleanup (Requirement 8: Clean up interval)
window.addEventListener("beforeunload", () => {
  stopCountdown();
});

// ============================================================================
// 7. INITIALIZATION
// ============================================================================
// Initialize countdown with the configured TARGET_DATE on page load
document.addEventListener("DOMContentLoaded", () => {
  startCountdown(TARGET_DATE);
});

# AI-USAGE.md

This file logs every time an AI tool contributed to submitted code in this project.
Add an entry before you commit the AI-assisted code. (Using AI only to learn -
explanations, error messages, design talk - does not need an entry.) See the course AI
policy. Reminder: **milestones 1-2 (weeks 3, 6) must be AI-free** - this file should
be empty until the third milestone.

Also drop a marker where the code lives: `// AI-assisted - see AI-USAGE.md #<n>`.

---

## Entry template (copy for each use)

### #N - <short title>
- **Date:** YYYY-MM-DD
- **Member:** <your name>
- **Tool / model:** <e.g. free-tier assistant> (free models only)
- **Files:** `src/...`, `src/...`
- **Prompt (verbatim):**

  ```
  <paste the exact prompt you gave the AI>
  ```

- **What it produced & what I changed:** <1–3 sentences: did you keep it as-is, edit it,
  rewrite parts? why is it correct?>

---

## Log

<!-- Entries go below, newest last. Example: -->
<!--
### #1 - Generate a price-formatting helper
- **Date:** 2026-03-30
- **Member:** Jane Doe
- **Tool / model:** free-tier assistant
- **Files:** `src/utils/format.js`
- **Prompt (verbatim):**

  ```
  Write a JavaScript function formatPrice(cents) that returns a CAD string like "$12.50".
  ```

- **What it produced & what I changed:** Kept the logic; renamed the parameter to match
  our code and added a test. Verified the rounding on a few values.
-->

  ### #1 - Rating Distribution Logic
- **Date:** 2026-11-18
- **Member:** Anisha
- **Tool / model:** <free-tier assistant>
- **Files:** `src/pages/ReviewPage`
- **Prompt (verbatim):**

  ```
  Guide me to write the progress bar code
  ```

- **What it produced & what I changed:** 
  AI suggested the logic for calculating star-rating percentages and displaying rating distribution bars. I integrated the calculations into the review system, adjusted the layout and styling, and verified that the values matched the review data.


### #1 - Review and Saved Page Layout
- **Date:** 2026-11-18
- **Member:** Anisha
- **Tool / model:** <free-tier assistant>
- **Files:** `src/pages/ReviewPage`, `src/pages/SavedPage`
- **Prompt (verbatim):**

  ```
 Can you edit the file to format the page better
  ```

- **What it produced & what I changed:** 
AI suggested layout and spacing changes using Tailwind and DaisyUI classes. I modified the generated structure and styling to match the design of the rest of the application.
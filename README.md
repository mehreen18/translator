# CodeAlpha_LanguageTranslationTool

A web-based Language Translation Tool built with **Flask** and **Bootstrap** for the CodeAlpha Artificial Intelligence Internship — Task 1.

## 🌍 Overview

This app lets users type text, choose a source and target language from 130+ supported languages, and get an instant translation — with a clean, dark-themed, responsive interface.

## ✨ Features

- Translate text between 130+ languages using Google Translate (via `deep-translator`, no API key required)
- Auto-detect source language option
- Swap source/target languages and their text with one click
- Text-to-speech playback ("🔊 Listen") for both the input and translated text, using the browser's built-in Speech Synthesis API
- Languages with no voice available on the user's device are automatically marked with a 🔇 icon in the dropdown
- Copy translated text to clipboard with one click
- Long text is automatically split into chunks and translated piece by piece, so paragraph-length input works reliably
- Dark theme with card hover animations (lift + glow effect)
- Fully responsive layout — cards stack vertically on mobile, with adjusted spacing and a rotated swap button

## 🛠️ Tech Stack

- **Backend:** Python, Flask
- **Translation engine:** `deep-translator` (GoogleTranslator)
- **Frontend:** HTML, Bootstrap 5, custom CSS
- **Text-to-speech:** Web Speech API (built into modern browsers, no backend needed)

## 📁 Project Structure

```
translator/
│── app.py                  # Flask backend (routes + translation logic)
│── requirements.txt         # Python dependencies
│── templates/
│   └── index.html           # Main page (Bootstrap layout, Jinja templating)
│── static/
│   ├── style.css             # Dark theme, card animations, media queries
│   ├── script.js              # Translate, swap, copy, and speech logic
│   └── images/
│       └── t1.jfif             # Navbar logo
└── README.md
```

## 🚀 How to Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/<your-username>/CodeAlpha_LanguageTranslationTool.git
   cd CodeAlpha_LanguageTranslationTool
   ```

2. **(Recommended) Create a virtual environment**
   ```bash
   python -m venv venv
   venv\Scripts\activate        # Windows
   source venv/bin/activate     # macOS/Linux
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Run the app**
   ```bash
   python app.py
   ```

5. **Open your browser** and go to:
   ```
   http://127.0.0.1:800
   ```

## 🧠 How It Works

1. `app.py` fetches the full list of Google Translate's supported languages and passes it to `index.html`, which builds the dropdown menus dynamically using Jinja templating (`{% for %}` loop) — no hardcoded language list.
2. When the user clicks **Translate**, `script.js` sends the text and chosen languages to the `/translate` route via a `fetch()` POST request, without reloading the page.
3. Flask passes the text to `GoogleTranslator`. If the text is long, it's split into sentence-based chunks first, translated piece by piece, then rejoined.
4. The translated text is sent back as JSON and displayed instantly.
5. **Listen** buttons use the browser's `SpeechSynthesisUtterance` to read text aloud in the selected language — if no matching voice is installed on the user's device, the app shows a message instead of failing silently, and marks that language with 🔇 in the dropdown.
6. **Copy** uses `navigator.clipboard.writeText()` to copy the translated text with one click.

## 📌 Notes

- No API key or billing setup required — this project intentionally uses `deep-translator` instead of the paid Google Cloud Translation API.
- Text-to-speech voice availability depends on the languages installed on the user's operating system/browser — this varies by device.
- For production deployment, replace Flask's development server with a production WSGI server (e.g. gunicorn), and set `debug=False`.

## 👤 Author

Built as part of the CodeAlpha Artificial Intelligence Internship — Task 1: Language Translation Tool.
import os
from flask import Flask, render_template, request, jsonify
from deep_translator import GoogleTranslator

app = Flask(__name__)

SUPORTED_LANGUAGES = GoogleTranslator().get_supported_languages(as_dict=True)

@app.route('/')
def home():
    return render_template("index.html", supported_languages=SUPORTED_LANGUAGES)


@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    text = data.get("text", "").strip()
    sorce_language = data.get("source_lang", "auto")
    target_language = data.get("target_lang", "en")

    if not text:
        return jsonify({"error": "Please enter some text to translate."}), 400

    try:
        translated_text = GoogleTranslator(
            source=sorce_language, target=target_language).translate(text)
        return jsonify({"translated_text": translated_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 800))
    app.run(host="0.0.0.0", port=port)
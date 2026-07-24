// Grab the two new buttons
const speakInputBtn = document.getElementById("speakInputBtn");
const speakOutputBtn = document.getElementById("speakOutputBtn");


// Reusable function: takes text and a language code, speaks it aloud
function speak(text, langCode) {
  if (!text) return; // nothing to say if the box is empty

  const utterance = new SpeechSynthesisUtterance(text);

  // langCode helps the browser pick a matching voice/accent (e.g. "fr", "es")
  if (langCode && langCode !== "auto") {
    utterance.lang = langCode;
  }

  speechSynthesis.cancel(); // stop anything currently being read aloud
  speechSynthesis.speak(utterance);
}

// When clicked, read whatever is currently in the input box
speakInputBtn.addEventListener("click", () => {
  const text = document.getElementById("inputText").value;
  const lang = document.getElementById("sourceLang").value;
  speak(text, lang);
});

// When clicked, read whatever is currently in the output box
speakOutputBtn.addEventListener("click", () => {
  const text = document.getElementById("outputText").value;
  const lang = document.getElementById("targetLang").value;
  speak(text, lang);
});
// Grab the remaining elements we need
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const sourceLang = document.getElementById("sourceLang");
const targetLang = document.getElementById("targetLang");
const translateBtn = document.getElementById("translateBtn");
const statusMsg = document.getElementById("statusMsg");

translateBtn.addEventListener("click", async () => {
  const text = inputText.value.trim();

  if (!text) {
    statusMsg.textContent = "Please type something to translate.";
    return;
  }

  // Show a loading state so the user knows something is happening
  translateBtn.disabled = true;
  translateBtn.textContent = "Translating...";
  statusMsg.textContent = "";

  try {
    const response = await fetch("/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: text,
        source_lang: sourceLang.value,
        target_lang: targetLang.value,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      statusMsg.textContent = data.error || "Something went wrong.";
      outputText.value = "";
    } else {
      outputText.value = data.translated_text;
    }
  } catch (err) {
    statusMsg.textContent = "Could not reach the server. Is it running?";
  } finally {
    translateBtn.disabled = false;
    translateBtn.textContent = "Translate";
  }
});


const swapBtn = document.getElementById("swapBtn");

swapBtn.addEventListener("click", () => {
  if (sourceLang.value === "auto") {
    statusMsg.textContent = "Pick a specific source language before swapping.";
    return;
  }

  // Swap the selected languages
  const tempLang = sourceLang.value;
  sourceLang.value = targetLang.value;
  targetLang.value = tempLang;

  // Swap the text in both boxes too
  const tempText = inputText.value;
  inputText.value = outputText.value;
  outputText.value = tempText;

  statusMsg.textContent = "";
});


const copyBtn = document.getElementById("copyBtn");

copyBtn.addEventListener("click", async () => {
  if (!outputText.value) return; // nothing to copy yet

  await navigator.clipboard.writeText(outputText.value);

  // Give the user quick visual feedback that it worked
  const originalLabel = copyBtn.textContent;
  copyBtn.textContent = "✅ Copied!";

  setTimeout(() => {
    copyBtn.textContent = originalLabel;
  }, 1500);
});
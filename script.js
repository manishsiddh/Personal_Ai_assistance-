 let btn = document.querySelector("#btn");
    let content = document.querySelector("#content");
    let voice = document.querySelector("#voice");

    let voices = [];

    function loadVoices() {
      voices = speechSynthesis.getVoices();
      if (voices.length === 0) {
        speechSynthesis.addEventListener("voiceschanged", () => {
          voices = speechSynthesis.getVoices();
        });
      }
    }

    function speak(text) {
      window.speechSynthesis.cancel(); // Clear the queue

      let utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      utterance.volume = 1;

      // Use English (India) or fallback
      let selectedVoice = voices.find(v => v.lang === "en-GB") || voices[0];
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    }

    function wishme() {
      let hours = new Date().getHours();

      if (hours >= 0 && hours < 12) {
        speak("Good morning Manish");
      } else if (hours >= 12 && hours < 4) {
        speak("Good afternoon Manish");
      } else {
        speak("Good evening Manish");
      }
    }

    window.addEventListener("load", () => {
      loadVoices();
      setTimeout(wishme, 1000);
    });

    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    let recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
      let transcript = event.results[event.resultIndex][0].transcript;
      content.innerText = transcript;
      takeCommand(transcript.toLowerCase());
    };

    btn.addEventListener("click", () => {
      recognition.start();
      btn.style.display = "none";
      voice.style.display = "block";
    });

    function takeCommand(message) {
      btn.style.display = "flex";
      voice.style.display = "none";

      if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you?");
      }
      else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by Manish Siddh.");
      }
      else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        window.open("https://youtube.com/", "_blank");
      }
      else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        window.open("https://instagram.com/", "_blank");
      }
      else if (message.includes("open google")) {
        speak("Opening Google...");
        window.open("https://google.com/", "_blank");
      }
      else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        window.open("https://facebook.com/", "_blank");
      }
      else if (message.includes("open calculator")) {
        speak("Opening calculator...");
        window.open("calculator://");
      }
      else if (message.includes("open whatsapp")) {
        speak("Opening WhatsApp...");
        window.open("whatsapp://");
      }
      else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak(`The time is ${time}`);
      }
      else if (message.includes("date")) {
        let date = new Date().toLocaleDateString(undefined, {
          day: "numeric", month: "short", year: "numeric"
        });
        speak(`Today's date is ${date}`);
      }
      else {
        let searchQuery = message.replace("toko", "").replace("toku", "");
        speak(`This is what I found on the internet regarding ${searchQuery}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
      }
    }
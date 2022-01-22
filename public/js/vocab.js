function speak() {
  const utter = new SpeechSynthesisUtterance();
  utter.lang = "en-US";
  utter.text =
    "I eat bananas. Sometimes I eat mango. I drink pear juice. My favorite healthy food is broccoli.";
  utter.volume = 1;
  utter.pitch = 0.9;
  utter.rate = 0.7;

  // event after text has been spoken
  //   utter.onend = function () {
  //     alert("Speech has finished");
  //   };

  // speak
  window.speechSynthesis.speak(utter);
}

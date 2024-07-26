document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector("#telefone");
  intlTelInput(input, {
    initialCountry: "br",
    preferredCountry: ["br", "us", "gb"],
    separatedDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });
});

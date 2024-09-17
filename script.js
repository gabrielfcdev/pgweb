document.addEventListener("DOMContentLoaded", function() {
  const input = document.querySelector("#telefone");
  const iti = intlTelInput(input, {
    initialCountry: "br",
    preferredCountries: ["br", "us", "gb"],
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"
  });

  const form = document.querySelector("form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevenir o comportamento padrão de envio do formulário

    const formData = new FormData(form);
    const phoneNumber = iti.getNumber(); // Captura o número completo com o código do país

    const data = {
      toEmail: formData.get("email"),
      subject: "Novo contato de evento",
      message: `
        Nome: ${formData.get("nome")}
        Telefone: ${phoneNumber}
        Nome do Evento: ${formData.get("nomeevento")}
        Quando pretende abrir inscrições: ${formData.get("inscricao")}
        Organizador de eventos: ${formData.get("radio")}
      `
    };

    try {
      const response = await fetch("http://localhost:5269/api/email/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("E-mail enviado com sucesso!");
      } else {
        const errorData = await response.json();
        console.error("Erro:", errorData);
        alert("Erro ao enviar e-mail");
      }
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      alert("Erro ao enviar e-mail");
    }
  });
});

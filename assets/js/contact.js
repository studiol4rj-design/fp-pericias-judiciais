const contactForm = document.querySelector("#contact-form");
const conditionalFields = document.querySelectorAll("[data-visible-when]");
const requestedArea = new URLSearchParams(window.location.search).get("area");

if (requestedArea && contactForm) {
  const subject = contactForm.querySelector("#subject");
  const match = subject && Array.from(subject.options).find((option) => option.textContent.trim().toLowerCase() === requestedArea.trim().toLowerCase());
  if (match) subject.value = match.value || match.textContent;
}

function updateConditionalFields() {
  conditionalFields.forEach((field) => {
    const [name, expectedValue] = field.dataset.visibleWhen.split(":");
    const visible = contactForm?.elements[name]?.value === expectedValue;
    field.hidden = !visible;
    if (!visible) field.querySelectorAll("input, select, textarea").forEach((input) => input.value = "");
  });
}

if (contactForm) {
  contactForm.addEventListener("change", updateConditionalFields);
  updateConditionalFields();
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const optional = (label, key) => formData.get(key) ? `${label}: ${formData.get(key)}` : null;
    const lines = [
      "Ola, encontrei o site da FP Pericias Judiciais e gostaria de solicitar uma analise inicial de uma demanda pericial.",
      "",
      `Nome: ${formData.get("name")}`,
      `E-mail: ${formData.get("email")}`,
      `Telefone: ${formData.get("phone")}`,
      optional("Perfil", "profile"),
      `Provavel area da pericia: ${formData.get("subject")}`,
      optional("Natureza da demanda", "matterType"),
      optional("Tribunal", "court"),
      optional("Numero do processo", "caseNumber"),
      optional("Fase processual", "phase"),
      optional("Prazo", "deadline"),
      optional("Material disponivel", "material"),
      optional("Necessidade principal", "serviceNeed"),
      "",
      "Resumo do caso:",
      formData.get("message")
    ].filter(Boolean);
    window.open(`https://wa.me/${contactForm.dataset.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
  });
}

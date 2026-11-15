"use strict";

// Os destinos estão no HTML e funcionam mesmo sem JavaScript.
const privacyTrigger = document.querySelector("#privacy-trigger");
const privacyDialog = document.querySelector("#privacy-dialog");
const privacyClose = document.querySelector("#privacy-close");
const privacyTitle = document.querySelector("#privacy-title");

privacyTrigger.hidden = false;
privacyTrigger.addEventListener("click", () => {
  privacyDialog.showModal();
  document.body.classList.add("is-modal-open");
  privacyTitle.focus();
});

privacyClose.addEventListener("click", () => privacyDialog.close());
privacyDialog.addEventListener("close", () => {
  document.body.classList.remove("is-modal-open");
  privacyTrigger.focus({ preventScroll: true });
});

// Escape e contenção do foco são oferecidos pelo dialog nativo.
privacyDialog.addEventListener("click", (event) => {
  if (event.target !== privacyDialog || event.detail === 0) return;
  const bounds = privacyDialog.getBoundingClientRect();
  const outside = event.clientX < bounds.left || event.clientX > bounds.right
    || event.clientY < bounds.top || event.clientY > bounds.bottom;
  if (outside) privacyDialog.close();
});

document.querySelector("#year").textContent = new Date().getFullYear();

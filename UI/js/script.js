// variables

const modal = document.querySelector(".modal");
const resetLink = document.querySelector("#trigger");
const resetButton = document.querySelector("#reset");
const signupButton = document.querySelector("#sign-up-button");
const signinButton = document.querySelector("#sign-in-button");
const userForms = document.querySelector("#user-options-forms");

// listeners

resetLink.addEventListener("click", togglemodal);
resetButton.addEventListener("click", notification1);
window.addEventListener("click", windowOnClick);
signupButton.addEventListener("click", bounceLeft, false);
signinButton.addEventListener("click", bounceRight, false);

// helpers

function togglemodal() {
  modal.classList.toggle("show-modal");
}

function notification1() {
  alert("Password reset link has been sent to the email");

  if (alert) {
    togglemodal();
  }
}

function windowOnClick(event) {
  if (event.target === modal) {
    togglemodal();
  }
}

function bounceLeft() {
  userForms.classList.remove("bounceRight");
  userForms.classList.add("bounceLeft");
}

function bounceRight() {
  userForms.classList.remove("bounceLeft");
  userForms.classList.add("bounceRight");
}

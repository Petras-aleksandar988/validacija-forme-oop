const inputs = document.querySelectorAll("input");
const formSubmit = document.querySelector(".form");
const regitrationBtn = document.querySelector(".btn");
const overlay = document.querySelector(".overlay");
const overlayBtn = document.querySelector(".overlay-btn");

const config = {
  ime_prezime: {
    ime: true,
    required: true,
  },
  telefon: {
    phone: true,
    required: true,
  },
  adresa_stanovanja: {
    required: true,
    minLength: 1,
    maxLength: 40,
  },
  kucni_broj: {
    required: true,
  },
  postanski_broj: {
    required: true,
    posta: true,
  },
  mjesto: {
    required: true,
    minLength: 1,
    maxLength: 40,
  },
  email_adresa: {
    required: true,

    email: true,
  },
  posebne_napomene: {
    required: true,
  },
};

const validator = new Validator(config, ".form");

function validationPassed() {
  for (let key of Object.keys(errors)) {
    if (errors[key].length > 0) {
      return false;
    }
  }
  return true;
}

document.querySelector(".form").addEventListener("submit", (e) => {
  e.preventDefault();

  if (validator.validationPassed()) {
    regitrationBtn.addEventListener("click", () => {
      overlay.style.display = "block";
      console.log("korisnik se uspjesno registrovao");
    });
  } else {
    document.querySelector(".overlayError").style.display = "block";
  }
});

overlayBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  window.location.href = "/";
});

document.querySelector(".overlay-error-btn").addEventListener("click", () => {
  document.querySelector(".overlayError").style.display = "none";
});

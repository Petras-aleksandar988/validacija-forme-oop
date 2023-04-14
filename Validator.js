
 // kreiranje klase za validaciju forme. Konstruktor prima dva parametra, config objekat, kreiran u script.js  i clasu form elementa(u ovom slucaju .form)
 // Objekat config kao svoje keys sadrzi vrijednosti atribute iz input elemenata. Za svaki pojedinacni key unutar config objekta su definisani parametri radi lakse validacije.

 
class Validator {
  constructor(config, formID) {
    this.elementsConfig = config;
    this.formID = formID;
    this.errors = {};
// za svako input polje kreiramo prazan array u errors objektu u koje cemo upisivati greske
      this.generateErrorsObject();
      // funkcija koja uzima vriednosti iz input polja 
    this.inputListener();

  }
 // 
  generateErrorsObject() {
    for (let field in this.elementsConfig) {
      this.errors[field] = [];
    }
    }

    inputListener() {
      
    let inputSelector = this.elementsConfig;
 //  keys vrijednosti iz input selectora (config u script.js) uzimamo pomocu petlje i stavljamo u inputEl varijablu svaki DOM element od inputa 
    for (let field in inputSelector) {
        
      let inputEl = document.querySelector(`${this.formID} input[name="${field}"]`);
        // uzimanje vriednosati iz inputa i koristenje bind metoda(posudjivanje funkcije i pravljenje kopije pomocu kljucne rijeci this) 
      inputEl.addEventListener("input", this.validate.bind(this));
    }
  }

  validate(e) {
    let elFields = this.elementsConfig;

    let field = e.target;
    let fieldName = field.getAttribute("name");
    let fieldValue = field.value;
   // praznjenje svih vrijednosti iz errors objekta prije svake nove validacije.
    this.errors[fieldName] = [];
        // definisanje uslova za svako pojedinacno input polje i pravila za validaciju 
    if (elFields[fieldName].required) {
        if (fieldValue === "") {
          // ukoliko neko polje ne prodje if petlju greska zeljenog sadrzaja se upisuje u errors objekat i to za input koji trenutno koristimo.  
        this.errors[fieldName].push("Polje je prazno, molim vas unesite minimalno jedan karakter");
      }
    }
      if (elFields[fieldName].ime) {
          let validation = fieldValue.trim();
          validation = validation.split(" ");
          if (validation.length < 2) {
            this.errors[fieldName].push("Upisite u polje i ime i prezime");
          }
   }
     if (elFields[fieldName].email) {
       if (!this.validateEmail(fieldValue)) {
         this.errors[fieldName].push("Email adresa je netacna");
       }
     }
      if (elFields[fieldName].phone) {
          if (fieldValue.length < 9) {
              this.errors[fieldName].push("Polje mora sadrzati minimalno 9 cifara");
          }
      }
      if (elFields[fieldName].posta) {
          if (fieldValue.length === 5) {
              
          } else {
              this.errors[fieldName].push(
                "polje mora sadrzati tacno 5 cifara"
              );
          }
      }

    if (
      fieldValue.length < elFields[fieldName].minLength ||
      fieldValue.length > elFields[fieldName].maxLength
    ) {
      this.errors[fieldName].push(
        `polje mora imati minimalno ${elFields[fieldName].minLength} ,  i maksimalno ${elFields[fieldName].maxLength} karaktera`
      );
    }

    

    if (this.errors[fieldName].length === 0) {
      this.errors[fieldName] = [];
    }

    this.populateErrors(this.errors);
  }
 
  validationPassed() {
    for (let key of Object.keys(this.errors)) {
      if (this.errors[key].length > 0) {
        return false;
      }
    }

    return true;
  }

  populateErrors(errors) {
    for (const elem of document.querySelectorAll("ul")) {
      elem.remove();
    }

    for (let key of Object.keys(errors)) {
      let parentElement = document.querySelector(
        `${this.formID} input[name="${key}"]`
        ).parentElement;
        
      let errorsElement = document.createElement("ul");
      parentElement.appendChild(errorsElement);

      errors[key].forEach((error) => {
        let li = document.createElement("li");
        li.innerText = error;

        errorsElement.appendChild(li);
      });
    }
  }
 // validacija emaila pomocu regex
  validateEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true;
    }

    return false;
  }
}

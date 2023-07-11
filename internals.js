// with element internals
class CustomCheckbox extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.value_ = false;
  }

  inputEl () {
    return this.shadowRoot.querySelector("input");
  }

  get value() {
    return this.value_;
  }
  set value(v) {
    this.value_ = !!v;
    this.inputEl().checked = !!v;
    this.internals_.setFormValue(this.name, this.value_);
  }
  get form() {
    return this.internals_.form;
  }
  get name() {
    return this.getAttribute('name');
  }
  get type() {
    return this.localName;
  }
  get validity() {
    return this.internals_.validity;
  }
  get validationMessage() {
    return this.internals_.validationMessage;
  }
  get willValidate() {
    return this.internals_.willValidate;
  }

  checkValidity() {
    return this.internals_.checkValidity();
  }
  reportValidity() {
    return this.internals_.reportValidity();
  }

  connectedCallback () {
    // Create a shadow root
    this.attachShadow({ mode: "open" }); // sets and returns 'this.shadowRoot'

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");

    const that = this;

    input.onchange = ev => {
      this.value_ = !this.value_;
      this.internals_.setFormValue("value", ev.target.value);
    };

    // Create some CSS to apply to the shadow DOM
    const style = document.createElement("style");
    style.textContent = `:host {
      margin: 10px;
    }`;

    // attach the input element to the shadow DOM
    this.shadowRoot.append(input);
    this.shadowRoot.appendChild(style);
  }
}

window.customElements.define("custom-checkbox", CustomCheckbox);


let element = document.createElement("custom-checkbox");
element.setAttribute("name", "test-name");
let form = document.createElement("form");

// Append element to form to associate it
form.appendChild(element);

console.log(element.internals_.form);
// expected output: <form><custom-checkbox></custom-checkbox></form>


const body = document.querySelector("body");
body.appendChild(form);

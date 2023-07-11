// This is a pretty basic 'checkbox' component using `ElementInternals` which
// is minimalist to the point of being essentially useless (it doesn't offer
// any functionality beyond what you get from just `<input type="checkbox">`
// and in fact it merely wraps such an input!)
//
// However, it's useful as a simple example which is documented with a bunch of
// comments to explain how it all works.
//
// The component has:
//
// 1. Attributes for common things allowing you to easily inspect it's state in
//    the browser.
// 2. Boilerplate for echoing the value of its `<input>` element out to the
//    form it resides within.
// 3. Validation (where it's valid when checked and invalid otherwise). Since
//    this is using the `ElementInternals` validation APIs it should prevent
//    submission of the form as long as it's invalid.
class CustomCheckbox extends HTMLElement {
  // we have to set this to true! See
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals#examples
  static formAssociated = true;

  constructor() {
    super();
    // we also need to call this method and store the return value
    this.internals_ = this.attachInternals();
    this.__value = false;
  }

  inputEl () {
    return this.shadowRoot.querySelector("input");
  }

  set value(v) {
    this.__value = !!v;
    this.inputEl().checked = this.__value;
    this.internals_.setFormValue(this.__value);
  }
  get value() { return this.__value; }

  // a bunch of getters for various things (mostly for convenience)
  get form() { return this.internals_.form; }
  get name() { return this.getAttribute('name'); }
  get type() { return this.localName; }
  get validity() { return this.internals_.validity; }
  get validationMessage() { return this.internals_.validationMessage; }
  get willValidate() { return this.internals_.willValidate; }

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

    // This `onchange` handler which we attach to the `<input>` el inside of
    // our CE's shadow DOM will take care of echoing its value out to the
    // form.
    //
    // Note that we don't need to pass a name or anything here - the browser
    // will look at the `name` attr on the instance of our CE to figure out
    // what name to insert in the formdata.
    //
    // This is perhaps a bit more 'manual' than I thought this would be, but
    // there's a lot of flexibility here with this type of imperative interface
    // to the underlying form. You could easily add, for instance, custom
    // validation in your `onchange` or `oninput` handler 
    input.onchange = ev => {
      this.__value = !!ev.target.value;
      this.internals_.setFormValue(this.value);
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

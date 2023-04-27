class Button extends HTMLElement {
  constructor() {
    super()
    this._buttonContainer;
    this._buttonText = 'Clique';
    // this._buttonColor;
    this.attachShadow({ mode: 'open' }) 
    this.shadowRoot.innerHTML = `
    <style>
      button {
        padding: 8px;
        border-radius: 50px;
        background-color: #197e85;
        font-family: raleway;
        color: white;
        border: none;
        cursor: pointer;
      }
      button:hover {
        background-color: #eb9c52;
        font-family: raleway;
        color: white;
        padding: 13px;
        font-size: 13px;
      }
    </style>
    `
  }

  connectedCallback() {
    this._buttonContainer = document.createElement('button')
    this.shadowRoot.appendChild(this._buttonContainer)
    const button = this.shadowRoot.querySelector('button')
    this._buttonContainer.textContent = this._buttonText
    button.addEventListener('click', this._buttonClick)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === 'text') {
      this._buttonText = newValue;
      const button = this.shadowRoot.querySelector('button');
      button.textContent = this._buttonText;
    }
    // if (name === 'color') {
    // button.style.backgroundColor = newValue;
    // const button = this.shadowRoot.querySelector('button');
    // button.style.backgroundColor = this._buttonColor
    // }
  }

  static get observedAttributes() { // locked down property - é tipo um atributo da classe, algo que inicializamos com o this._tooltipContainer, mas não é acessível de fora, aqui nós apenas pegamos o valor
    return ['text', 'class', 'color']
  }

  _buttonClick() {
    console.log('Oi')
  }
}

customElements.define('let-button', Button)
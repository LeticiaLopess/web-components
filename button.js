class Button extends HTMLElement {
  constructor() {
    super()
    this._buttonContainer;
    this._buttonText = 'Clique';
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
      }
      button:hover {
        color: #0155;
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

  _buttonClick() {
    console.log('Oi')
  }
}

customElements.define('let-button', Button)
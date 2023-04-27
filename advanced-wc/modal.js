class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
    this.isOpen = false;
    this.shadowRoot.innerHTML = `
        <style>
          #backdrop {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(0,0,0,0.75);
            z-index: 10;
            opacity: 0;
            pointer-events: none;
          }

          :host([opened]) #backdrop,
          :host([opened]) #modal {
            opacity: 1;
            pointer-events: all;
          }

          #modal {
            position: fixed;
            top: 15vh;
            left: 25%;
            width: 50%;
            z-index: 100;
            background: white;
            border-radius: 4px;
            box-shadow 0 2px 8px rgba(0,0,0,0.26);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            opacity: 0;
            pointer-events: none;
          }

          #actions {
            border-top: 1px solid #ccc;
            padding: 1rem;
            display: flex;
            justify-content: flex-end;
          }

          #actions button#confirm {
            padding: 8px;
            border-radius: 50px;
            background-color: #3676e0;
            font-family: raleway;
            color: white;
            border: none;
            cursor: pointer;
            margin: 0 0.25rem;
          }

          #actions button#cancel {
            padding: 8px;
            border-radius: 50px;
            background-color: #f44336;
            font-family: raleway;
            color: white;
            border: none;
            cursor: pointer;
            margin: 0 0.25rem;
          }

          ::slotted(h1) {
            padding: 1rem;
            display: flex;
            justify-content: center;
          }

          header h1 {
            font-family: Raleway;
            font-size: 1.6rem;
            color: #171717;
          }

          #main {
            padding: 2px;
            text-align: center;
          }
          
        </style>

        <div id="backdrop"></div> 

        <div id="modal">
          <header>
            <slot name="title"> Please Confirm Payment </slot>
          </header>

          <section id="main">
            <slot name=""></slot>
          </section>

          <section id="actions">
            <button id="cancel">Cancel</button>
            <button id="confirm">Confirm</button>
          </section>
        </div>
    `;
    // backdrop - part behind modal
    // modal - the modal itself
    // z-index - depth level (nível de profundidade)0
    // optimize this for mobile: we can use media queries
    // don't forget ";" after CSS properties!

    const slots = this.shadowRoot.querySelectorAll('slot');
    slots[1].addEventListener('slotchange', event => {
      console.dir(slots[1].assignedNodes()) // printa um objeto no console que nos mostra todos os elementos que estão dentro de slots
    })

    const cancelButton = this.shadowRoot.querySelector('#cancel')
    const confirmButton = this.shadowRoot.querySelector('#confirm')
    cancelButton.addEventListener('click', this._cancel.bind(this)); // bind(this) -> para se referir à classe e não ao botão o qual está tendo o evento
    confirmButton.addEventListener('click', this._confirm.bind(this)); 

  }

  // poderíamos fazer essa aparição do modal com o atributo opened dessa forma abaixo, mas, quando o atributo opened aparece eu só quero mudar o estilo, então eu posso fazer isso diretamente no css

   attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'opened') { // pois podemos ter outros atributos
      if (this.hasAttribute('opened')) { // por agora estar disponível e sei que esse atributo foi adicionado, então eu posso criar meu evento aqui
          this.isOpen = true;       
  //       this.shadowRoot.querySelector('#backdrop').style.opacity = 1;
  //       this.shadowRoot.querySelector('#backdrop').style.pointerEvents = 'all';
  //       this.shadowRoot.querySelector('#modal').style.opacity = 1;
  //       this.shadowRoot.querySelector('#modal').style.pointerEvents = 'all';
      }
    } else {
      this.isOpen = false;
    }
  }

   static get observedAttributes() {
     return ['opened'];
   }

  open() {
    this.setAttribute('opened', '')
    this.isOpen = true;
  }

  hide() {
    if (this.hasAttribute('opened')) {
      this.removeAttribute('opened')
    }
    this.isOpen = false;
  }

  _cancel() {
    this.hide();
  }

  _confirm() {
    this.hide();
  }

}

// se eu colocar um <slot></slot>, essa primeira tag slot, quando eu digitar no HTML, ele vai pegar todo conteúdo que foi colocado dinamicamente no HTML, e ai caso tenha mais de um slot, os outros slots ficarão vazios e o primeiro slot com todo o conteúdo;
// para resolvermos isso, podemos colocar uma propriedade de nome no slot e no html, quando colocarmos a tag, colocarmos como propriedade: nome="nome do slot"


customElements.define('viva-modal', Modal)


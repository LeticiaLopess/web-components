class Modal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' })
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

          header {
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
            <h1>Please Confirm Below</h1>
          </header>

          <section id="main">
            <slot></slot>
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

  }
}

customElements.define('viva-modal', Modal)
class Tooltip extends HTMLElement {
  constructor() {
    super(); // se não inicializar com super() dá erro
    this._tooltipContainer; // propriedade de toda classe que pode ser alterada - é tipo uma variável global
    this._tooltipText = 'Some dummy tooltip text.' // texto padrão da tooltip
    this.attachShadow({ mode: 'open' }) // CLASSE COLOCADA EM SHADOW DOM
    this.shadowRoot.innerHTML = `
    <style>
      div {
        background-color: black;
        color: white;
        position: absolute;
        z-index: 10; 
      }

      :host(.important) { 
        background: var(--color-primary, #ccc);
      }

      :host-context(p) {
        font-weight: bold;
      }

      .highlight {
        background-color: red;
      }

      ::slotted(.highlight) {
        border-bottom: 1px dotted red
      }

      .icon {
        background: black;
        color: white;
        padding: 0.15rem 0.5rem;
        text-align: center;
        border-radius: 50%
      }

    </style>
    <slot>Some default</slot>
    <span class="icon">?</span>`
  }
  // A propriedade z-index especifica a ordem da pilha de um elemento. Um elemento com ordem de pilha maior está sempre na frente de um elemento com ordem de pilha menor.
  // ::slotted(.highlight) -> vai pegar o elemento com a classe highlight que tiver slot. se eu quiser pegar todos: ::slotted(*). lembrando que se eu tiver um estilo border-bottom no css, vai sobrepor ao estilo setado no JS
  // :host -> é como se estivéssemos setando a própria tag uc-tooltip | :host.important -> para o componente com classe importante, mas dessa forma não funciona, devemos verificar se existe primeiro, envolvemos a classe, div[...] com parênteses
  // :host-context(p) -> para estilizar a tag p que está dentro do nosso componente | :host-context(p.hello) -> tag p com classe joke | :host-context(p .hello) -> elemento aninhado dentro de .hello
  // nesse caso, se eu tiver um estilo para todas as divs definido em CSS, esse estilo interferirá nesse meu componente. Portanto, utilizaremos a shadow DOM

  connectedCallback() { 
    // elemento children deve ficar dentro de um callback, se ficar solto no constructor dá erro, pois ao criar nossos próprios componentes, o browser tem um lifecycle específico pra isso. Estamos acessando a DOM e nosso elemento só vai ser montado na DOM real quando esse método for chamado. Nesse caso, deve ser esse nome mesmo.
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }
    const tooltipIcon = this.shadowRoot.querySelector('span')
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this)) // pela forma como o this se comporta, eu devo usar o método bind aqui. Isso inferirá que o this de _showTooltip() sempre se referirá à classe Tooltip (e não referirá ao principal elemento em _showTooltip)
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this)) // pela forma como o this se comporta, eu devo usar o método bind aqui. Isso inferirá que o this de _showTooltip() sempre se referirá à classe Tooltip (e não referirá ao principal elemento em _showTooltip)
    this.shadowRoot.appendChild(tooltipIcon); // ANTES DE INSERIR A CHILD EU ACESSO A SHADOW DOM USANDO shadowRoot
    this.style.position = 'relative';
  }

  _showTooltip() { // início com "_" não porque é obrigatório, mas porque já é uma convenção: os métodos que iniciam assim indicam que serão chamados internamente na classe. Não devemos chamá-lo em outras situações
    this._tooltipContainer = document.createElement('div');
    //this._tooltipContainer.textContent = 'This is the tooltip text!';
    this._tooltipContainer.textContent = this._tooltipText;
    this.shadowRoot.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.shadowRoot.removeChild(this._tooltipContainer)
  }

}

customElements.define('uc-tooltip', Tooltip);
// define que ('nome-tag', será essa Classe)

class Tooltip extends HTMLElement {
  constructor() {
    super(); // se não inicializar com super() dá erro
    // this._tooltipContainer; // propriedade de toda classe que pode ser alterada - é tipo uma variável global
    this._tooltipText = 'Some dummy tooltip text.' // texto padrão da tooltip
    this._tooltipIcon;
    this._tooltipVisible = false;
    this.attachShadow({ mode: 'open' }) // CLASSE COLOCADA EM SHADOW DOM
    this.shadowRoot.innerHTML = `
    <style>
      div {
        font-weight: normal;
        background-color: black;
        color: white;
        position: absolute;
        top: 1.5rem;
        left: 0.75rem; 
        z-index: 10; 
        padding: 0.15rem;
        border-radius: 3px;
        box-shadow: 1px 1px 6px rgba(0,0,0,0.26)
      }

      :host { 
        position: relative;
      }

      :host(.important) { 
        background: var(--color-primary, #ccc);
        padding: 0.15rem;
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
  // A tag <slot> é usada na criação de web components para permitir que o conteúdo do componente seja dinamicamente substituído por conteúdo fornecido pelo usuário. Quando um componente contém uma ou mais tags <slot>, o conteúdo que está dentro dessas tags é considerado como "slot content". O slot content pode ser substituído por outro conteúdo quando o componente é utilizado em uma página HTML.
  // A propriedade z-index especifica a ordem da pilha de um elemento. Um elemento com ordem de pilha maior está sempre na frente de um elemento com ordem de pilha menor.
  // ::slotted(.highlight) -> vai pegar o elemento com a classe highlight que tiver slot. se eu quiser pegar todos: ::slotted(*). lembrando que se eu tiver um estilo border-bottom no css, vai sobrepor ao estilo setado no JS
  // :host -> é como se estivéssemos setando a própria tag uc-tooltip | :host.important -> para o componente com classe importante, mas dessa forma não funciona, devemos verificar se existe primeiro, envolvemos a classe, div[...] com parênteses
  // :host-context(p) -> para estilizar a tag p que está dentro do nosso componente | :host-context(p.hello) -> tag p com classe joke | :host-context(p .hello) -> elemento aninhado dentro de .hello
  // se esquecer um ";" no estilo css, dá ruim
  // nesse caso, se eu tiver um estilo para todas as divs definido em CSS, esse estilo interferirá nesse meu componente. Portanto, utilizaremos a shadow DOM

  connectedCallback() { 
    // elemento children deve ficar dentro de um callback, se ficar solto no constructor dá erro, pois ao criar nossos próprios componentes, o browser tem um lifecycle específico pra isso. Estamos acessando a DOM e nosso elemento só vai ser montado na DOM real quando esse método for chamado. Nesse caso, deve ser esse nome mesmo.
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }
    this._tooltipIcon = this.shadowRoot.querySelector('span')
    this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this)) // pela forma como o this se comporta, eu devo usar o método bind aqui. Isso inferirá que o this de _showTooltip() sempre se referirá à classe Tooltip (e não referirá ao principal elemento em _showTooltip)
    this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this)) // pela forma como o this se comporta, eu devo usar o método bind aqui. Isso inferirá que o this de _showTooltip() sempre se referirá à classe Tooltip (e não referirá ao principal elemento em _showTooltip)
    // this.shadowRoot.appendChild(this._tooltipIcon); // ANTES DE INSERIR A CHILD EU ACESSO A SHADOW DOM USANDO shadowRoot
    this._render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }
    if (name === 'text') { // tipo da property
      this._tooltipText = newValue;
    }
  }

  static get observedAttributes() { // locked down property é tipo um atributo da classe, algo que inicializamos com o this._tooltipContainer, mas não é, é acessível de fora, aqui nós apenas pegamos o valor
    return ['text', 'class']
  }

  _render() { // lembrando, se possui "_" -> deixa claro que esse método só será chamado nesta classe
    let tooltipContainer = this.shadowRoot.querySelector('div');
    if (this._tooltipVisible) {
      tooltipContainer = document.createElement('div');
      tooltipContainer.textContent = this._tooltipText;
      this.shadowRoot.appendChild(tooltipContainer);
    } else {
      if (tooltipContainer) {
        this.shadowRoot.removeChild(tooltipContainer)
      }
    }
  }

  _showTooltip() { // início com "_" não porque é obrigatório, mas porque já é uma convenção: os métodos que iniciam assim indicam que serão chamados internamente na classe. Não devemos chamá-lo em outras situações
    this._tooltipVisible = true;
    this._render();
  }

  _hideTooltip() {
    this._tooltipVisible = false;
    this._render();
  }

  disconnectedCallback() { // executa quando o componente é removido -> cancelar requisições HTTP, enviar uma mensagem log pro servidor, limpar eventos... 
    this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip)
    this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip)
  }

}


customElements.define('uc-tooltip', Tooltip);
// define que ('nome-tag', será essa Classe)

// if I try to set a new value in an attribute in the dev tool, this attribute changes don't get picked up because we got no logic for that in the component. The "text" attribute is extracted in connectedCallback (i.e. when the component gets mounted to the DOM) only.











class Tooltip extends HTMLElement {
  constructor() {
    super(); // se não inicializar com super() dá erro
    this._tooltipContainer; // propriedade de toda classe que pode ser alterada - é tipo uma variável global
    this._tooltipText = 'Some dummy tooltip text.' // texto padrão da tooltip
  }

  connectedCallback() { 
    // elemento children deve ficar dentro de um callback, se ficar solto no constructor dá erro, pois ao criar nossos próprios componentes, o browser tem um lifecycle específico pra isso. Estamos acessando a DOM e nosso elemento só vai ser montado na DOM real quando esse método for chamado. Nesse caso, deve ser esse nome mesmo.
    if (this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text')
    }
    const tooltipIcon = document.createElement('span');
    tooltipIcon.textContent = ' (?)';
    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this)) // pela forma como o this se comporta, eu devo usar o método bind aqui. Isso inferirá que o this de _showTooltip() sempre se referirá à classe Tooltip (e não referirá ao principal elemento em _showTooltip)
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this)) // pela forma como o this se comporta, eu devo usar o método bind aqui. Isso inferirá que o this de _showTooltip() sempre se referirá à classe Tooltip (e não referirá ao principal elemento em _showTooltip)
    this.appendChild(tooltipIcon);
  }

  _showTooltip() { // início com "_" não porque é obrigatório, mas porque já é uma convenção: os métodos que iniciam assim indicam que serão chamados internamente na classe. Não devemos chamá-lo em outras situações
    this._tooltipContainer = document.createElement('div');
    //this._tooltipContainer.textContent = 'This is the tooltip text!';
    this._tooltipContainer.textContent = this._tooltipText;
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer)
  }

}

customElements.define('uc-tooltip', Tooltip);
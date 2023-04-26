// quando extendemos um elemento do objeto HTMLElements, que é o caso do HTMLAnchorElement, ao definir o customElements, devemos passar um terceiro parâmentro, um objeto/bloco, onde dentro terá: "extends: nome da tag que estaremos usando"
class ConfirmLink extends HTMLAnchorElement {
  connectedCallback() {
    this.addEventListener('click', event => {
      if (!confirm('Do you really want to leave?')) {
        event.preventDefault(); // não vai abrir outra aba pois está prevenindo o padrão
      }
    })
  }
}

customElements.define('uc-confirm-link', ConfirmLink, { extends: 'a' });
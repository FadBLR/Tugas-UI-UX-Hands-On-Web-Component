class CounterDisplay extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Initialize properties
    this._count = parseInt(this.getAttribute('value')) || 0;
    this._title = this.getAttribute('title') || 'Lorem Ipsum Title';
    
    this.render();
  }

  render() {
    // Clear existing content first
    this.shadowRoot.innerHTML = '';
    
    // Create elements manually instead of template literal
    const style = document.createElement('style');
    style.textContent = `
      .display {
        background-color: #f8a8a8;
        padding: 12px;
        border: 1px solid #000;
        font-family: sans-serif;
      }
      .title {
        font-size: 0.9rem;
        margin-bottom: 4px;
      }
      .value {
        font-size: 1rem;
      }
      .number {
        font-weight: bold;
        font-style: italic;
      }
    `;

    const display = document.createElement('div');
    display.className = 'display';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    titleDiv.textContent = this._title;

    const valueDiv = document.createElement('div');
    valueDiv.className = 'value';
    valueDiv.innerHTML = 'Value: <span class="number"></span>';
    
    // Set initial value
    valueDiv.querySelector('.number').textContent = this._count;

    display.appendChild(titleDiv);
    display.appendChild(valueDiv);
    
    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(display);
  }

  set count(val) {
    this._count = val;
    const numberEl = this.shadowRoot.querySelector('.number');
    if (numberEl) {
      numberEl.textContent = val;
    }
  }

  get count() {
    return this._count;
  }
}

customElements.define('counter-display', CounterDisplay);
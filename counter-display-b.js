class CounterDisplayB extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Use consistent property names
    this._count = parseInt(this.getAttribute('value')) || 0;
    this._title = this.getAttribute('title') || 'Lorem Ipsum Title';
    
    this.render();
  }

  render() {
    // Clear existing content
    this.shadowRoot.innerHTML = '';
    
    // Create style element
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

    // Create display container
    const display = document.createElement('div');
    display.className = 'display';

    // Create title element
    const titleElement = document.createElement('div');
    titleElement.className = 'title';
    titleElement.textContent = this._title;

    // Create value element
    const valueElement = document.createElement('div');
    valueElement.className = 'value';
    valueElement.textContent = 'Value: ';
    
    // Create number span
    const numberSpan = document.createElement('span');
    numberSpan.className = 'number';
    numberSpan.textContent = this._count;
    
    valueElement.appendChild(numberSpan);

    // Build the DOM
    display.appendChild(titleElement);
    display.appendChild(valueElement);
    
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

customElements.define('counter-display-b', CounterDisplayB);
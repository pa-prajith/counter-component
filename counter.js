class CounterComponent extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: "open" });
    this.counter = 0;
  }

  get count() {
    return this.getAttribute("count");
  }

  set count(value) {
    this.setAttribute("count", value);
  }

  static get observedAttributes() {
    return ["count"];
  }

  attributeChangedCallback(prop, oldValue, newValue) {
    if (prop === "count") {
      this.invokeRender();
    }
  }

  inc() {
    this.count++;
  }

  connectedCallback() {
    this.invokeRender();
  }

  invokeRender() {
    this.render();
    const btn = this.shadow.querySelector("#btn");
    btn.addEventListener("click", this.inc.bind(this));
  }

  disconnectedCallback() {
    const btn = this.shadow.querySelector("#btn");
    btn.removeEventListener();
  }

  render() {
    this.shadow.innerHTML = `
            <h1>Counter</h1>
            ${this.count}
            <button id="btn">Increment</btn>
        `;
  }
}

window.customElements.define("counter-component", CounterComponent);

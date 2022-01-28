export const creation = {
  initialLayers: 3,
  thicknessWrapper: document.getElementById('js-append-layer-thickness') as HTMLDivElement,
  resistanceWrapper: document.getElementById('js-append-layer-resistance') as HTMLDivElement,
  layersInput: document.getElementById('number-of-layers') as HTMLInputElement,
  defaultsThickness: [500, 5000],
  defaultsResistance: [1, 1000, 1],

  setCurrentLayers(): void {
    const currentLayers = this.layersInput.value;

    if (!currentLayers) {
      this.createInputsForThickness(this.initialLayers, true);
      this.createInputsForResistance(this.initialLayers, true);
      return;
    }

    this.thicknessWrapper.classList.add('invisible');
    this.resistanceWrapper.classList.add('invisible');

    setTimeout(() => {
      this.createInputsForThickness(Number(currentLayers), false);
      this.createInputsForResistance(Number(currentLayers), false);
    }, 500);
  },

  createInput(
    className: string,
    placeholder: string,
    property: string,
    value: string | number | null,
  ): string {
    return `
      <label class="input__wrapper">
          <p class="input__property">
            ${property}
          </p>
        <input type="number" class="input__input ${className}" placeholder="${placeholder}" value="${value}">
      </label>
    `;
  },

  createInputsForThickness(layers: number, initial: boolean): void {
    const className = 'js-get-layer-thickness-value';
    const placeholder = 'Мощность слоя';

    let htmlToAppend = '';

    for (let index = 0; index < layers - 1; index++) {
      const property = `h<sub>${index + 1}</sub>`;
      let value = null;
      if (initial) {
        value = this.defaultsThickness[index];
      }
      const rawHtml = this.createInput(className, placeholder, property, value);
      htmlToAppend += rawHtml;
    }

    this.thicknessWrapper.innerHTML = htmlToAppend;
    this.thicknessWrapper.classList.remove('invisible');
  },

  createInputsForResistance(layers: number, initial: boolean): void {
    const className = 'js-append-layer-resistance';
    const placeholder = 'Сопротивление слоя';

    let htmlToAppend = '';

    for (let index = 0; index < layers; index++) {
      const property = `&rho;<sub>${index + 1}</sub>`;
      let value = null;
      if (initial) {
        value = this.defaultsResistance[index];
      }
      const rawHtml = this.createInput(className, placeholder, property, value);
      htmlToAppend += rawHtml;
    }

    this.resistanceWrapper.innerHTML = htmlToAppend;
    this.resistanceWrapper.classList.remove('invisible');
  },

  bindEvent(): void {
    this.createInputsForThickness(this.initialLayers, true);
    this.createInputsForResistance(this.initialLayers, true);

    this.layersInput.addEventListener('blur', this.setCurrentLayers.bind(this));
  },
};

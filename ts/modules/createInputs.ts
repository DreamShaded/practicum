export const creation = {
  initialLayers: 3,
  currentLayers: 0,
  thicknessWrapper: document.getElementById('js-append-layer-thickness') as HTMLDivElement,
  resistanceWrapper: document.getElementById('js-append-layer-resistance') as HTMLDivElement,
  defaultsThickness: [500, 5000],
  defaultsResistance: [1, 1000, 1],

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

  bindEvent(): void {
    this.createInputsForThickness(this.initialLayers, true);
  },
};

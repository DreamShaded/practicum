import { e, i, sqrt } from 'mathjs';

export const countThisStuff = {
  // Значения сингл инпутов
  numberOfPeriods: document.getElementById('number-of-periods') as HTMLInputElement,
  numberOfLayers: document.getElementById('number-of-layers') as HTMLInputElement,
  firstPeriod: document.getElementById('first-period') as HTMLInputElement,
  step: document.getElementById('step') as HTMLInputElement,

  // Значения групп инпутов
  thicknessClass: 'js-get-layer-thickness-value',
  resistanceClass: 'js-get-layer-resistance',
  thicknessArray: [] as string[],
  resistanceArray: [] as string[],

  // Биндинг на элементы для вывода результата
  resultButton: document.getElementById('get-results') as HTMLButtonElement,
  resultWrapper: document.getElementById('js-append-results') as HTMLDivElement,
  summary: document.getElementById('summary') as HTMLDivElement,
  // Вспомогательная константа
  resultHeadings: `
    <thead>
      <tr>
        <td class="si__head">Номер периода</td>
        <td class="si__head">&#8730;T</td>
        <td class="si__head">&rho;<sub>t</sub></td>
        <td class="si__head">&phi;<sub>t</sub></td>
      </tr>
    </thead>`,

  renderTableRow(
    index: number,
    sqrtT: number,
    resistance: number,
    phase: number,
  ): string {
    return `
      <tr>
        <td class="si__head">${index}</td>
        <td class="si__item--is">${sqrtT}</td>
        <td class="si__item--is">${resistance}</td>
        <td class="si__item--is">${phase}</td>
      </tr>
    `;
  },

  // вычисления
  getArrayOfValues(className: string): string[] {
    const result: string[] = [];
    const nodes = document.getElementsByClassName(className) as HTMLCollectionOf<HTMLInputElement>;
    const nodesArray: HTMLInputElement[] = Array.from(nodes);

    nodesArray.forEach((node) => result.push(node.value));

    return result;
  },
  getAllValues(): void {
    this.thicknessArray = this.getArrayOfValues(this.thicknessClass);
    this.resistanceArray = this.getArrayOfValues(this.resistanceClass);
  },

  doAllTheMagicHere(): void {
    const Q = Number(this.step) || 2;
    const T = Number(this.firstPeriod) || 0.01;
    const NT = Number(this.numberOfPeriods) || 27;
    const N = Number(this.numberOfLayers) || 3;
    // приводим строки в массивах к числам
    const resistanceArray = this.resistanceArray.map((i) => +i);
    const thicknessArray = this.thicknessArray.map((i) => +i);
    // Омега
    const circularFrequency = (2 * Math.PI) / T;
    // cчётчик слоёв.
    const m = thicknessArray.length;
    // Мю нулевое
    const magneticConst = (4 * Math.PI) * (10 ** (-7));

    for (let period = 0; period < NT; period++) {
      // приведённый импеданс, зависит от свойств среды.
      let impedance: number;
      impedance = 1;
      for (let layer = m; layer > -1; layer--) {
        // Волновое число
        const k = (-1 * i * circularFrequency * magneticConst) / resistanceArray[period];
        // Вспомогательные константы для расчёта импеданса
        const A = sqrt(resistanceArray[period] / resistanceArray[period + 1]);
        const B = ((e ** (-2 * k * thicknessArray[period])) * (impedance - A)) / (impedance + A);

        impedance = (1 + B) / (1 - B);
      }
    }
  },

  bindEvent(): void {
    this.getAllValues();
    this.doAllTheMagicHere();
  },
};

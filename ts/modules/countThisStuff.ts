import {
  atan, e, evaluate, i, sqrt,
} from 'mathjs';

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

  renderTableBody(results: Array<number[]>): string {
    // @ts-ignore
    const arrayOfRows = results.map((row: number[]) => this.renderTableRow(...row as number[]));
    const body = arrayOfRows.join('');

    return body;
  },

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

  renderFullTable(body: string): void {
    const fullTable = `<table class="si">
    ${this.resultHeadings + body}
    </table>
    `;
    this.resultWrapper.innerHTML = fullTable;
    this.summary.classList.remove('invisible');
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
    const NT = Number(this.numberOfPeriods) || 27;
    const N = Number(this.numberOfLayers) || 3;
    // приводим строки в массивах к числам
    const resistanceArray = this.resistanceArray.map((item) => +item);
    const thicknessArray = this.thicknessArray.map((item) => +item);
    // Омега
    // cчётчик слоёв.
    const m = N - 2;
    // Мю нулевое
    const magneticConst = (4 * Math.PI) * (10 ** (-7));
    const result = [];

    let T = Number(this.firstPeriod) || 0.01;
    let impedance: any;
    let circularFrequency;

    for (let period = 0; period < NT; period++) {
      // приведённый импеданс, зависит от свойств среды.
      impedance = 1;
      circularFrequency = (2 * Math.PI) / T;

      for (let layer = m; layer > -1; layer--) {
        // Волновое число
        const k = evaluate(`sqrt(-1 * ${i} * ${circularFrequency * magneticConst}) / ${resistanceArray[layer]}`);

        // Вспомогательные константы для расчёта импеданса
        const A = sqrt(resistanceArray[layer] / resistanceArray[layer + 1]);
        const helperOne = evaluate(`-2 * ${k} * ${thicknessArray[layer]}`);
        const helperTwo = evaluate(`${e} ^ ${helperOne}`);

        const B = evaluate(`(${helperTwo} * (${impedance} - ${A}))/(${impedance} + ${A})`);

        impedance = evaluate(`(1 + ${B}) / (1 - ${B})`);
      }

      // теперь считаем
      const resultsArray = [];
      resultsArray.push(period + 1);
      resultsArray.push(sqrt(T));
      resultsArray.push(evaluate(`${resistanceArray[0]} * abs(${impedance} ^ 2)`));
      resultsArray.push(atan(impedance.im / impedance.re));

      result.push(resultsArray);
      T *= Q;
    }

    const body = this.renderTableBody(result);
    this.renderFullTable(body);
  },

  bindEvent(): void {
    this.getAllValues();
    this.resultButton.addEventListener('click', this.doAllTheMagicHere.bind(this));
  },
};

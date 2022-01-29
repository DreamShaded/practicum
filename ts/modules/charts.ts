export const charts = {
  initChartsButton: document.getElementById('init-charts') as HTMLButtonElement,
  chartsWrapper: document.getElementById('charts') as HTMLDivElement,
  // собираем инфу
  sqrtClassname: 'si__item--sqrt',
  resistanceClassname: 'si__item--resistance',
  phaseClassname: 'si__item--phase',
  // пакуем в массивы для графиков
  sqrtArray: [] as number[],
  resistanceArray: [] as number[],
  phaseArray: [] as number[],

  getArrayOfValues(className: string): number[] {
    const nodes = document.getElementsByClassName(className);
    const arrNodes = Array.from(nodes);
    const result = arrNodes.map((item) => Number(item.innerHTML));
    return result;
  },

  prepareData(): void {
    this.sqrtArray = this.getArrayOfValues(this.sqrtClassname);
    this.resistanceArray = this.getArrayOfValues(this.resistanceClassname);
    this.phaseArray = this.getArrayOfValues(this.phaseClassname);
  },

  getCharts(): void {
    this.prepareData();
    this.chartsWrapper.classList.remove('invisible');
  },

  bindEvent(): void {
    this.initChartsButton.addEventListener('click', this.getCharts.bind(this));
  },
};

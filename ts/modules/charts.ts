import Chart from 'chart.js/auto';

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
  // даём контекст на графики
  phaseChartCanvas: document.getElementById('chart-phase') as HTMLCanvasElement,
  resistanceChartCanvas: document.getElementById('chart-resistance') as HTMLCanvasElement,

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

  initPhaseChart(): Chart {
    const chart = new Chart(this.phaseChartCanvas, {
      type: 'line',
      data: {
        labels: this.sqrtArray,
        datasets: [
          {
            label: 'φt',
            data: this.phaseArray,
            borderColor: 'green',
          },
        ],
      },
      options: {
        responsive: false,
        scales: {
          y: {
            min: 0,
            max: -90,
            ticks: {
              stepSize: 45,
            },
          },
        },
      },
    });

    return chart;
  },

  initResistanceChart(): Chart {
    const chart = new Chart(this.resistanceChartCanvas, {
      type: 'line',
      data: {
        labels: this.sqrtArray,
        datasets: [
          {
            label: 'ρt',
            data: this.resistanceArray,
            borderColor: 'blue',
          },
        ],
      },
      options: {
        responsive: false,
      },
    });

    return chart;
  },

  getCharts(): void {
    this.prepareData();
    this.initPhaseChart();
    this.initResistanceChart();
    this.chartsWrapper.classList.remove('invisible');
  },

  bindEvent(): void {
    this.initChartsButton.addEventListener('click', this.getCharts.bind(this));
  },
};

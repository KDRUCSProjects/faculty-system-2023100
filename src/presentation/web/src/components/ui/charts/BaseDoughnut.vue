<template>
  <Doughnut
    :data="chartData"
    :options="options"
    :chart-options="chartOptions"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
  name: 'DoughnutChart',
  components: {
    Doughnut,
  },
  props: {
    chartId: {
      type: String,
      default: 'doughnut-chart',
    },
    datasetIdKey: {
      type: String,
      default: 'label',
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: '',
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    labels: {
      type: Array,
      default: () => {},
    },
    datasets: {
      type: Array,
      default: () => {},
    },
  },
  data() {
    return {
      chartData: {
        labels: [],
        datasets: [],
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            titleAlign: 'center',
            bodyAlign: 'center',
            titleFont: {
              family: 'Bahij Nassim',
              size: 18,
            },
            bodyFont: {
              family: 'Bahij Nassim',
              size: 16,
            },
            footerFont: {
              size: 20, // there is no footer by default
            },
          },
          legend: {
            labels: {
              // This more specific font property overrides the global property
              font: {
                family: 'Bahij Nassim',
                size: 14,
              },
            },
          },
        },
      },
    };
  },
  methods: {
    setData(labels, datasets) {
      this.chartData.labels = labels;
      this.chartData.datasets = datasets;
    },
    setDatasets(datasets) {
      // this.chartData.labels = labels;
      this.chartData.datasets = datasets;
    },
  },
  created() {
    this.chartData.labels = this.labels;
    this.chartData.datasets = this.datasets;
  },
};
</script>

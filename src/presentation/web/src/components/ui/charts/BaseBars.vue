<template>
  <div>
    <Bar
      :data="barsData"
      :options="options"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :plugins="plugins"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default {
  props: {
    chartId: {
      type: String,
      default: 'bar-chart',
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
  components: {
    Bar,
  },
  data: () => ({
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              font: {
                family: 'Bahij Nassim',
                size: 15,
              },
            },
          },
        },
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
      }),
    },
    barsData: {
      labels: ['January', 'February', 'March'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20, 12],
        },
      ],
    },
  }),
  methods: {
    setBar(labels, datasets) {
      this.barsData.labels = labels;
      this.barsData.datasets = datasets;
    },
  },
  created() {
    this.setBar(this.labels, this.datasets);
  },
};
</script>

<style lang="scss" scoped></style>

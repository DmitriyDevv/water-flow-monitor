class ChartController {
    constructor() {
        this.cxt = document.getElementById('waterFlowChart').getContext('2d');
        this.chart = null;

        this.initChart();
    }

    initChart() {
        this.chart = new Chart(this.cxt, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Water Flow',
                        data: [],
                        backgroundColor: 'rgba(75, 192, 192, 0.4)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    }

    updateChart(data) {
        this.chart.data.labels = data.map((item) => item.timeInterval);
        this.chart.data.datasets[0].data = data.map((item) => item.totalLiters);

        this.chart.update();
    }
}

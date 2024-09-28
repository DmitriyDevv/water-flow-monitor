class ViewController {
    constructor() {
        this.fromInput = document.getElementsByClassName('from')[0];
        this.toInput = document.getElementsByClassName('to')[0];
        this.requestBtn = document.getElementsByClassName('request')[0];
        this.totalLiters = document.getElementsByClassName('totalLiters')[0];

        this.dataController = new DataController('192.168.1.78');
        this.chartController = new ChartController();

        this.initFromToDate();
        this.requestHandler();

        this.requestBtn.addEventListener('click', this.requestHandler);
    }

    initFromToDate() {
        const today = new Date();
        const offset = today.getTimezoneOffset() * 60000;
        const formattedDate = new Date(today.getTime() - offset)
            .toISOString()
            .split('T')[0];

        this.fromInput.value = formattedDate;
        this.toInput.value = formattedDate;
    }

    requestHandler = async () => {
        const from = this.fromInput.value;
        const to = this.toInput.value;

        const data = await this.dataController.fetchData(from, to);

        this.setTotalLiters(data);
        this.chartController.updateChart(data);
    };

    setTotalLiters(data) {
        const totalLiters = this.dataController.calculateTotalLiters(data);
        this.totalLiters.textContent = `Total liters: ${totalLiters}`;
    }
}

const viewController = new ViewController();

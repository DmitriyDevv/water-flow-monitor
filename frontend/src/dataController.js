class DataController {
    constructor(serverAddress) {
        this.serverAddress = serverAddress;
    }

    async fetchData(from, to) {
        try {
            const response = await fetch(
                `http://${this.serverAddress}:3000/getByHours?from=${from}&to=${to}`
            );
            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return [];
        }
    }

    calculateTotalLiters(data) {
        return data
            .map((item) => item.totalLiters)
            .reduce((acc, val) => acc + val, 0);
    }
}

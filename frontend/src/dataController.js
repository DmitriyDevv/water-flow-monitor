class DataController {
    constructor(serverAddress) {
        this.serverAddress = serverAddress;
    }

    async fetchByHours(from, to) {
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

    async fetchByDays(from, to) {
        try {
            const response = await fetch(
                `http://${this.serverAddress}:3000/getByDays?from=${from}&to=${to}`
            );

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return [];
        }
    }

    async fetchByDays(from, to) {
        try {
            const response = await fetch(
                `http://${this.serverAddress}:3000/getByDays?from=${from}&to=${to}`
            );

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return [];
        }
    }

    async fetchByDays(from, to) {
        try {
            const response = await fetch(
                `http://${this.serverAddress}:3000/getByDays?from=${from}&to=${to}`
            );

            return await response.json();
        } catch (error) {
            console.error('Error fetching data:', error.message);
            return [];
        }
    }

    calculateMetrics(data) {
        // FIXME: make it possible to set these values from the frontend
        const waterPrice = 59.8;
        const waterDisposalPrice = 45.91;

        let accLiters = 0;
        let minLitersInfo = {
            liters: Infinity,
            time: 0,
        };
        let maxLitersInfo = {
            liters: 0,
            time: 0,
        };

        data.forEach((item) => {
            const liters = item.totalLiters;
            const { timeInterval } = item;

            accLiters += liters;

            if (liters < minLitersInfo.liters) {
                Object.assign(minLitersInfo, {
                    liters,
                    time: timeInterval,
                });
            }

            if (liters > maxLitersInfo.liters) {
                Object.assign(maxLitersInfo, {
                    liters,
                    time: timeInterval,
                });
            }
        });

        const averLiters = accLiters / data.length;
        const price = (accLiters / 1000) * (waterPrice + waterDisposalPrice);

        return {
            accLiters,
            averLiters,
            minLitersInfo,
            maxLitersInfo,
            price,
        };
    }
}

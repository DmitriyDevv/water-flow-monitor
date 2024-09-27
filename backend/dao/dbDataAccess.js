const sqlite3 = require('better-sqlite3');
const path = require('path');

class DbDataAccess {
    static db = this.getDatabase();

    static saveFlowData(liters) {
        const dateTime = new Date()
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');

        const sql = `INSERT INTO waterFlow (dateTime, liters) VALUES (?, ?)`;

        try {
            this.db.prepare(sql).run(dateTime, liters);
            console.log(`Inserted ${liters} liters at ${dateTime}`);
        } catch (error) {
            console.error('Error inserting data:', error.message);
        }
    }

    static getWaterFlowData(startDate, endDate) {
        const sql = `SELECT * FROM waterFlow WHERE dateTime BETWEEN ? AND ?`;

        try {
            return this.db.prepare(sql).all(startDate, endDate);
        } catch (error) {
            console.error('Error getting data:', error.message);
            return [];
        }
    }

    static getDatabase() {
        const dbPath = path.resolve(__dirname, '../db/waterData.db');
        const db = new sqlite3(dbPath);

        db.exec(`CREATE TABLE IF NOT EXISTS waterFlow (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    dateTime TEXT NOT NULL,
                    liters INTEGER NOT NULL
                )`);
        return db;
    }
}

module.exports = DbDataAccess;

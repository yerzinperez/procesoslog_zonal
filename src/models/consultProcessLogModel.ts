import { Connection } from '../config/connection';

/**
 * Class to get the process log from database
 */
export class ConsultProcessLogModel extends Connection {

  /**
   * Method to consult the process log to database when the system restart
   * @param date Today's date
   * @returns A promise with the result from consult
   */
  public async consultProcessLogRestart(lastIdProcess: number,date: string): Promise<any> {
    this.mssqlConnection = await this.mssql.connect(this.sqlConfig);
    return new Promise(async (resolve, reject) => {
      await this.mssqlConnection.query("SELECT * FROM procesoslog WHERE HParada BETWEEN '" + date + " 00:00:00.000' AND '" + date + " 11:59:59.999' AND HParada NOT BETWEEN '" + date + " 02:00:00.000' AND '" + date + " 02:10:59.999' AND id > " + lastIdProcess, (error: any, rows: object) => {
        if (error) {
          console.log("Error in consultProcessLogModel.ts 18: " + error);
          return reject(error);
        } else {
          return resolve(rows);
        }
      });
    })
  }

  /**
   * Method to consult the process log to database when the system up
   * @param date Today's date
   * @returns A promise with the result from consult
   */
  public async consultProcessLogUp(lastIdProcess: number,date: string): Promise<any> {
    this.mssqlConnection = await this.mssql.connect(this.sqlConfig);
    return new Promise(async (resolve, reject) => {
      await this.mssqlConnection.query("SELECT * FROM procesoslog WHERE HDisponible BETWEEN '" + date + " 00:00:00.000' AND '" + date + " 11:59:59.999' AND HDisponible > HArranque AND id > " + lastIdProcess, (error: any, rows: object) => {
        if (error) {
          console.log("Error: in consultProcessLogModel.ts 37: " + error);
          return reject(error);
        } else {
          return resolve(rows);
        }
      });
    })
  }
}
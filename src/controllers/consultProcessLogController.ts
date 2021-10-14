//Importing the model
import { ConsultProcessLogModel } from './../models/consultProcessLogModel';

/**
 * Class to get the process log from model
 */
export class ConsultProcessLogController{
  private date: Date;
  private today: string = '';
  private consultProcessLogModel: ConsultProcessLogModel = new ConsultProcessLogModel();
  private resultConsultSQLRestart: Promise<any>;
  private resultConsultSQLUp: Promise<any>;

  /**
   * Method to do the consult when the system restart
   */
  public doConsultProcessLogRestart(lastIdLog: number) {
    this.date = new Date();
    this.makeDate();

    this.resultConsultSQLRestart = this.consultProcessLogModel.consultProcessLogRestart(lastIdLog, this.today);
  }

  /**
   * Method to return the result from consult when the system restart
   * @returns resultConsultSQL
   */
  public returnResultProcessLogRestart(): Promise<any> {
    return this.resultConsultSQLRestart;
  }

  /**
   * Method to do the consult when the system up
   */
  public doConsultProcessLogUp(lastIdLog: number) {
    this.date = new Date();
    this.makeDate();

    this.resultConsultSQLUp = this.consultProcessLogModel.consultProcessLogUp(lastIdLog, this.today);
  }

  /**
   * Method to return the result from consult when the system up
   * @returns resultConsultSQL
   */
  public returnResultProcessLogUp(): Promise<any> {
    return this.resultConsultSQLUp;
  }

  /**
   * Method to set date format (aaaa-mm-dd)
   */
  private makeDate() {
    //Year
    this.today = `${this.date.getFullYear()}-`;

    //Month
    if ((this.date.getMonth() + 1) < 10) {
      this.today += `0${(this.date.getMonth() + 1)}-`;
    } else {
      this.today += `${(this.date.getMonth() + 1)}-`;
    }

    //Day
    if ((this.date.getDate() < 10)) {
      this.today += `0${this.date.getDate()}`;
    } else {
      this.today += `${this.date.getDate()}`;
    }
  }
}
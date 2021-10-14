//modules
require("dotenv").config();
import { ConsultProcessLogController } from "./controllers/consultProcessLogController";
import { SendNotificationController } from "./controllers/sendNotificationController";

/**
 * Main class
 */
class Main {
  //Attributes
  private TelegramBot = require("node-telegram-bot-api");
  private token: string = process.env.TOKEN;
  private bot: any = new this.TelegramBot(this.token, {
    polling: true,
  });
  private consultProcessLogController: ConsultProcessLogController =
    new ConsultProcessLogController();
  private resultRestart: Promise<any>;
  private resultUp: Promise<any>;
  private sendNotificationController: SendNotificationController =
    new SendNotificationController();

  private system: string;
  private lastIdNewRestart: number = 0;
  private lastIdNewUp: number = 0;
  private lastIdOldRestart: number = 0;
  private lastIdOldUp: number = 0;
  private consultLength: number = 0;

  /**
   * Method to start de system
   */
  public init() {
    try {
      this.consultProcessLogController.doConsultProcessLogRestart(this.lastIdNewRestart);
      this.consultProcessLogController.doConsultProcessLogUp(this.lastIdNewUp);
      this.resultRestart = this.consultProcessLogController.returnResultProcessLogRestart();
      this.resultUp = this.consultProcessLogController.returnResultProcessLogUp();

      this.resultRestart.then(
        (consult: object) => {
          this.consultLength = Object.keys(consult["recordset"]).length;
          if (this.consultLength > 0) {
            this.lastIdOldRestart = consult["recordsets"][0][this.consultLength - 1]["Id"];
            if (this.lastIdNewRestart != this.lastIdOldRestart) {
              for (let i = 0; i < this.consultLength; i++) {
                this.system = consult["recordsets"][0][i]["Sistema"];
                this.lastIdNewRestart = consult["recordsets"][0][i]["Id"];
                this.sendNotificationController.sendNotification(
                  this.bot,
                  this.lastIdNewRestart,
                  this.system,
                  "restart"
                );
              }
            } else {
              console.log("Sin novedad en reinicios.");
            }
          } else {
            console.log("Sin novedad en reinicios.");
          }
        },
        (errorPromise: any) => {
          console.log("Error in index.ts 64: " + errorPromise);
        }
      );

      this.resultUp.then(
        (consult: object) => {
          this.consultLength = Object.keys(consult["recordset"]).length;

          if (this.consultLength > 0) {
            this.lastIdOldUp = consult["recordsets"][0][this.consultLength - 1]["Id"];

            if (this.lastIdNewUp != this.lastIdOldUp) {
              for (let i = 0; i < this.consultLength; i++) {
                this.system = consult["recordsets"][0][i]["Sistema"];
                this.lastIdNewUp = consult["recordsets"][0][i]["Id"];
                this.sendNotificationController.sendNotification(
                  this.bot,
                  this.lastIdNewUp,
                  this.system,
                  "up"
                );
              }
            } else {
              console.log("Sin novedad en subidos.");
            }
          } else {
            console.log("Sin novedad en subidos.");
          }
        },
        (errorPromise: any) => {
          console.log("Error in index.ts 94: " + errorPromise);
        }
      );
    } catch (errorCatch) {
      console.log("Error in index.ts 98: " + errorCatch);
    }
  }
}

//Making an instance
let main: Main = new Main();

//Every 5min executing the program (milliseconds)
setInterval(() => {
  main.init();
}, 5000);

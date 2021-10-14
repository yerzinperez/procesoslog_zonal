import { SendNotificationModel } from '../models/sendNotificationModel';

export class SendNotificationController {
  //Attributes
  private sendNotificationModel: SendNotificationModel = new SendNotificationModel();
  private users: Promise<any>;

  /**
   * Method to send a notification
   * @param bot Bot config
   * @param id_proceso ID process in BD
   * @param system System failed
   * @param process restart or up
   */
  public sendNotification(bot: any, id_proceso:number, system: string, process: string) {
    this.users = this.sendNotificationModel.getUsers();
    
    this.users.then((IDs: Array<string>) => {
      IDs.pop();

      if (IDs.length > 0 && IDs != []) {
        IDs.forEach(id_user => {
          if (process == 'restart') {
            bot.sendMessage(id_user, "ID en BD: " + id_proceso + ". El sistema Zonal: " + system + " ha sufrido un reinicio anormal.");
            console.log(`Notificación enviada al ID: ${id_user} ---> ID en BD: ${id_proceso}. El sistema Zonal: ${system} ha sufrido un reinicio anormal.`);
          } else {
            bot.sendMessage(id_user, "ID en BD: " + id_proceso + ". El sistema Zonal: " + system + " ha subido.");
            console.log(`Notificación enviada al ID: ${id_user} ---> ID en BD: ${id_proceso}. El sistema Zonal: ${system} ha subido.`);
          }
        });
      } else {
        console.log("Sin IDs de usuarios. sendNotificationController.ts");
      }
    }, (error: any) => {
      console.log("Error in sendNotificationController.ts 35: ", error);
    });
  }
}
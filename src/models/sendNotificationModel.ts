/**
 * Class to get ID users form file text
 * @author Yerzin Perez
 * @version 1.0.0
 */
export class SendNotificationModel {
  //Attributes
  private fs = require('fs');
  private datos: Array<string>;

  /**
   * Method to read IDs from file text
   * @returns Promise with the users
   */
  public getUsers = () => {
    return new Promise((resolve, reject) => {
      this.fs.readFile('./src/files/users/users.txt', 'utf8', (error:any, data:any) => {
        if (error) {
          console.log(error);
          return reject(error);
        }
        
        this.datos = data.split("\n");
        return resolve(this.datos);
      });
    });
  }
}
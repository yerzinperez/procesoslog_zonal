
/**
 * Class to set connection to database
 */
export class Connection {
    //Attributes
    protected mssql = require('mssql');
    protected mssqlConnection: any;
    protected sqlConfig: object;
    private user: string = process.env.USER_DB;
    private password: string = process.env.PASSWORD_DB;
    private host: string = process.env.HOST_DB;
    private database: string = process.env.DATABASE_DB;
    protected result;

    /**
     * Constructor to set connection
     */
    constructor() {
        this.sqlConfig = {
            user: this.user,
            password: this.password,
            database: this.database,
            server: this.host,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                trustServerCertificate: true,
            }
        }
    }
}
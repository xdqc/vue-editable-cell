import mysql from "mysql";
import config from "./config.json";


export default callback => {
    let db = mysql.createPool({
        host     : config.database.host,
        port     : config.database.port,
        user     : config.database.user,
        password : config.database.pass,
        database : config.database.schema
      });
    callback(db)
}
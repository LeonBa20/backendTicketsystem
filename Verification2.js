import mysql from 'mysql';

export default class Verification2 {
  
    constructor() {}
  
    verificate(ticketid) {
      const connection = mysql.createConnection({
          host: 'bq3zrot8kwkjsoiu0e7z-postgresql.services.clever-cloud.com',
          user: 'u4bj5mr4jis06pbvlw5t',
          password: 'xJzpptRJm9iXMmmuQkzr',
          database: 'bq3zrot8kwkjsoiu0e7z',
          port: '5432'
        });
        let result;
        connection.query('SELECT ticketid FROM tickets WHERE ticketid = ' + ticketid, (error, results) => {
          result = results;
        });
        connection.end();
        return result;
    }
  } 
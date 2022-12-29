function verificate(ticketid) {
    const mysql = require('mysql2');
    const connection = mysql.createConnection({
        host: 'bq3zrot8kwkjsoiu0e7z-postgresql.services.clever-cloud.com',
        user: 'u4bj5mr4jis06pbvlw5t',
        password: 'xJzpptRJm9iXMmmuQkzr',
        database: 'bq3zrot8kwkjsoiu0e7z'
      });
      connection.query('SELECT ticketid FROM tickets WHERE ticketid = ' + ticketid + ';', (error, results) => {
        if (results = null) {
            return false;
        } else if (results != null) {
            return true;
        }
      });
      connection.end();
}
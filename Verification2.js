import * as pg from 'pg';
  
export default function verificate(ticketid) {
  const client = new pg.Client({
    host: 'bq3zrot8kwkjsoiu0e7z-postgresql.services.clever-cloud.com',
    port: '5432',
    user: 'u4bj5mr4jis06pbvlw5t',
    password: 'xJzpptRJm9iXMmmuQkzr',
    database: 'bq3zrot8kwkjsoiu0e7z'
  });

  client.connect();
        
  client.query('SELECT ticketid FROM tickets WHERE ticketid = ' + ticketid, (err, res) => {
    return res;
  });
}
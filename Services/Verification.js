import pkg from 'pg';
  
export default async function verificate(ticketid) {

  const client = new pkg.Client({
    host: 'bq3zrot8kwkjsoiu0e7z-postgresql.services.clever-cloud.com',
    port: '5432',
    user: 'u4bj5mr4jis06pbvlw5t',
    password: 'xJzpptRJm9iXMmmuQkzr',
    database: 'bq3zrot8kwkjsoiu0e7z'
  });

await client.connect();
  let ergebnis = false;
  const res = await client.query('SELECT ticketid FROM tickets WHERE ticketid =' + ticketid); //.catch((error)=>{console.log(error)}
  client.end();
  if (res.rows[0] != null) {
    ergebnis = true;      
  }
  return ergebnis;
}

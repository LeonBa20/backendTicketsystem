import pkg from "pg";

/* Default Methode, zur Kommunikation mit dem SQL Datenbankserver. Ausgabe der Methode ist ein Result Objekt 
   mit allen relevanten Informationen der SQL Abfrage. */ 
export default async function dbsql(sqlCommand) {
  const client = new pkg.Client({
    host: "bq3zrot8kwkjsoiu0e7z-postgresql.services.clever-cloud.com",
    port: "5432",
    user: "u4bj5mr4jis06pbvlw5t",
    password: "xJzpptRJm9iXMmmuQkzr",
    database: "bq3zrot8kwkjsoiu0e7z",
  });

  await client.connect();
  const res = await client.query(sqlCommand);
  client.end();
  return res;
}

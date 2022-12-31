//import pkg from 'pg';
import dbsql from "../Services/DatabaseSQL.js";
import { Ticket } from '../AllObjects/Ticket.js';
import { User } from '../AllObjects/User.js';

/*export default async function verificate(ticketid) {

  /*const client = new pkg.Client({
    host: 'bq3zrot8kwkjsoiu0e7z-postgresql.services.clever-cloud.com',
    port: '5432',
    user: 'u4bj5mr4jis06pbvlw5t',
    password: 'xJzpptRJm9iXMmmuQkzr',
    database: 'bq3zrot8kwkjsoiu0e7z'
  });

await client.connect();
  const res = await client.query('SELECT ticketid FROM tickets WHERE ticketid =' + ticketid); //.catch((error)=>{console.log(error)}
  client.end();
  //Prüfung, ob Ticket valide ist
  let ergebnis = false;
  const res = await dbsql('SELECT active FROM tickets WHERE ticketid = ' +ticketid);
  if (res.rows[0] != null) {
    ergebnis = res.rows[0].active;      
  }
  return ergebnis;
}

export async function getOwnerOfTicket(ticketid) {

}*/

export class Verification{

  constructor() {}

  async verificate(ticketid) {
    let ergebnis = false;
    const res = await dbsql('SELECT active FROM tickets WHERE ticketid = ' +ticketid);
    if (res.rows[0] != null) {
      ergebnis = res.rows[0].active;      
    }
    return ergebnis;
  }

  async getOwner(ticketid){
    const res = await dbsql('SELECT u.userid, u.firstname, u.lastname, u.birthdate FROM users u INNER JOIN tickets t ON u.userid = t.userid WHERE t.ticketid = ' +ticketid);
    if (res.rows[0] == null) {
      console.log("Nicht gefunden");
    } else {
      console.log(res.rows[0].firstname)
      
      let u = new User(res.rows[0].userid, res.rows[0].firstname, res.rows[0].lastname, res.rows[0].birthdate);
      console.log(u.userid, u.firstname, u.lastname, u.birthdate);
      //Not ready here
    }
  }
}
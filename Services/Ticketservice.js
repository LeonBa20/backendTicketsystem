import dbsql from "./DatabaseSQL.js";
import { Ticket } from '../AllObjects/Ticket.js';
import { User } from '../AllObjects/User.js';

export class Ticketservice{

  constructor() {}

  async verificate(ticketid) {
    const res = await dbsql('SELECT active FROM tickets WHERE ticketid = ' +ticketid);
    if (res.rows[0] != null) {
      let result = res.rows[0].active;
      return result      
    } else {
      throw new Error("Ticket not found");
    }
  }

  async getOwner(ticketid){
    const res = await dbsql('SELECT u.userid, u.firstname, u.lastname, u.birthdate FROM users u INNER JOIN tickets t ON u.userid = t.userid WHERE t.ticketid = ' +ticketid);
    if (res.rows[0] == null) {
      throw new Error("Ticket not found");
    } else {  
      let u = new User(res.rows[0].userid, res.rows[0].firstname, res.rows[0].lastname, res.rows[0].birthdate);
      return u; 
    }
  }

  async deactivateTicket(ticketid) {
    const res = await dbsql('UPDATE tickets SET active = false WHERE ticketid =' +ticketid);
    if (res.rowCount === 0) {
      throw new Error("Ticketid not found");
    } else if (res.rowCount > 1) {
      throw new Error("Several tickets changed!");
    } else {
      let result = "Ticket deactivated";
      return result;
    }
  }

  async activateTicket(ticketid) {
    const res = await dbsql('UPDATE tickets SET active = true WHERE ticketid =' +ticketid);
    if (res.rowCount === 0) {
      throw new Error('Ticketid not found');
    } else if (res.rowCount > 1) {
      throw new Error("Several tickets changed!");
    } else {
      let result = "Ticket activated";
      return result;
    }
  }
}
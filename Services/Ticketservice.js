import dbsql from "./DatabaseSQL.js";
import { Ticket } from '../AllObjects/Ticket.js';
import { User } from '../AllObjects/User.js';

export class Ticketservice{

  constructor() {}

  async createTicketTable() {
    await dbsql('CREATE TABLE tickets (ticket_id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users (user_id), event_name VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, ticket_details VARCHAR(255) NOT NULL, active BOOLEAN DEFAULT TRUE, redeem_days INTEGER, last_redeemed DATE)');
  }

  async exampleData() {
    await dbsql('INSERT INTO tickets (user_id, event_name, start_date, end_date, ticket_details, redeem_days) VALUES (1, "Skipass Oberwallis", "2022-11-01", "2023-04-30", "Saisonticket", 5), (1, "Skipass Wagrain", "2023-01-01", "2023-01-30", "Monatsticket, Januar"), (1, "Tomorrowland", "2023-07-15", "2023-07-17", "3-Tages-Ticket, VIP-Zugang"), (3, "Skipass Zermatt", "2023-02-01", "2023-04-01", "2-Monatsticket, Februar - März", 10), (3, "Rolling Loud", "2023-03-03", "2023-03-05", "3-Tages-Ticket, VIP-Zugang")');
  }

  async deleteTable() {
    await dbsql('DROP TABLE tickets');
  }

  async verificate(ticket_id) {
    const res = await dbsql('SELECT active FROM tickets WHERE ticket_id = ' +ticket_id);
    if (res.rows[0] != null) {
      let result = res.rows[0].active;
      return result      
    } else {
      throw new Error("Ticket not found");
    }
  }

  async getOwner(ticket_id){
    const res = await dbsql('SELECT u.user_id, u.first_name, u.last_name, u.birthdate FROM users u INNER JOIN tickets t ON u.user_id = t.user_id WHERE t.ticket_id = ' +ticket_id);
    if (res.rows[0] == null) {
      throw new Error("Ticket not found");
    } else {  
      let u = new User(res.rows[0].user_id, null, null, res.rows[0].first_name, res.rows[0].last_name, res.rows[0].birthdate, null, null);
      return u; 
    }
  }

  async deactivateTicket(ticket_id) {
    const res = await dbsql('UPDATE tickets SET active = false WHERE ticket_id =' +ticket_id);
    if (res.rowCount === 0) {
      throw new Error("Ticket_id not found");
    } else if (res.rowCount > 1) {
      throw new Error("Several tickets changed!");
    } else {
      let result = "Ticket deactivated";
      return result;
    }
  }

  async activateTicket(ticket_id) {
    const res = await dbsql('UPDATE tickets SET active = true WHERE ticket_id =' +ticket_id);
    if (res.rowCount === 0) {
      throw new Error('Ticket_id not found');
    } else if (res.rowCount > 1) {
      throw new Error("Several tickets changed!");
    } else {
      let result = "Ticket activated";
      return result;
    }
  }
}
import dbsql from "./DatabaseSQL.js";
import { Ticket } from '../AllObjects/Ticket.js';
import { User } from '../AllObjects/User.js';
import { Dateservice } from './Dateservice.js';

export class Ticketservice{

  constructor() {}

  async createTicketTable() {
    await dbsql('CREATE TABLE tickets (ticket_id SERIAL PRIMARY KEY, user_id INTEGER NOT NULL REFERENCES users (user_id), event_name VARCHAR(255) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL, ticket_details VARCHAR(255) NOT NULL, active BOOLEAN DEFAULT TRUE, redeem_days INTEGER, last_redeemed DATE)');
  }

  async exampleData() {
    await dbsql("INSERT INTO tickets (user_id, event_name, start_date, end_date, ticket_details, redeem_days) VALUES (1, 'Skipass Oberwallis', '2022-11-01', '2023-04-30', 'Saisonticket', 5), (1, 'Skipass Wagrain', '2023-01-01', '2023-01-30', 'Monatsticket, Januar', NULL), (1, 'Tomorrowland', '2023-07-15', '2023-07-17', '3-Tages-Ticket, VIP-Zugang', NULL), (3, 'Skipass Zermatt', '2023-02-01', '2023-04-01', '2-Monatsticket, Februar - März', 10), (3, 'Rolling Loud', '2023-03-03', '2023-03-05', '3-Tages-Ticket, VIP-Zugang', NULL)");
  }

  async deleteTable() {
    await dbsql('DROP TABLE tickets');
  }

  async verificate(ticket_id) {
    const res = await dbsql('SELECT * FROM tickets WHERE ticket_id = ' +ticket_id);
  
    //Prüfung, ob Ticket überhaupt vorhanden ist.
    if (res.rows[0] != null) {
      let redeemTest = true; 
      
      //Prüfung, ob die Einlösung sich im angegebenen Zeitraum befindet. Ist dies nicht der Fall, wird ein entsprechender Error herausgegeben.
      if (await this.isTicketDateValid(ticket_id) == true) {
        //Prüfung, ob es sich um ein tagesgebundendes Ticket handelt. Ist dies der Fall, wird die ensprechende Methode aufgerufen, die das verarbeitet.
        if (res.rows[0].redeem_days != null) {
        redeemTest = await this.redeemTicket(ticket_id);
        }
        //Die Einlösung war erfolgreich oder es handelt sich um kein tagesbasiertes Ticket. Nun wird der Status des Tickets zurückgegeben. Dieser kann
        //true oder false sein. Ist er false, bedeutet das, dass das Ticket deaktiviert vom Betreiber deaktiviert wurde.
        if (redeemTest === true) {
          let result = res.rows[0].active;
          return result;
        }
        //Die Einlösung ist fehlgeschlagen. Das bedeutet, dass das Ticket nicht mehr einsetzbar ist, da alle Tage verbaucht wurden. 
        if (redeemTest === false) {
          throw new Error("No more days for this event available");
        } 
      } else {
        throw new Error("Ticket is not valid today. Check date of ticket");
      }
    } else {
      throw new Error("Ticket not found");
    }
  }

  //Methode, welche die Einlösung von tagebasierten Tickets vornimmt. 
  async redeemTicket(ticket_id) {
    const res = await dbsql('SELECT * FROM tickets WHERE ticket_id = ' +ticket_id);
    
    //Formatierung der Daten (kalendarisch), um sie miteinander vergleichen zu können. Ist last_redeemed in der DB leer, wird es durch ein
    //altes unbedeutsames Datum ersetzt. Das passiert, wenn bspw. zu Beginn das Ticket noch nie aktiviert wurde (also noch nicht genutzt). 
    const ds = new Dateservice();
    const formattedCurrentDate = ds.getFormattedDate(new Date());
    let formattedTicketDate = '1900-01-01';
    if (res.rows[0].last_redeemed != null) {
      formattedTicketDate = ds.getFormattedDate(res.rows[0].last_redeemed);
    }

    //Prüfung, ob das Ticket überhaupt tagesgebunden ist (5 Tage nutzbar bspw.) und ob bzw wann es zuletzt aktiviert wurde. Dementsprechend
    //wird das jeweilige If aufgerufen. Es wird ein True zurückgegeben, wenn das tagesabhängige Ticket erfolgreich geprüft und angepasst wurde.
    //Ein False wird zurückgegeben, wenn die letzte Aktivierung in der Vergangenheit liegt und keine "redeem_days" mehr übrig sind.
    if (res.rows[0].redeem_days > 0 &&  formattedCurrentDate != formattedTicketDate) {
      dbsql(`UPDATE tickets SET redeem_days = redeem_days - 1 WHERE ticket_id = '${ticket_id}'`);
      dbsql(`UPDATE tickets SET last_redeemed = NOW() WHERE ticket_id = '${ticket_id}'`);
      return true;
    } else if (res.rows[0].redeem_days >= 0 &&  formattedCurrentDate == formattedTicketDate) {
      return true;
    } else if (res.rows[0].redeem_days == 0 &&  formattedCurrentDate != formattedTicketDate) {
      return false;
    }
  }

  //Methode, um zu prüfen, ob die Ticketeinlösung im angegebenen Gültigkeitszeitraum erfolgt.
  async isTicketDateValid(ticket_id) {
    const res = await dbsql('SELECT * FROM tickets WHERE ticket_id = ' +ticket_id);
    
    const ds = new Dateservice();
    const start_date = ds.getFormattedDate(res.rows[0].start_date);
    const end_date = ds.getFormattedDate(res.rows[0].end_date);
    const formattedCurrentDate = ds.getFormattedDate(new Date());

    if (ds.checkIfDateIsInRange(start_date, end_date, formattedCurrentDate) == true) {
      return true;
    } else {
      return false;
    }
  }

  async getOwner(ticket_id){
    const res = await dbsql('SELECT u.user_id, u.first_name, u.last_name, u.birthdate FROM users u INNER JOIN tickets t ON u.user_id = t.user_id WHERE t.ticket_id = ' +ticket_id);
    let ds = new Dateservice();
    if (res.rows[0] == null) {
      throw new Error("Ticket not found");
    } else {  
      let u = new User(res.rows[0].user_id, null, null, res.rows[0].first_name, res.rows[0].last_name, ds.getFormattedDate(res.rows[0].birthdate), null, null);
      return u; 
    }
  }

  async deactivateTicket(ticket_id) {
    const res = await dbsql('UPDATE tickets SET active = false WHERE ticket_id =' +ticket_id);
    if (res.rowCount === 0) {
      throw new Error("Ticket_id not found");
    }
  }

  async activateTicket(ticket_id) {
    const res = await dbsql('UPDATE tickets SET active = true WHERE ticket_id =' +ticket_id);
    if (res.rowCount === 0) {
      throw new Error("Ticket_id not found");
    }
  }

  async getAllTicketsOfUser(user_id) {
    const res = await dbsql('SELECT * FROM tickets WHERE user_id = ' + user_id);
    let ds = new Dateservice();
    if (res.rowCount === 0) {
      throw new Error("No Ticket found");
    } else {
      const ticketlist = [];
      for (const ticket of res.rows) {
        let t = new Ticket(ticket.ticket_id, ticket.user_id, ticket.event_name, ds.getFormattedDate(ticket.start_date), ds.getFormattedDate(ticket.end_date), ticket.ticket_details, ticket.active, ticket.redeem_days, ds.getFormattedDate(ticket.last_redeemed));
        ticketlist.push(t);
      }
      return ticketlist;
    }
  }
}
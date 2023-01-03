import dbsql from "./DatabaseSQL.js";
import { Ticket } from '../AllObjects/Ticket.js';
import { User } from '../AllObjects/User.js';

export class Ticketservice{
    constructor() {}

    async createUserTable() {
        await dbsql('CREATE TABLE users (user_id SERIAL PRIMARY KEY, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, first_name VARCHAR(255), last_name VARCHAR(255), birthdate DATE, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()');
      }
    
}
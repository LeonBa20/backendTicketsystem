import dbsql from "./DatabaseSQL.js";
import { Ticket } from '../AllObjects/Ticket.js';
import { User } from '../AllObjects/User.js';

export class Userservice{
    constructor() {}

    async createUserTable() {
        await dbsql('CREATE TABLE users (user_id SERIAL PRIMARY KEY, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, first_name VARCHAR(255), last_name VARCHAR(255), birthdate DATE, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW()');
      }

    async exampleData(){
     await dbsql('INSERT INTO users (password, email, first_name, last_name) VALUES ("password1", "max.mustermann@example.com", "Max", "Mustermann"), ("password2", "john.doe@example.com", "John", "Doe"), ("password3", "ellen.feuerstein@example.com", "Ellen", "Feuerstein"), ("password4", "lena.mueller@example.com", "Lena", "Müller"), ("password5", "katharina.musterfrau@example.com", "Katharina", "Musterfrau")');
    }

    async deleteTable() {
      await dbsql('DROP TABLE users');
    }
    
}
import dbsql from "./DatabaseSQL.js";
import { User } from "../AllObjects/User.js";
import { Dateservice } from "./Dateservice.js";

//Bereistellung der Methoden zur Verarbeitung der Anfragen bezüglich der Nutzerdaten.
export class Userservice {
  constructor() {}

  //Erstellung der DB Tabelle.
  async createUserTable() {
    await dbsql(
      "CREATE TABLE users (user_id SERIAL PRIMARY KEY, password VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, first_name VARCHAR(255), last_name VARCHAR(255), birthdate DATE, created_at TIMESTAMP DEFAULT NOW(), updated_at TIMESTAMP DEFAULT NOW(), loggedIn BOOLEAN DEFAULT false)"
    );
  }

  //Befüllung der DB Tabelle mit Testdaten.
  async exampleData() {
    await dbsql(
      "INSERT INTO users (password, email, first_name, last_name, birthdate) VALUES ('password1', 'max.mustermann@example.com', 'Max', 'Mustermann', '1980-01-01'), ('password2', 'john.doe@example.com', 'John', 'Doe', '1985-02-14'), ('password3', 'ellen.feuerstein@example.com', 'Ellen', 'Feuerstein', '1990-03-21'), ('password4', 'lena.mueller@example.com', 'Lena', 'Müller', '1995-04-28'), ('password5', 'katharina.musterfrau@example.com', 'Katharina', 'Musterfrau', '2000-05-05')"
    );
  }

  //Löschen der Tabelle.
  async deleteTable() {
    await dbsql("DROP TABLE users");
  }

  //Ausgabe des Besitzers eines Tickets.
  async getOwner(ticket_id) {
    const res = await dbsql(
      "SELECT u.user_id, u.first_name, u.last_name, u.birthdate FROM users u INNER JOIN tickets t ON u.user_id = t.user_id WHERE t.ticket_id = " +
        ticket_id
    );
    let ds = new Dateservice();
    if (res.rows[0] == null) {
      throw new Error("Ticket not found");
    } else {
      let u = new User(
        res.rows[0].user_id,
        null,
        null,
        res.rows[0].first_name,
        res.rows[0].last_name,
        ds.getFormattedDate(res.rows[0].birthdate),
        null,
        null
      );
      return u;
    }
  }

  //Ausgabe aller Nutzer der DB Tabelle (nur für die Entwicklung).
  async getAllUsersOfDB() {
    const res = await dbsql("SELECT * FROM users");
    let ds = new Dateservice();
    if (res.rowCount === 0) {
      throw new Error("No users found");
    } else {
      const userlist = [];
      for (const user of res.rows) {
        let u = new User(
          user.user_id,
          user.password,
          user.email,
          user.first_name,
          user.last_name,
          ds.getFormattedDate(user.birthdate),
          user.created_at,
          user.updated_at
        );
        userlist.push(u);
      }
      return userlist;
    }
  }

  //Registrierung eines Nutzers. Bei erfolgreicher Registrierung werden die User-Daten zurückgegeben, um sie im Frontend verwenden zu können.
  async register(user) {
    let res = await dbsql(
      `SELECT email FROM users WHERE email = '${user.email}'`
    );
    let ds = new Dateservice();

    if (res.rowCount === 0) {
      await dbsql(
        `INSERT INTO users (password, email, first_name, last_name, birthdate) VALUES ('${user.password}', '${user.email}', '${user.first_name}', '${user.last_name}', '${user.birthdate}')`
      );
      res = await dbsql(`SELECT * FROM users WHERE email = '${user.email}'`);
      let u = new User(
        res.rows[0].user_id,
        res.rows[0].password,
        res.rows[0].email,
        res.rows[0].first_name,
        res.rows[0].last_name,
        ds.getFormattedDate(res.rows[0].birthdate),
        res.rows[0].created_at,
        res.rows[0].updated_at
      );
      return u;
    } else {
      throw new Error("E-Mail already in use!");
    }
  }

  //Login eines Nutzers. Bei erfolgreichem Login werden die User-Daten zurückgegeben, um sie im Frontend verwenden zu können.
  async login(email, password) {
    let res = await dbsql(`SELECT * FROM users WHERE email = '${email}'`);
    let ds = new Dateservice();

    if (res.rows[0] != null) {
      if (res.rows[0].password === password) {
        await dbsql(
          `UPDATE users SET loggedin = true WHERE email = '${email}'`
        );
        let u = new User(
          res.rows[0].user_id,
          res.rows[0].password,
          res.rows[0].email,
          res.rows[0].first_name,
          res.rows[0].last_name,
          ds.getFormattedDate(res.rows[0].birthdate),
          res.rows[0].created_at,
          res.rows[0].updated_at
        );
        return u;
      } else {
        throw new Error("Wrong password.");
      }
    } else {
      throw new Error("E-Mail does not exist!");
    }
  }

  //Ausloggen des Nutzers.
  async logout(email) {
    let res = await dbsql(
      `SELECT email, loggedin FROM users WHERE email = '${email}'`
    );

    if (res.rows[0] != null) {
      if (res.rows[0].loggedin === true) {
        await dbsql(
          `UPDATE users SET loggedin = false WHERE email = '${email}'`
        );
      } else {
        throw new Error("User is not logged in.");
      }
    } else {
      throw new Error("E-Mail does not exist!");
    }
  }

  //Löschen eines Nutzers.
  async deleteUser(email) {
    let res = await dbsql(
      `SELECT email, loggedin FROM users WHERE email = '${email}'`
    );

    if (res.rows[0] != null) {
      if (res.rows[0].loggedin === true) {
        await dbsql(`DELETE FROM users WHERE email = '${email}'`);
      } else {
        throw new Error("User is not logged in.");
      }
    } else {
      throw new Error("E-Mail does not exist!");
    }
  }
}

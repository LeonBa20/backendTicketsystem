//In der server.js werden alle REST-Anfragen entgegengenommen und mithilfe der Service und Objekt-Klassen verarbeitet.
import { Ticketservice } from "./Services/Ticketservice.js";
import { Userservice } from "./Services/Userservice.js";
import { User } from "./AllObjects/User.js";
import express from "express";
import cors from "cors";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { Ticket } from "./AllObjects/Ticket.js";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.options("", (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Length, X-Requested-With"
  );
  res.sendStatus(200);
});

app.use(express.json());

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Ticketservice API",
      version: "1.0.0",
    },
  },
  apis: ["server.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

//Befehle zur Verwaltung der Ticket-Tabellen sowie Befüllung mit Testdaten. Nur für die Entwicklung!
/**
 * @swagger
 * /api/ticket/createTable:
 *   post:
 *     summary: Creates the table for the tickets in the database.
 *     description: Only for dev.
 *     responses:
 *       200:
 *         description: Success
 */
app.post("/api/ticket/createTable", async (req, res) => {
  let ts = new Ticketservice();
  await ts.createTicketTable();
  res.sendStatus(201);
});

/**
 * @swagger
 * /api/ticket/addExamples:
 *   post:
 *     summary: Adds the example data to the ticket table in the database.
 *     description: Only for dev.
 *     responses:
 *       200:
 *         description: Success
 */
app.post("/api/ticket/addExamples", async (req, res) => {
  let ts = new Ticketservice();
  await ts.exampleData();
  res.sendStatus(200);
});

/**
 * @swagger
 * /api/ticket/deleteTable:
 *   delete:
 *     summary: Deletes the ticket table in the database.
 *     description: Only for dev.
 *     responses:
 *       200:
 *         description: Success
 */
app.delete("/api/ticket/deleteTable", async (req, res) => {
  let ts = new Ticketservice();
  await ts.deleteTable();
  res.sendStatus(200);
});

//Folgende Befehle sind zur Verwaltung der User-Tabellen sowie Befüllung mit Testdaten. Nur für die Entwicklung!
/**
 * @swagger
 * /api/user/createTable:
 *   post:
 *     summary: Creates a table for the users in the database.
 *     description: Only for dev.
 *     responses:
 *       200:
 *         description: Success
 */
app.post("/api/user/createTable", async (req, res) => {
  let us = new Userservice();
  await us.createUserTable();
  res.sendStatus(201);
});

/**
 * @swagger
 * /api/user/addExamples:
 *   post:
 *     summary: Adds example data to the user table in the database.
 *     description: Only for dev.
 *     responses:
 *       200:
 *         description: Success
 */
app.post("/api/user/addExamples", async (req, res) => {
  let us = new Userservice();
  await us.exampleData();
  res.sendStatus(200);
});

/**
 * @swagger
 * /api/user/deleteTable:
 *   delete:
 *     summary: Deletes the users table in the database.
 *     description: Only for dev.
 *     responses:
 *       200:
 *         description: Success
 */
app.delete("/api/user/deleteTable", async (req, res) => {
  let us = new Userservice();
  await us.deleteTable();
  res.sendStatus(200);
});

//Befehle zur Verwaltung aller Tabellen. Nur für die Entwicklung!
/**
 * @swagger
 * /api/createAllTables:
 *   post:
 *     summary: Creates all tables for the backend and adds example data.
 *     description: Only for dev.
 *     responses:
 *       200:
 *         description: Success
 */
app.post("/api/createAllTables", async (req, res) => {
  let ts = new Ticketservice();
  let us = new Userservice();
  await us.createUserTable();
  await ts.createTicketTable();
  await us.exampleData();
  await ts.exampleData();
  res.sendStatus(201);
});

/**
 * @swagger
 * /api/resetAllTables:
 *   post:
 *     summary: Clears the data in the tables and deletes them. Afterwards the new tables with their example data will be created.
 *     description: Only for dev.
 *     responses:
 *       200:
 *         description: Success
 */
app.post("/api/resetAllTables", async (req, res) => {
  let ts = new Ticketservice();
  let us = new Userservice();
  await ts.deleteTable();
  await us.deleteTable();
  await us.createUserTable();
  await ts.createTicketTable();
  await us.exampleData();
  await ts.exampleData();
  res.sendStatus(201);
});

/**
 * @swagger
 *  /api/showTables:
 *    get:
 *       summary: Returns all data of the tables.
 *       description: Only for dev.
 *       responses:
 *         200:
 *           description: Array of all tickets and users.
 *           schema:
 *             type: object
 *             properties:
 *                 ticketlist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ticketId:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       eventName:
 *                         type: string
 *                         example: "Skipass Oberwallis"
 *                       startDate:
 *                         type: date
 *                         example: "2022-10-31T23:00:00.000Z"
 *                       endDate:
 *                         type: date
 *                         example: "2023-04-29T22:00:00.000Z"
 *                       ticketDetails:
 *                         type: string
 *                         example: "Saisonticket"
 *                       active:
 *                         type: boolean
 *                         example: true
 *                       redeemDays:
 *                         type: integer
 *                         example: 2
 *                       lastRedeemed:
 *                         type: date
 *                         example: "2023-01-14T23:00:00.000Z"
 *                 userlist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       user_id:
 *                         type: integer
 *                         example: 1
 *                       userId:
 *                         type: integer
 *                         example: 1
 *                       eventName:
 *                         type: string
 *                         example: "Skipass Oberwallis"
 *                       startDate:
 *                         type: date
 *                         example: "2022-10-31T23:00:00.000Z"
 *                       endDate:
 *                         type: date
 *                         example: "2023-04-29T22:00:00.000Z"
 *                       ticketDetails:
 *                         type: string
 *                         example: "Saisonticket"
 *                       active:
 *                         type: boolean
 *                         example: true
 *                       redeemDays:
 *                         type: integer
 *                         example: 2
 *                       lastRedeemed:
 *                         type: date
 *                         example: "2023-01-14T23:00:00.000Z"
 *         400:
 *           description: No tickets found.
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: string
 *                 example: "No Tickets found"
 */
//Ausgabe aller Daten der DB in Arrays. 
app.get("/api/showTables", async (req, res) => {
  let ts = new Ticketservice();
  let us = new Userservice();
  try {
    let ticketlist = await ts.getAllTicketsOfDB();
    let userlist = await us.getAllUsersOfDB();
    res.json({ ticketlist, userlist });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

//Endpoints für alle Anfragen zu Tickets.
/**
 * @swagger
 *  /api/ticket/status/{id}:
 *    get:
 *       summary: Checks if the ticket is valid.
 *       description: If the ticket is valid, the ticket information is returned. In case it is a ticket with day-based redemption, this will be taken into account accordingly.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           type: integer
 *           minimum: 1
 *           description: The ID of the ticket to be validated.
 *       responses:
 *         200:
 *           description: JSON with all relevant information.
 *           schema:
 *             type: object
 *             properties:
 *               ticket_id:
 *                 type: integer
 *                 example: 1
 *               active:
 *                 type: boolean
 *                 example: true
 *               Owner:
 *                 type: object
 *                 properties:
 *                   user_id:
 *                     type: integer
 *                     example: 1
 *                   first_name:
 *                     type: string
 *                     example: "Max"
 *                   last_name:
 *                     type: string
 *                     example: "Mustermann"
 *                   birthdate:
 *                     type: date
 *                     example: "1988-01-01"
 *         400:
 *           description: There is a problem with the ticket.
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: string
 *                 example: ["No more days for this event available", "Ticket is not valid today. Check date of ticket", "Ticket not found"]
 */
//Prüfung der Gültigkeit eines Tickets. Handelt es sich um ein Ticket mit tagesbasierter Einlösung, wird dies dementsprechend berücksichtigt.
app.get("/api/ticket/status/:id", async (req, res) => {
  let ts = new Ticketservice();
  let us = new Userservice();
  try {
    let result = await ts.verificate(req.params.id);
    let owner = await us.getOwner(req.params.id);
    res.json({
      ticket_id: req.params.id,
      active: result,
      Owner: {
        user_id: owner.user_id,
        first_name: owner.first_name,
        last_name: owner.last_name,
        birthdate: owner.birthdate,
      },
    });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

/**
 * @swagger
 *  /api/ticket/deactivate/{id}:
 *    post:
 *       summary: Deactivates a ticket.
 *       description: Tickets can be deactivated. This can happen, for example, if the owner has behaved badly at the event.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           type: integer
 *           minimum: 1
 *           description: The ID of the ticket to be deactivated.
 *       responses:
 *         200:
 *           description: Ticket is deactivated.
 *         400:
 *           description: Ticket could not be deactivated.
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: string
 *                 example: "Ticket_id not found"
 */
//Deaktivierung eines Tickets
app.post("/api/ticket/deactivate/:id", async (req, res) => {
  let ts = new Ticketservice();
  try {
    await ts.deactivateTicket(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

/**
 * @swagger
 *  /api/ticket/activate/{id}:
 *    post:
 *       summary: Activates a ticket.
 *       description: Tickets can be activated after they are deactivated.
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           type: integer
 *           minimum: 1
 *           description: The ID of the ticket to be activated.
 *       responses:
 *         200:
 *           description: Ticket is activated.
 *         400:
 *           description: Ticket could not be activated.
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: string
 *                 example: "Ticket_id not found"
 */
//Aktivierung eines Tickets
app.post("/api/ticket/activate/:id", async (req, res) => {
  let ts = new Ticketservice();
  try {
    await ts.activateTicket(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

/**
 * @swagger
 *  /api/ticket/add:
 *    post:
 *       summary: Add a new ticket to a user.
 *       parameters:
 *         - in: body
 *           name: ticketDetails
 *           description: The user registration details
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - event_name
 *               - start_date
 *               - end_date
 *               - ticket_details
 *               - redeem_days
 *             properties:
 *               user_id:
 *                 type: int
 *                 description: The user's id
 *                 example: "4"
 *               event_name:
 *                 type: string
 *                 description: The name of the event
 *                 example: "Skipass Oberwallis"
 *               start_date:
 *                 type: date
 *                 description: The beginning of a time period to redeem the ticket. Start and end can be on the same day.
 *                 example: "2023-02-01"
 *               end_date:
 *                 type: date
 *                 description: The end of a time period to redeem a ticket.
 *                 example: "2023-02-06"
 *               ticket_details:
 *                 type: string
 *                 description: Details of a ticket like class.
 *                 example: "Preferential ticket"
 *               redeem_days:
 *                 type: int
 *                 description: Enter a value if the ticket is day-dependent. If not, do not fill in.
 *                 example: 2
 *       responses:
 *         200:
 *           description: Ticket added.
 *         400:
 *           description: There was an error.
 */
//Kauf eines neuen Tickets
app.post("/api/ticket/add", async (req, res) => {
  let ts = new Ticketservice();
  if (req.body.event_name == null) {
    res.json({
      user_id: "fill in",
      event_name: "fill in",
      start_date: "YEAR-MONTH-DAY",
      end_date: "YEAR-MONTH-DAY",
      ticket_details: "fill in",
      redeem_days: "if day-based, fill in"
    });
  } else {
    //Prüfung, ob es sich um ein tagesgebundenes Ticket handelt. Ist dies nicht der Fall, wird der redeem_days Wert auf null gesetzt.
    let days;
    if (req.body.redeem_days == null) { 
      days = null;
    } else {
      days = req.body.redeem_days;
    }
    let ticket = new Ticket(
      null,
      req.body.user_id,
      req.body.event_name,
      req.body.start_date,
      req.body.end_date,
      req.body.ticket_details,
      null,
      days, 
      null
    );
    try {
      ts.addTicket(ticket);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
});

/**
 * @swagger
 *  /api/ticket/allOfUser/{userid}:
 *    get:
 *       summary: Returns all tickets of a user.
 *       description: All tickets of a user are returned in an array.
 *       parameters:
 *         - in: path
 *           name: userid
 *           required: true
 *           type: integer
 *           minimum: 1
 *           description: The ID of the user.
 *       responses:
 *         200:
 *           description: Array of the user's tickets.
 *           schema:
 *             type: object
 *             properties:
 *                 ticketlist:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ticketId:
 *                         type: integer
 *                       userId:
 *                         type: integer
 *                       eventName:
 *                         type: string
 *                       startDate:
 *                         type: date
 *                       endDate:
 *                         type: date
 *                       ticketDetails:
 *                         type: string
 *                       active:
 *                         type: boolean
 *                       redeemDays:
 *                         type: integer
 *                       lastRedeemed:
 *                         type: date
 *                     example:
 *                         ticketId: 1
 *                         userId: 1
 *                         eventName: "Skipass Oberwallis"
 *                         startDate: "2022-10-31T23:00:00.000Z"
 *                         endDate: "2023-04-29T22:00:00.000Z"
 *                         ticketDetails: "Saisonticket"
 *                         active: true
 *                         redeemDays: 2
 *                         lastRedeemed: "2023-01-14T23:00:00.000Z"
 *         400:
 *           description: No tickets found.
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: string
 *                 example: "No Ticket found"
 */
//Ausgabe aller Tickets eines Nutzers
app.get("/api/ticket/allOfUser/:userid", async (req, res) => {
  let ts = new Ticketservice();
  try {
    let ticketlist = await ts.getAllTicketsOfUser(req.params.userid);
    res.json({ ticketlist });
  } catch (error) {
    res.status(400).json({ Error: error.message });
  }
});

/**
 * @swagger
 *  /api/user/register:
 *    post:
 *       summary: Registration of a user.
 *       description: E-Mail address has to be unique.
 *       parameters:
 *         - in: body
 *           name: registrationDetails
 *           description: The user registration details
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *               - birthdate
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: "max.mustermann@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "password1"
 *               first_name:
 *                 type: string
 *                 description: The user's first name
 *                 example: "Max"
 *               last_name:
 *                 type: string
 *                 description: The user's last name
 *                 example: "Mustermann"
 *               birthdate:
 *                 type: date
 *                 description: The user's birthdate
 *                 example: "1995-01-01"
 *       responses:
 *         200:
 *           description: Account created.
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: "1"
 *               email:
 *                 type: string
 *                 example: "max.mustermann@example.com"
 *               first_name:
 *                 type: string
 *                 example: "Max"
 *               last_name:
 *                 type: string
 *                 example: "Mustermann"
 *               birthdate:
 *                 type: date
 *                 example: "1980-01-01"
 *         400:
 *           description: E-Mail can't be used.
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: string
 *                 example: "E-Mail already in use!"
 */
//Registrierung eines Nutzers
app.post("/api/user/register", async (req, res) => {
  let us = new Userservice();
  if (req.body.email == null) {
    res.json({
      email: "fill in",
      password: "fill in",
      first_name: "fill in",
      last_name: "fill in",
      birthdate: "YEAR-MONTH-DAY"
    });
  } else {
    let user = new User(
      null,
      req.body.password,
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.birthdate,
      null,
      null
    );
    try {
      let registeredUser = await us.register(user);
      res.json({
        user_id: registeredUser.user_id,
        email: registeredUser.email,
        first_name: registeredUser.first_name,
        last_name: registeredUser.last_name,
        birthdate: registeredUser.birthdate,
      });
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
});

/**
 * @swagger
 *  /api/user/login:
 *    patch:
 *       summary: Login of a user.
 *       description: Combination of email and password must be correct.
 *       parameters:
 *         - in: body
 *           name: loginDetails
 *           description: The user's credentials
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: "max.mustermann@example.com"
 *               password:
 *                 type: string
 *                 description: The user's password
 *                 example: "password1"
 *       responses:
 *         200:
 *           description: User logged in.
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: integer
 *                 example: "1"
 *               email:
 *                 type: string
 *                 example: "max.mustermann@example.com"
 *               first_name:
 *                 type: string
 *                 example: "Max"
 *               last_name:
 *                 type: string
 *                 example: "Mustermann"
 *               birthdate:
 *                 type: date
 *                 example: "1980-01-01"
 *         400:
 *           description: Wrong password or email.
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: string
 *                 example: ["Wrong password.", "E-Mail does not exist!"]
 */
//Login des Nutzers
app.patch("/api/user/login", async (req, res) => {
  let us = new Userservice();
  if (req.body.email == null) {
    res.json({
      email: "fill in",
      password: "fill in",
    });
  } else {
    try {
      let user = await us.login(req.body.email, req.body.password);
      res.json({
        user_id: user.user_id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        birthdate: user.birthdate,
      });
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
});

/**
 * @swagger
 *  /api/user/logout:
 *    patch:
 *       summary: Logout of a user.
 *       parameters:
 *         - in: body
 *           name: logoutDetails
 *           description: The user's email
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: "max.mustermann@example.com"
 *       responses:
 *         200:
 *           description: User logged out.
 *         400:
 *           description: User not logged in or does not exist.
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: string
 *                 example: ["User is not logged in.", "E-Mail does not exist!"]
 */
//Logout des Nutzers
app.patch("/api/user/logout", async (req, res) => {
  let us = new Userservice();
  if (req.body.email == null) {
    res.json({
      email: "fill in",
    });
  } else {
    try {
      await us.logout(req.body.email);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
});

/**
 * @swagger
 *  /api/user/delete:
 *    delete:
 *       summary: Deletion of the user.
 *       parameters:
 *         - in: body
 *           name: deletionDetails
 *           description: The user's email
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email
 *                 example: "max.mustermann@example.com"
 *       responses:
 *         200:
 *           description: User deleted.
 *         400:
 *           description: User not logged in or does not exist.
 *           schema:
 *             type: object
 *             properties:
 *               Error:
 *                 type: string
 *                 example: ["User is not logged in.", "E-Mail does not exist!"]
 */
//Löschen des Nutzers
app.delete("/api/user/delete", async (req, res) => {
  let us = new Userservice();

  if (req.body.email == null) {
    res.json({
      email: "fill in",
    });
  } else {
    try {
      await us.deleteUser(req.body.email);
      res.sendStatus(200);
    } catch (error) {
      res.status(400).json({ Error: error.message });
    }
  }
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

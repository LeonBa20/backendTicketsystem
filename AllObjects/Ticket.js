export class Ticket {
    constructor(ticketid, userid, eventname, ticketinfo, ticketdate, active) {
      this._ticketid = ticketid;
      this._userid = userid;
      this._eventname = eventname;
      this._ticketinfo = ticketinfo;
      this._ticketdate = ticketdate;
      this._active = active;
    }
  
    // Getter-Methoden
    get ticketid() {
      return this._ticketid;
    }
  
    get userid() {
      return this._userid;
    }
  
    get eventname() {
      return this._eventname;
    }
  
    get ticketinfo() {
      return this._ticketinfo;
    }
  
    get ticketdate() {
      return this._ticketdate;
    }
  
    get active() {
      return this._active;
    }
  
    // Setter-Methoden
    set ticketid(value) {
      this._ticketid = value;
    }
  
    set userid(value) {
      this._userid = value;
    }
  
    set eventname(value) {
      this._eventname = value;
    }
  
    set ticketinfo(value) {
      this._ticketinfo = value;
    }
  
    set ticketdate(value) {
      this._ticketdate = value;
    }
  
    set active(value) {
      this._active = value;
    }
  }
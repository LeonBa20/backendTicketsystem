export class User {
    constructor(userid, firstname, lastname, birthdate) {
      this._userid = userid;
      this._firstname = firstname;
      this._lastname = lastname;
      this._birthdate = birthdate;
    }
  
    get userid() {
      return this._userid;
    }
  
    set userid(value) {
      this._userid = value;
    }
  
    get firstname() {
      return this._firstname;
    }
  
    set firstname(value) {
      this._firstname = value;
    }
  
    get lastname() {
      return this._lastname;
    }
  
    set lastname(value) {
      this._lastname = value;
    }
  
    get birthdate() {
      return this._birthdate;
    }
  
    set birthdate(value) {
      this._birthdate = value;
    }
  }
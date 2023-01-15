export class User {
  constructor(
    user_id,
    password,
    email,
    first_name,
    last_name,
    birthdate,
    created_at,
    updated_at
  ) {
    this._user_id = user_id;
    this._password = password;
    this._email = email;
    this._first_name = first_name;
    this._last_name = last_name;
    this._birthdate = birthdate;
    this._created_at = created_at;
    this._updated_at = updated_at;
  }

  get user_id() {
    return this._user_id;
  }

  get password() {
    return this._password;
  }

  get email() {
    return this._email;
  }

  get first_name() {
    return this._first_name;
  }

  get last_name() {
    return this._last_name;
  }

  get birthdate() {
    return this._birthdate;
  }

  get created_at() {
    return this._created_at;
  }

  get updated_at() {
    return this._updated_at;
  }

  set password(password) {
    this._password = password;
  }

  set email(email) {
    this._email = email;
  }

  set first_name(first_name) {
    this._first_name = first_name;
  }

  set last_name(last_name) {
    this._last_name = last_name;
  }

  set birthdate(birthdate) {
    this._birthdate = birthdate;
  }

  set created_at(created_at) {
    this._created_at = created_at;
  }

  set updated_at(updated_at) {
    this._updated_at = updated_at;
  }
}

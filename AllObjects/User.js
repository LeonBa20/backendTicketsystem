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
    this.user_id = user_id;
    this.password = password;
    this.email = email;
    this.first_name = first_name;
    this.last_name = last_name;
    this.birthdate = birthdate;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  getUser_id() {
    return this.user_id;
  }

  getPassword() {
    return this.password;
  }

  getEmail() {
    return this.email;
  }

  getFirst_name() {
    return this.first_name;
  }

  getLast_name() {
    return this.last_name;
  }

  getBirthdate() {
    return this.birthdate;
  }

  getCreated_at() {
    return this.created_at;
  }

  getUpdated_at() {
    return this.updated_at;
  }

  setPassword(password) {
    this.password = password;
  }

  setEmail(email) {
    this.email = email;
  }

  setFirst_name(first_name) {
    this.first_name = first_name;
  }

  setLast_name(last_name) {
    this.last_name = last_name;
  }

  setBirthdate(birthdate) {
    this.birthdate = birthdate;
  }

  setCreated_at(created_at) {
    this.created_at = created_at;
  }

  setUpdated_at(updated_at) {
    this.updated_at = updated_at;
  }
}

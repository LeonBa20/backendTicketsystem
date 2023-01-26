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

}

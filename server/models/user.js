/**
 *a class for creating an object to store user registration information
 */
class User {
  constructor(firstname, lastname, username, email, password) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.username = username;
    this.email = email;
    this.password = password;
  }
}

export default User;

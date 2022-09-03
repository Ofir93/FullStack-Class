//1

function House() {}

function Housing() {}

House.prototype.wallStrength = function (sircumflex, size) {
  let x = this.size * 2
  let y = this.sircumflex / 2
  if (this.sircumflex > x && this.size > y) {
    return console.log(`wall strength needs to be ${(x + y) / 5}`)
  } else {
    return console.log('wall strength is ok')
  }
}

Housing.prototype.numberOfAtendents = function () {
  let x = 5
  let y = 4
  if (this.sircumflex > x && this.size > y) {
    return 100
  } else {
    return 10
  }
}

function Shelter(location, size, sircumflex) {
  this.location = location
  this.size = size
  this.sircumflex = sircumflex
}

Object.assign(Shelter.prototype, Housing.prototype, House.prototype)

const shelter = new Shelter('Geva Carmel', 100, 50)

console.log('1 ----------------------------------------------');
console.log(shelter)
shelter.wallStrength()
console.log(shelter.numberOfAtendents());
//////////////////////////////////////////////////

//2
console.log('2+3 ----------------------------------------------');

class User {
  constructor(email, name) {
    this.email = email
    this.name = name
    this.online = false
    //3
    this.instanceLogin = () => {}
  }
  login() {
    this.online = true
    console.log(`${this.email} has logged in`)
  }

  logout() {
    this.online = false
    console.log(`${this.email} has logged out`)
  }
}
const user = new User('gmail@gmail.com', 'Ofir')
console.log(user)

//4

class Admin extends User {
  constructor(role, email, name) {
    super(email, name)
    this.role = role
  }
  deleteUser() {}
  //5
  login() {
    this.online = true
    console.log(`role: ${this.role}, email: ${this.email} has logged in`)
  }
}

const admin = new Admin('Super - Admin', 'a@gmail.com', 'OfirAdmin')
console.log('4+5 ----------------------------------------------');

console.log(admin)
admin.login()
////////////////

//6 
console.log('6 ----------------------------------------------');

const user2 = new User('user2@gmail.com', 'use2')

const users = [user, user2, admin]
  
  for (const user of users) {
    user.login()
  }

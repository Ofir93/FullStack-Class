//11
function User(email, name) {
  this.email = email
  this.name = name
  this.online = false
}

User.prototype.login = function () {
  this.online = true
  console.log(`${this.name} has logged in`)
}

User.prototype.logout = function () {
  this.online = false
  console.log(`${this.name} has logged out`)
}

function Admin(email, name, role) {
  this.role = role
  User.apply(this, [email, name])
}
Admin.prototype = Object.create(User.prototype)
Admin.prototype.deleteUser = function () {}

/////////////////////////////////////////////////
//12
const admin1 = new Admin('admin@gmail.com', 'admin name', 'admin')

admin1.login = function () {
  this.online = true
  console.log(`name: ${this.name} role: ${this.role}, has logged in`)
}
admin1.login()

//////////////////////////////////////////////
//13
const user1 = new User('test1@gmail.com', 'test user1')
const user2 = new User('test2@gmail.com', 'user test2')
const admin = new Admin('admin@gmail.com', 'admin name', 'admin')

const users = [user1, user2, admin]

for (const user of users) {
    user.login()
}
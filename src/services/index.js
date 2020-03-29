const users = require('./users/users.service.js')
const articles = require('./articles/articles.service.js');
const contact = require('./contact/contact.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users)
  app.configure(articles);
  app.configure(contact);
}

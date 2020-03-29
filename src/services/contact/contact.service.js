// Initializes the `contact` service on path `/contact`
const { Contact } = require('./contact.class');
const hooks = require('./contact.hooks');

module.exports = function (app) {
  // Initialize our service with any options it requires
  app.use('/contact', new Contact());

  // Get our initialized service so that we can register hooks
  const service = app.service('contact');

  service.hooks(hooks);
};

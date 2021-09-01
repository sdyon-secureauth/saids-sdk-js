const { User } = require('./User');

class Models {
    constructor() {
        this.user = new User();
    }

}

module.exports = {
    Models: Models
  }
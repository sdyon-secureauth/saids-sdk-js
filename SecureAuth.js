const  { ApiClient, apiEndpointEnum } = require('./ApiClient');

const { UserEndpoint } = require('./User/User');
const { Models } = require('./Models/Models');

class SecureAuth  {
    // constructor for the SecureAuth class
    constructor() {
        this.user = new UserEndpoint(ApiClient, apiEndpointEnum);
        this.models = new Models();
    }
}

//export SecureAuth object
module.exports = {
    SecureAuth: SecureAuth
};
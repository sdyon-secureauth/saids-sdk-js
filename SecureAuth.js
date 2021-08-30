const  { ApiClient, apiEndpointEnum } = require('./ApiClient');

const { UserEndpoint } = require('./User/User');

class SecureAuth  {
    // constructor for the SecureAuth class
    constructor() {
        this.user = new UserEndpoint(ApiClient, apiEndpointEnum);
    }
}

//export SecureAuth object
module.exports = {
    SecureAuth: SecureAuth
};
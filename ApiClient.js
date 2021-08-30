const axios = require('axios');
require('dotenv').config();
const https = require('https');

const apiEndpointEnum = { users: '/api/v1/scim/ids/'+process.env.APP_IDS_STORE+'/v2/Users' }
Object.freeze(apiEndpointEnum)


class Configuration {
    constructor() {
        this.appHost = process.env.appHost;
        this.appPort = process.env.appPort;
        this.applianceSSL = (process.env.appSSL === 'true');
        this.selfSigned = (process.env.selfSigned === 'true');
        this.appID = process.env.APP_API_ID;
        this.appSecret = process.env.APP_API_SECRET;
        this.appIDS = process.env.APP_IDS_STORE;
        this.debug = (process.env.debug === 'true');
    }
}


class IDSService {
    constructor() { }
    
    getHeaders = async () => {
        this.config = new Configuration();
        // creds are of the user (api details)
        let options = {
        // {{tenant}}/api/v1/privy/ids/{{ids_id}}/g3/token
        url: 'https://'+this.config.appHost+'/api/v1/privy/ids/default/g3/token',
        method: 'post',
        auth: {
            username: this.config.appID,
            password: this.config.appSecret,
        }
        };

        const resp = await axios(options);
        this.token = resp.data.access_token;

        return { 'Authorization': 'Bearer ' +this.token,
            'Content-Type': 'application/json' }
    }
}

class ApiClient {

    constructor() {
        this.config = new Configuration();

        this.agent = new https.Agent({  
            rejectUnauthorized: false
           });

        let url = {};

        if(this.config.applianceSSL === true) {
            url = 'https://' + this.config.appHost
        } else {
            url = 'http://' + this.config.appHost
        }

        if(this.config.selfSigned === true) { 
            this.instance = axios.create({
                baseURL: url,
                httpsAgent: this.agent
              });
        } else { 
            this.instance = axios.create({
                baseURL: url
              });
        }
    }
    
    get = async (endpointEnum) => {

        let url = endpointEnum;
        let idsService = new IDSService();
        let headers = await idsService.getHeaders();

        let jsonResponse = {};

        await this.instance.get(url, { headers: headers }).then(response => {
        if(this.config.debug === true) { console.log(response.data); }
        jsonResponse = response.data;
        })
        .catch(error => {
        console.log(error.response.data);
        jsonResponse = error.response.data;
        });
        
        return jsonResponse;
    }

    getWithParams = async (endpointEnum, parameters) => {

        let url = endpointEnum;
        let idsService = new IDSService();
        let headers = await idsService.getHeaders();

        let jsonResponse = {};

        await this.instance.get(url, { headers: headers, params: parameters }).then(response => {
        if(this.config.debug === true) { console.log(response.data); }
        jsonResponse = response.data;
        })
        .catch(error => {
            console.log(error.response.data);
            jsonResponse = error.response.data;
        });
        
        return jsonResponse;
    }

    post = async (postData, endpointEnum) => {

        let url = endpointEnum;
        let idsService = new IDSService();
        let headers = await idsService.getHeaders();

        let jsonResponse = {};

        await this.instance.post(url, postData, { headers: headers }).then(response => {
            if(this.config.debug === true) { console.log(response.data); }
            jsonResponse = response.data;
        })
        .catch(error => {
            console.log(error.response.data);
            jsonResponse = error.response.data;
        });

        return jsonResponse;
    }

    put = async (apiEndPoint, endpointEnum) => {
        let url = endpointEnum;
        let idsService = new IDSService();
        let headers = await idsService.getHeaders();

        let jsonResponse = {};

        await this.instance.put(url, postData, { headers: headers }).then(response => {
            if(this.config.debug === true) { console.log(response.data); }
            jsonResponse = response.data;
        })
        .catch(error => {
            console.log(error.response.data);
            jsonResponse = error.response.data;
        });

        return jsonResponse;
    }

    patch = async (apiEndPoint, endpointEnum) => {
        let url = endpointEnum;
        let idsService = new IDSService();
        let headers = await idsService.getHeaders();

        let jsonResponse = {};

        await this.instance.patch(url, postData, { headers: headers }).then(response => {
            if(this.config.debug === true) { console.log(response.data); }
            jsonResponse = response.data;
        })
        .catch(error => {
            console.log(error.response.data);
            jsonResponse = error.response.data;
        });

        return jsonResponse;
    }

    delete = async (apiEndPoint, endpointEnum) => {
        let url = endpointEnum;
        let idsService = new IDSService();
        let headers = await idsService.getHeaders();

        let jsonResponse = {};

        await this.instance.delete(url, { headers: headers }).then(response => {
            if(this.config.debug === true) { console.log(response.data); }
            jsonResponse = response.data;
        })
        .catch(error => {
            console.log(error.response.data);
            jsonResponse = error.response.data;
        });

        return jsonResponse;
    }

}


module.exports = {
    apiEndpointEnum: apiEndpointEnum,
    ApiClient: ApiClient
}
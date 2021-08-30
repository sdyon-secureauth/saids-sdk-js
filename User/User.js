

class UserEndpoint {
    // declaring private variables
    #client = {};
    #endpointEnum = {};

    constructor(apiClient, apiEndpointEnum) {
        // private
        this.#client = new apiClient();
        this.#endpointEnum = apiEndpointEnum.users;
        // public
        this.UserStatusEnum = { lock:"lock", unlock:"unlock", enable:"enable", disable:"disable" };

     }

     createUser = async (userObject) => {

        //AuxID1 needed for support with IdP
        let postData = {
            "schemas": [
                "urn:ietf:params:scim:schemas:core:2.0:User",
                "urn:ietf:params:scim:schemas:extension:secureauth:2.0:User",
                "urn:ietf:params:scim:schemas:extension:ldap:2.0:User"
            ],
            "userName": userObject.user,
            "password": userObject.password,
            "emails": [
            {
                "display": userObject.email,
                "primary": true,
                "type": "work",
                "value": userObject.email
            }
        ],
        "name": {
            "familyName": userObject.lastName,
            "givenName": userObject.firstName
        },
            "urn:ietf:params:scim:schemas:extension:secureauth:2.0:User": {
                "status": "staged"
            },
            "urn:ietf:params:scim:schemas:extension:ldap:2.0:User": {
                "AuxID1": " "
            }
        }

        //{{tenant}}/api/v1/scim/ids/{{ids_id}}/v2/Users
        return await this.#client.post(postData, this.#endpointEnum);
     }


     activateUser = async (userId) => {
        let postData = {
            "schemas": [
                "urn:ietf:params:scim:api:messages:2.0:PatchOp"
            ],
            "Operations": [
                {
                    "op": "replace",
                    "path": "urn:ietf:params:scim:schemas:extension:secureauth:2.0:User:status",
                    "value": "active"
                }
            ]
        }

        //{{tenant}}/api/v1/scim/ids/{{ids_id}}/v2/Users/{{user_id}}
        return await this.#client.patch(postData, this.#endpointEnum+'/'+userId);
     }

     getUser = async (lookup) => {
         //'userName eq "' + this.state.idp_id + '"'
        let param =  { filter: lookup };
        return await this.#client.getWithParams(this.#endpointEnum, param);
     }


}

module.exports = {
    UserEndpoint: UserEndpoint
}
# API Endpoints


### Login API
```
http://localhost:3000/api/auth/login
```

This API endpoint is used to authenticate and login a user.

#### Request Body

- `email` (string, required): The email of the user.
    
- `password` (string, required): The password of the user.
    

```json
{
    "email": "john36@gmail.com",
    "password": "123456"
}
```

#### Response

Upon successful authentication, the API returns a JSON object with the following structure:

``` json
{
    "user": {
        "id": 0,
        "name": "",
        "email": "",
        "password": "",
        "createdAt": "",
        "updatedAt": ""
    },
    "token": ""
}

 ```

- `user` (object): An object containing user information.
    
    - `id` (number): The unique identifier of the user.
        
    - `name` (string): The name of the user.
        
    - `email` (string): The email of the user.
        
    - `password` (string): The password of the user.
        
    - `createdAt` (string): The timestamp of user creation.
        
    - `updatedAt` (string): The timestamp of user information update.
        
- `token` (string): The authentication token for the user.


### Signup API

```
http://localhost:3000/api/auth/signup
```

This endpoint allows users to sign up by providing their email, password, and name in the request body.

#### Request Body

- `email` (string, required): The email of the user.
    
- `password` (string, required): The password for the user account.
    
- `name` (string, required): The name of the user.
    

```json
{
    "email": "john@gmail.com",
    "password": "123456",
    "name": "John doe"
}
```

### Response

The response will be in JSON format with the following schema:

``` json
{
    "type": "object",
    "properties": {
        "msg": {
            "type": "string"
        },
        "user": {
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer"
                },
                "name": {
                    "type": "string"
                },
                "email": {
                    "type": "string"
                },
                "password": {
                    "type": "string"
                },
                "createdAt": {
                    "type": "string"
                },
                "updatedAt": {
                    "type": "string"
                }
            }
        }
    }
}

 ```
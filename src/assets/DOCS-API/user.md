# Using /user
This endpoint handles the users in the database.<br>
All the request methods marked with :closed_lock_with_key: require authentication using the Authorization header.
```http
Authorization: Bearer 123:token
```

**NOTE**: everywhere you see `{id}` you shoud replace it with the acual id of the user, same thing for `{email}`.

## POST /user
Create a new user.

### Request Body Parameters
| Parameter | Type   | Required | Description                              |
|-----------|--------|----------|------------------------------------------|
| email     | string | yes      | The email of the user.                   |
| password  | string | yes      | The password the user will use to login. |
| name      | string | yes      | The name of the user.                    |
| surname   | string | yes      | The surname of the user.                 |

### Responses
* 204
    * The user has been created and the confirmation email was sent.
    * Body:
        ```json
        null
        ```
    * Additional Headers:
        ```
        Location: /user/{id}
        ```
* 409
    * A user with the same email already exists.
    * Body:
        ```json
        {
            "error":"A user with the same email already exists."
        }
        ```
* 422
    * The provided email doesn't exists.
    * Body:
        ```json
        {
            "error":"Email doesn't exist."
        }
        ```

## GET /user/{id} (:closed_lock_with_key:)
Get information about a user.

### Request Body Parameters
The resource doesn't need any parameter

### Responses
* 200
    * The user was found
    * Body:
    ```json
    {
        "permissions":0,
        "orders": [
            123,
            456
        ],
        "email":"email@example.com",
        "name":"Jhon",
        "surname":"Doe",
        "phone_number":null,
        "postal_code":null,
        "city":null,
        "country":null,
        "address":null,
        "registered":{unix_timestamp},
        "confirmed":null
    }
    ```

## PATCH /user/{id} (:closed_lock_with_key:)
Updates a user.

### Request Body Parameters
| Parameter     | Type   | Required | Description                              |
|---------------|--------|----------|------------------------------------------|
| password      | string | no       | The password the user will use to login. |
| name          | string | no       | The name of the user.                    |
| surname       | string | no       | The surname of the user.                 |
| phone_number  | string | no       | The user's phone number.                 |
| postal_code   | string | no       | The user's postal code.                  |
| city          | string | no       | The user's city.                         |
| country       | string | no       | The user's country.                      |
| address       | string | no       | The users's address.                     | 

### Responses
* 204
    * The user has been updated.
    * Body:
        ```json
        null
        ```


## DELETE /user/{id} (:closed_lock_with_key:)
Deletes the user.

### Request Body Parameters
The resource doesn't need any parameter.

### Responses
* 204
    * The user has been deleted.
    * Body:
        ```json
        null
        ```


## POST /user/{email}/otp
Create a new OTP.

### Request Body Parameters
The resource doesn't need any parameter.

### Responses
* 204
    * The OTP was created and sent to the user.
    * Body:
        ```json
        null
        ```
* 404
    * The user was not found.
    * Body:
        ```json
        {
            "error":"The user was not found."
        }
        ```
* 429
    * The user must wait the specified ammount of seconds before requesting a new OTP.
    * Body:
        ```json
        {
            "error":"Too many request, must wait {seconds} seconds between one request and another."
        }
        ```

## POST /user/{email}/token
Create a new Auth token for the user or renew the last one if not yet expired.

### Request Body Parameters
| Parameter   | Type   | Required | Description                                            |
|-------------|--------|----------|--------------------------------------------------------|
| password    | string | no       | The password of the user, optional if `otp` is passed. |
| otp         | string | no       | The generated OTP, optional if `password` is passed.   |
| remember_me | bool   | no       | Wheter the token should have a longer expiration time. |

### Responses
* 201
    * The token was created.
    * Body:
        ```json
        {
            "user_id":{id},
            "type":"userAuth",
            "expiration":{expiration_time},
            "value":"{id}:abc"
        }
        ```
* 401
    * The password or the OTP are incorrect.
    * Body:
        ```json
        {
            "error":"Invalid credentials."
        }
        ```
* 404
    * The user was not found.
    * Body:
        ```json
        {
            "error":"The user was not found."
        }
        ```

## DELETE /user/{id}/token (:closed_lock_with_key:)
Deletes the token.

### Request Body Parameters
The resource doesn't need any parameter.

### Responses
* 204
    * The token has been deleted.
    * Body:
        ```json
        null
        ```

## POST /user/{email}/reset-password
Request a new passoword reset.


### Request Body Parameters
The resource doesn't need any parameter.

| Parameter   | Type   | Required | Description                                                                              |
|-------------|--------|----------|------------------------------------------------------------------------------------------|
| otp         | string | no       | The generated OTP, if passed the password is required, otherwise a new OTP is generated. |
| password    | string | no       | The new password.                                                                        |

### Responses
* 204
    * The OTP was created and sent to the user.
    * Body:
        ```json
        null
        ```

* 200
    *
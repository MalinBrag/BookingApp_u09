# Endpoints and authentication


## User

### `POST /api/user/register`

**Description**: Register a new user and return a JWT token.

**Request:**
- Method: POST
- URL: `/api/user/register`
- Headers: `Content-Type: application/json`
- Body:
    ```json
    {
        "name": "exampleUser",
        "email": "user@example.com",
        "phone": "0739000000",
        "password": "password",
        "password_confirmation": "password",
        "role": "User / Admin" //Only admins can make new admins
    }
    ```

**Response:**
- Status: 201 Created / 400 Bad Request / 500 Internal Server Error
- Body:
    ```json
    {
        "token": "jwt-token",
        "userId": "inserted id from the database",
        "role": "User / Admin"
    }
    ```

### `POST /api/user/sign-in`

**Description**: Login user and return a JWT token.

**Request:**
- Method: POST
- URL: `/api/user/sign-in`
- Headers: `Content-Type: application/json`
- Body:
    ```json
    {
        "email": "user@example.com",
        "password": "password"
    }
    ```

**Response:**
- Status: 200 OK / 400 Bad Request / 500 Internal Server Error
- Body: 
    ```json
    {
         "token": "jwt-token",
        "userId": "userId",
        "role": "User / Admin"
    }
    ```

### `POST /api/user/logout`

**Description**: Log out user.

**Request:**
- Method: POST
- URL: `/api/user/logout`
- Headers: 
    ```json
    {
        "Content-Type": "application/json",
        "Authorization": "Bearer jwt-token"
    }
    ```
    
**Response:**
- Status: 200 OK
- Body: 
    ```json
    {
        "message": "User logged out successfully"
    }
    ```

### `GET api/user/profile`

**Description**: Get users profile page.

**Request:**
- Method: GET
- URL: `/api/user/profile`
- Headers:
    ```json
    {
        "Content-Type": "application/json",
        "Authorization": "Bearer jwt-token"
    }
    ```

**Response:**
- Status: 200 OK / 400 Bad Request / 500 Internal Server error
- Body:
    ```json
    {
        "id": "id",
        "name": "exampleUser",
        "email": "user@example.com",
        "phone": "0739000000",
        "role": "User / Admin"
    }
    ```


## Admin

### `GET /api/admin/users/:id`

**Description**: Get details of a specific user.

**Request:**
- Method: GET
- URL: `/api/admin/users/:id`
- Headers:
    ```json
    {
        "Content-Type": "application/json",
        "Authorization": "Bearer jwt-token"
    }
    ```

**Response:**
- Status: 200 OK / 404 Not Found / 500 Internal Server Error
- Body:
    ```json
    {
        "id": "id",
        "name": "exampleUser",
        "email": "user@example.com",
        "phone": "0739000000",
        "password": "password",   //encrypted
        "role": "User / Admin"
    }
    ```

### `GET /api/admin/users/all`

**Description**: Get a list of all users.

**Request:**
- Method: GET
- URL: `/api/admin/users/all`
- Headers:
    ```json
    {
        "Content-Type": "application/json",
        "Authorization": "Bearer jwt-token"
    }
    ```

**Response:**
- Status: 200 OK / 500 Internal Server Error
- Body:
    ```json
    {
        //Array of User
    }
    ```

### `PUT /api/admin/edit/:id`

**Description**: Update a user's details.

**Request:**
- Method: PUT
- URL: `/api/admin/edit/:id`
- Headers: 
    ```json
    {
        "Content-Type": "application/json",
        "Authorization": "Bearer jwt-token"
    }
    ```

**Response:**
- Status: 200 OK / 404 Not Found / 500 Internal Server Error
- Body:
    ```json
    {
        "message": "User updated successfully",
        "user": {
            "id": "id",
            "name": "updatedName",
            "email": "updatedEmail@example.com",
            "phone": "updatedPhone",
            "role": "updatedRole"
        }  
    }
    ```

### `DELETE /api/admin/delete/:id`

**Description**: Delete a user.

**Request:**
- Method: DELETE
- URL: `/api/admin/delete/:id`
- Headers: 
    ```json
    {
        "Content-Type": "application/json",
        "Authorization": "Bearer jwt-token"
    }
    ```

**Response:**
- Status: 200 OK / 404 Not Found / 500 Internal Server Error
- Body:
    ```json
    {
        "message": "User deleted successfully"
    }
    ```


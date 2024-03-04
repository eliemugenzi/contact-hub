### Contact Hub application

> [!TIP]
> This is the backend application that helps users to manage their contacts


### Installation process

- You need to have Node.js installed on your machine.
- cd `backend` and do `npm install`
- Copy `.env.example` file into `.env` and then fill in the respective values
- To have the database schema up-to-date you need to run `npx prisma migrate deploy`
- To run the project, run `npm run start:dev`

### Testing the application

> We have a couple of endpoints that we can use to test the functionality of this application

#### Creating an account

- Endpoint: `/auth/signup`
- Request Method: `POST`
- Request payload:
```json
{
    "first_name": "Che",
    "last_name": "Wolton-Grant",
    "email": "che@thewoltongrant.uk",
    "password": "Test@123"
}
```
- Response object
```json
{
    "status": 201,
    "data": {
        "id": "c5bde651-0f14-4292-bbb2-a43c1d675777",
        "first_name": "Che",
        "last_name": "Wolton-Grant",
        "email": "che@thewoltongrant.org",
        "created_at": "2024-03-04T18:25:25.051Z"
    },
    "message": "A user has been created!",
    "timestamp": "2024-03-04T18:25:25.065Z"
}
```

#### Login to the application

- Endpoint: `/auth/login`
- Request Method: `POST`
- Request Payload
```json
{
    "email": "eliemugenzi@gmail.com",
    "password": "Test@123"
}
```

- Response object
```json
{
    "status": 200,
    "message": "A user is successfully logged in",
    "data": {
        "id": "7eee2e63-1f9a-4ed1-bd03-2071820ba1f4",
        "first_name": "Elie",
        "last_name": "Mugenzi",
        "email": "eliemugenzi@gmail.com",
        "created_at": "2024-03-03T04:10:41.678Z",
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjdlZWUyZTYzLTFmOWEtNGVkMS1iZDAzLTIwNzE4MjBiYTFmNCIsImZpcnN0X25hbWUiOiJFbGllIiwibGFzdF9uYW1lIjoiTXVnZW56aSIsImVtYWlsIjoiZWxpZW11Z2VuemlAZ21haWwuY29tIiwiaWF0IjoxNzA5NDM5Njk3LCJleHAiOjE3MTAwNDQ0OTd9.nRBMNinNLQoyihk9UfvV8zmRjfnMJiw2JSv_Zu_0ihg"
    },
    "timestamp": "2024-03-03T04:21:37.712Z"
}
```


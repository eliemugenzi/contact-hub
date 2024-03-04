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

#### Create a new contact

- Endpoint: `/contacts`
- Request Method: `POST`
- Authorization: `Bearer Token`
- Request Payload:
```json
{
    "first_name": "Elie",
    "last_name": "MUGENZI",
    "preferences": [
        {
            "type": "EMAIL",
            "value": "e.mugenzi@gov.uk"
        },
        {
            "type": "PHONE",
            "value": "+250785844487"
        }
    ]
}
```
- Response Object
```json
{
    "status": 201,
    "data": {
        "id": "85f76b82-27ce-4a6f-a4c4-3845065020d7",
        "first_name": "Elie",
        "last_name": "MUGENZI",
        "user_id": "7eee2e63-1f9a-4ed1-bd03-2071820ba1f4",
        "status": "ACTIVE",
        "created_at": "2024-03-04T04:37:57.216Z",
        "preferences": [
            {
                "type": "EMAIL",
                "value": "e.mugenzi@gov.uk",
                "contact_id": "85f76b82-27ce-4a6f-a4c4-3845065020d7"
            },
            {
                "type": "PHONE",
                "value": "+250785844487",
                "contact_id": "85f76b82-27ce-4a6f-a4c4-3845065020d7"
            }
        ]
    },
    "message": "A new contact has been added successfully!",
    "timestamp": "2024-03-04T04:37:57.247Z"
}
```

#### Accessing my contacts

- Endpoint: `/contacts`
- Request Method: `GET`
- Authorization: `Bearer Token`
- Response Object:
```json
{
    "status": 200,
    "data": [
        {
            "id": "04aa3276-0679-4d3b-a7c3-f6ed8386d28a",
            "first_name": "Elie",
            "last_name": "MUGENZI",
            "created_at": "2024-03-03T14:08:06.438Z",
            "preferences": [
                {
                    "id": "d5a3201c-a98d-4337-bb76-de80ea609480",
                    "type": "PHONE",
                    "value": "+250785844487",
                    "created_at": "2024-03-04T04:38:14.963Z"
                },
                {
                    "id": "751d040b-49b8-43e5-bb7c-5d106f68dbe9",
                    "type": "EMAIL",
                    "value": "elie@gov.uk",
                    "created_at": "2024-03-04T04:38:14.963Z"
                }
            ],
            "duplicates": [
                {
                    "id": "900842a2-b313-4066-bb73-0e1ebc835268",
                    "first_name": "Elie",
                    "last_name": "Tyler",
                    "created_at": "2024-03-04T18:39:02.282Z",
                    "preferences": [
                        {
                            "type": "EMAIL",
                            "value": "e.mugenzi@pbd.com",
                            "created_at": "2024-03-04T18:39:02.286Z"
                        },
                        {
                            "type": "PHONE",
                            "value": "+250785844487",
                            "created_at": "2024-03-04T18:39:02.286Z"
                        }
                    ]
                }
            ]
        },
        {
            "id": "577037ef-6a86-4c96-a0c7-db1893329540",
            "first_name": "Che",
            "last_name": "Wolton Grant",
            "created_at": "2024-03-04T07:06:28.168Z",
            "preferences": [
                {
                    "id": "82de08d2-691d-4c7f-86e6-393cd5287d87",
                    "type": "EMAIL",
                    "value": "elie@gov.uk",
                    "created_at": "2024-03-04T07:06:28.186Z"
                },
                {
                    "id": "0a929fb9-56e2-4f84-a7bd-a103e440776a",
                    "type": "PHONE",
                    "value": "+250785844487",
                    "created_at": "2024-03-04T07:06:28.186Z"
                }
            ]
        },
        {
            "id": "545d0875-896b-4b25-a58d-e7871312f4c9",
            "first_name": "Edison",
            "last_name": "Mugisha",
            "created_at": "2024-03-04T18:38:17.765Z",
            "preferences": [
                {
                    "id": "c98a96c7-ff12-4177-b5a2-54c5d9b7ed52",
                    "type": "EMAIL",
                    "value": "e.mugenzi@pbd.com",
                    "created_at": "2024-03-04T18:38:17.828Z"
                },
                {
                    "id": "dc2a6a45-bce3-4182-acba-04d1efe8530d",
                    "type": "PHONE",
                    "value": "+250785844487",
                    "created_at": "2024-03-04T18:38:17.828Z"
                }
            ]
        },
        {
            "id": "900842a2-b313-4066-bb73-0e1ebc835268",
            "first_name": "Elie",
            "last_name": "Tyler",
            "created_at": "2024-03-04T18:39:02.282Z",
            "preferences": [
                {
                    "id": "5c88656f-f979-4ffe-8575-447e468559c1",
                    "type": "EMAIL",
                    "value": "e.mugenzi@pbd.com",
                    "created_at": "2024-03-04T18:39:02.286Z"
                },
                {
                    "id": "661799e3-1b92-4de7-b9ea-e8d2d4498f0b",
                    "type": "PHONE",
                    "value": "+250785844487",
                    "created_at": "2024-03-04T18:39:02.286Z"
                }
            ],
            "duplicates": [
                {
                    "id": "04aa3276-0679-4d3b-a7c3-f6ed8386d28a",
                    "first_name": "Elie",
                    "last_name": "MUGENZI",
                    "created_at": "2024-03-03T14:08:06.438Z",
                    "preferences": [
                        {
                            "type": "PHONE",
                            "value": "+250785844487",
                            "created_at": "2024-03-04T04:38:14.963Z"
                        },
                        {
                            "type": "EMAIL",
                            "value": "elie@gov.uk",
                            "created_at": "2024-03-04T04:38:14.963Z"
                        }
                    ]
                }
            ]
        }
    ],
    "timestamp": "2024-03-04T18:39:06.870Z"
}
```

#### Search for an application

- Endpoint: `/contacts?search=elie`
- Request Method: `GET`
- Authorization: `Bearer Token`
- Response object
```json
{
    "status": 200,
    "data": [
        {
            "id": "04aa3276-0679-4d3b-a7c3-f6ed8386d28a",
            "first_name": "Elie",
            "last_name": "MUGENZI",
            "created_at": "2024-03-03T14:08:06.438Z",
            "preferences": [
                {
                    "id": "d5a3201c-a98d-4337-bb76-de80ea609480",
                    "type": "PHONE",
                    "value": "+250785844487",
                    "created_at": "2024-03-04T04:38:14.963Z"
                },
                {
                    "id": "751d040b-49b8-43e5-bb7c-5d106f68dbe9",
                    "type": "EMAIL",
                    "value": "elie@gov.uk",
                    "created_at": "2024-03-04T04:38:14.963Z"
                }
            ],
            "duplicates": [
                {
                    "id": "900842a2-b313-4066-bb73-0e1ebc835268",
                    "first_name": "Elie",
                    "last_name": "Tyler",
                    "created_at": "2024-03-04T18:39:02.282Z",
                    "preferences": [
                        {
                            "type": "EMAIL",
                            "value": "e.mugenzi@pbd.com",
                            "created_at": "2024-03-04T18:39:02.286Z"
                        },
                        {
                            "type": "PHONE",
                            "value": "+250785844487",
                            "created_at": "2024-03-04T18:39:02.286Z"
                        }
                    ]
                }
            ]
        },
        {
            "id": "900842a2-b313-4066-bb73-0e1ebc835268",
            "first_name": "Elie",
            "last_name": "Tyler",
            "created_at": "2024-03-04T18:39:02.282Z",
            "preferences": [
                {
                    "id": "5c88656f-f979-4ffe-8575-447e468559c1",
                    "type": "EMAIL",
                    "value": "e.mugenzi@pbd.com",
                    "created_at": "2024-03-04T18:39:02.286Z"
                },
                {
                    "id": "661799e3-1b92-4de7-b9ea-e8d2d4498f0b",
                    "type": "PHONE",
                    "value": "+250785844487",
                    "created_at": "2024-03-04T18:39:02.286Z"
                }
            ],
            "duplicates": [
                {
                    "id": "04aa3276-0679-4d3b-a7c3-f6ed8386d28a",
                    "first_name": "Elie",
                    "last_name": "MUGENZI",
                    "created_at": "2024-03-03T14:08:06.438Z",
                    "preferences": [
                        {
                            "type": "PHONE",
                            "value": "+250785844487",
                            "created_at": "2024-03-04T04:38:14.963Z"
                        },
                        {
                            "type": "EMAIL",
                            "value": "e.mugenzi@gov.uk",
                            "created_at": "2024-03-04T04:38:14.963Z"
                        }
                    ]
                }
            ]
        }
    ],
    "timestamp": "2024-03-04T18:41:08.019Z"
}
```

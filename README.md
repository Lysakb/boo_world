## BOO_WORLD

---

## Stack

<div align="center">

<a href="">![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)</a>
<a href="">![MySQL](https://img.shields.io/badge/mongdb-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)</a>

</div>

---

## Requirements

- Create Profile
- Get Profile
- Create comments and Vote
- Get,sort and filter comments
- Like comments
- Unit test case for all functions and apis

---

## Profile

| field            | data_type | 
| ---------------- | --------- | 
| name             | string    |
| description      | string    |
| mbti             | string    |
| enneagram        | string    |
| variant          | string    |
| tritype          | string    |
| sloan            | string    | 
| psyche           | string    | 
| image            | string    | 

---

### create profile

- Route: /profile
- Method: POST
- Body:

```
{
    "name": "Elizabeth",
    "description": "A profile",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png"11138"
}

```

- Responses

Success

```javascript
{
  "message": "Profile created successfully!",
  "data": {
    "name": "Elizabeth",
    "description": "A profile",
    "mbti": "ISFJ",
    "enneagram": "9w3",
    "variant": "sp/so",
    "tritype": 725,
    "socionics": "SEE",
    "sloan": "RCOEN",
    "psyche": "FEVL",
    "image": "https://soulverse.boo.world/images/1.png",
    "_id": "651ecb3e9738af1e37611138",
    "__v": 0
  }
}
```


### Get profile by Id

- Route: /profile/{profile_id}
- Method: GET

---

### Comments
| field            | data_type | 
| ---------------- | --------- | 
| text             | string    |
| mbti             | string    |
| enneagram        | string    |
| zodiac           | string    |
| likes            | string    |
| createdAt        | date      | 

---

## Create Comments

---
- Route: /comment
- Method: POST
- Body:

```
{
    "text": "This is my comment 3",
    "mbti": "INFP",
    "enneagram": "6w5",
    "zodiac": "Aries",
    "_id": "651f94018432141767b2171a",
    "createdAt": "2023-10-06T04:58:41.620Z"
  }

```

- Responses

Success

```javascript
{
  "message": "Comments created successfully",
  "data": {
    "text": "This is my comment 3",
    "mbti": "INFP",
    "enneagram": "6w5",
    "zodiac": "Aries",
    "_id": "651f94018432141767b2171a",
    "createdAt": "2023-10-06T04:58:41.620Z",
    "__v": 0
  }
}
  
```
- Response statusCodes

```javascript
  - 201: success || Created
  - 400: error || Bad Request
  - 500: error || Internal Server Error
```

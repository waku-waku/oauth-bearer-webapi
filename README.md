# oauth-bearer-webapi

This WebAPI is on an OAuth2.0 Authorization Bearer Token Usage."

## custom
https://openid-foundation-japan.github.io/draft-ietf-oauth-v2.ja.html

https://openid-foundation-japan.github.io/rfc6750.ja.html

## instlation

npm install

DB_NAME=your_db_name npm start


## Bearer Authorization scheme

sample
```
GET /api/v1/users/me HTTP/1.1
Host: localhost:3000
Authorization: Bearer ********************************
Cache-Control: no-cache
Content-Type: application/x-www-form-urlencoded
```

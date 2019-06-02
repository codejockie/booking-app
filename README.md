# Booking App
This app lets you make booking from a list of properties.

## Getting Started

+ Clone the repository
+ Install Angular - `yarn global add @angular/cli` or `npm i -g @angular/cli`
+ Install MongoDB, if you don't already have it and ensure it is running
+ Navigate to the `client/` directory and run `yarn install` or `npm install`
+ Start the client app with the command `ng serve`
+ On the browser, navigate to `localhost:4200` to see the app
+ Navigate to the `server/` directory and run `yarn install` or `npm install`
+ Start the server with `yarn start` or `npm start`
  - The server should now be running on `localhost:3000`
  - By default, it creates a user with the following credentials
    + email: `jk@testapp.com`
    + password: `passed!`
  _ This user can be used to login to the client app to see the application
+ Open Postman or any other REST Client to test the endpoints
  - `/properties/:propertyId/bookings` - Returns a list of bookings made for a property
  - `/users/:userId/bookings` - Returns a list of bookings belonging to a user
  - `/bookings` - Creates a new booking

## Author
John Kennedy
+ [Twitter](https://twitter.com/codejockie)
+ [Medium](https://medium.com/@codejockie)
# Veegil Banking Web Application

Welcome to the Veegil Banking web application! This project is a full-stack banking application developed using these stacks MongoDB, Mongoose, Nest, Angular, Bootstrap, Node, GraphQL. It features user registration with various validations, transaction capabilities, and transaction history tracking. JWT (JSON Web Tokens) is used for authentication.

## Features

### User Registration
- Users can register with their full name, email, phone number, password, and confirm password.
- Passwords must have a minimum of 6 characters.
- The confirm password field must match the password.
- Phone numbers must have a minimum and maximum of 11 digits.
- Email validation is enforced.
- Upon email and phone number input, the application checks the database to see if the provided email or phone number already exists.

### Account Number Generation
- Phone numbers are automatically converted to account numbers after removing the first digit.

### Money Transfer
- Users can send money to another user on the platform by inputting their account number.
- When an account number is entered, the account owner's full name is automatically displayed.

### Transaction History
- The application tracks transaction history for each user.

### Demo Accounts
- For testing purposes, several demo accounts have been created:
  - Email Addresses: `ofishea1@gmail.com`, `samuelfola@gmail.com`, `olaadeyemi@gmail.com`, `temiwilly@gmail.com`, `adeniyieni@gmail.com`, `razaq@gmail.com`, `ezemebi@gmail.com`, `farbad@gmail.com`
  - Password: `veegil01` (for all demo accounts)

## Technologies Used
- **Frontend**: Angular, HTML, CSS, TypeScript
- **Backend**: Node, Nest, MongoDB, Mongoose, GraphQL
- **Authentication**: JSON Web Tokens (JWT)
- **Database**: MongoDB Atlas

## Usage
1. Clone the repository to your local machine.

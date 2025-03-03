
# How to run the source code

### Prerequisites
Before you can run this application, please ensure you have the following installed:
1. **Node.js** and **npm**
2. **PostgreSQL**
3. *(Recommended)* A **code editor** or IDE, such as VS Code, but any basic text editor will do

### Database Setup
Ensure you have PostgreSQL installed - if not, please install it. Set a password for the default 'postgres' user during installation.  
Now, we can proceed to create the dummy database and tables to be used for the application's backend. First, open your terminal app. Then, you may follow these steps to set up the exact mock data that I used for my testing:
```  
psql -U postgres  
  
(Enter your password)  
  
CREATE DATABASE loginapp;  
  
\c loginapp  
  
CREATE TABLE users  ( id SERIAL PRIMARY KEY, username VARCHAR(50) UNIQUE NOT NULL, password VARCHAR(100) NOT NULL, nric VARCHAR(9) UNIQUE NOT NULL, first_name VARCHAR(50) NOT NULL, last_name VARCHAR(50) NOT NULL, date_of_birth DATE NOT NULL, address TEXT NOT NULL, gender VARCHAR(10) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP );  
  
INSERT INTO users (username, password, nric, first_name, last_name, date_of_birth, address, gender) VALUES  
('johndoe', 'password123', 'S9812345A', 'John', 'Doe', '1998-04-15', '123 Orchard Road, #12-34, Singapore 123456', 'Male'),  
('jane333', 'Password121', 'T0023456B', 'Jane', 'Doe', '2000-08-22', '456 Clementi Ave 3, #05-11, Singapore 234567', 'Female'),  
('bobtan', 'PassWord123', 'S9234567C', 'Bob', 'Tan', '1992-11-30', '789 Tampines Street 66, #08-123, Singapore 345678', 'Male'),  
('alicechen', 'pw1234567', 'S8545678D', 'Alice', 'Chen', '1985-02-14', '321 Jurong East Street 32, #15-10, Singapore 456789', 'Female'),  
('michaellim', 'password456', 'S9756789E', 'Michael', 'Lim', '1997-06-08', '654 Ang Mo Kio Avenue 8, #03-45, Singapore 567890', 'Male'),  
('sarahwong', 'Pw789sarah', 'T0167890F', 'Sarah', 'Wong', '2001-12-25', '987 Yishun Ring Road, #09-77, Singapore 678901', 'Female');  
  
# To check if your database has been setup correctly, you may run:  
SELECT * FROM users;  
```  
It would be best to keep this terminal open without exiting from Postgres, to view the functionality of password hashing later on.
### Setting up the application
Open (another instance of) your terminal app in the folder you want to clone the repository into, then follow these steps:
1. Clone the repository:
```
git clone https://github.com/jimseah-0116/loginpage-app.git
cd loginpage-app
```  
2. Install frontend dependencies:
```
# Ensure you're in the root project directory
npm install
```  
3. Install backend dependencies:
```
cd server
npm install
```  
4. Create environment variables:
   Create a `.env` file **in the server directory** with the following:
```
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
DATABASE_URL=postgres://postgres:your_postgres_password@localhost:5432/loginapp
```
And then replace `your_jwt_secret_key_here` and `your_postgres_password` with your actual PostgreSQL details.

5. Hash the passwords:
```
# Ensure that you are currently in the server folder
node hashPasswords.js
```  
Notice the difference in the database after running `hashPasswords.js`! Before hashing the passwords, if we check our database,

![before hashing](before_hashing.png)

But, after we run `hashPasswords` on another terminal,

![Run hash function](run_hashing.png)

Now, we can check the first terminal that is connected to Postgres. Running `SELECT * FROM users;` we can see that the passwords have been hashed:

![After hashing](after_hashing.png)

You may exit Postgres in the first terminal now with `\q` and close the terminal.
We have successfully set up the application! Next, let's run it.

### Running the application
Open two terminal windows. For the first window, ensure that you are in the server folder, i.e. you should be in `...\loginpage-app\server`. Run `npm run dev`, and you should see the following output:
![npm run dev](run-dev.jpg)

Next, on the other terminal window, ensure that you are in the main project directory `...\loginpage-app`. Run `npm start`, which will start the React development server on port 3000.

Your browser should automatically open after a few seconds, but if not, open your browser and navigate to http://localhost:3000. Try logging in with any of the sample users, e.g.:
Username: `johndoe`
Password: `password123`

# Application design choices

### Authentication and Security
1. Following the project specifications, I used JWT-based authentication. Testing on Postman:

   
![post](post.png)

   
![get](get.png)

2. I also learned and used `bcrypt` to hash passwords, ensuring secure password storage and preventing exposure of plain-text passwords in case of a data breach.
3. Use of **environment variables** to hide sensitive information.

### Architecture
1. Separation of concerns: There is a clear division between the frontend (React) and backend (Node.js/Express)
2. Model-View-Controller Design Pattern: The backend uses MVC structure. The `models` folder contains the internal representation of information, e.g. in `Users.js` (modelling the app's users). Even though the `controllers`, `middleware`, and `routes` each have one file only (since this is a small project), it can be extended to include more files for bigger projects. For example, `middleware` can contain `errorHandler.js` for centralised error management, or `logger.js` for all request/response logging, etc.
3. Used React's Context API for global state management of authentication.
# Smart Expense Tracker (Personal Finance Manager)

## Project Overview
Smart Expense Tracker is a full-stack personal finance management application that allows users to track their income and expenses, categorize transactions, and analyze monthly spending trends. It helps users understand where their money goes through a clean dashboard and interactive charts.

---

## Features

### Authentication
- User registration
- User login with JWT authentication
- Protected routes for logged-in users

### Transactions
- Add income
- Add expenses
- Update and delete transactions
- Filter transactions by date
- Monthly summary

### Categories
- Create, update, and delete categories (Food, Rent, Travel, etc.)
- Assign transactions to categories

### Dashboard
- Total income, expenses, and balance calculation
- Chart visualization using Chart.js

### Validation & Error Handling
- Backend validation using Spring Boot
- Basic global exception handling
- Frontend form validation

---

## Tech Stack

### Backend
- Spring Boot
- Spring Data JPA
- MySQL
- JWT authentication
- REST APIs
- Global exception handling

### Frontend
- React
- Axios
- Chart.js
- React Router
- Protected routes

---

## Project Structure

smart-expense-tracker/
│
├── backend/ # Spring Boot API
├── frontend/ # React Application
└── README.md # Project documentation


---

## How to Run Locally

### Backend
1. Navigate to backend folder:
cd backend

2. Configure MySQL credentials in `application.properties`
3. Run the Spring Boot application

### Frontend
1. Navigate to frontend folder:
cd frontend

2. Install dependencies:
npm install

3. Start application:
npm start


---

## Screenshots
(Add screenshots of your dashboard, transactions, or charts here after deployment)

---

## Future Enhancements (v2)
- Admin role with full user management
- Pagination for transactions
- Advanced analytics and reports
- Export transactions as PDF/CSV

---

## Author
Vivek Khonde  
GitHub: [https://github.com/VivekCodeHubX](https://github.com/VivekCodeHubX)
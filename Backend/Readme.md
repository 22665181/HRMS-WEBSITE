# Backend @HRMS-WEBSITE

This backend uses **PostgreSQL** as the database.  
The repository includes a `pg_dump` SQL file to set up the same schema and sample data.

## How to
### 1. Install PostgreSQL
Make sure you have PostgreSQL installed:
- **Windows**: [Download installer](https://www.postgresql.org/download/)

### 2. Create a Database
Create a new database locally (you can change `mydb` to any name):
`createdb mydb`

### 3. Import the dump
```psql -U <your-username> -d mydb -f db/database.sql```

- replace `<your-username>` with your local PostgreSQL user.
- replace `mydb` with your database name.
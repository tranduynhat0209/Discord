# Discord

## Backend

### Installation & Environment Setup
```
cd backend

npm i

cp .env.example .env

// you might see file .env generated, fill the required information about your database and the website in each field.
```

### Set up JWT keys

Run
```
./keygen.sh 
```
A folder namely **keys** containing keys for JWT will be generated inside folder src, please don't modify it

### TO-DO TASKS

1. Write unit tests for each function
2. Write e2e tests for each REST api & WS event
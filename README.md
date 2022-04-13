# Credibly Backend

Credibly is a secure and verifiable digital certificate and credential solutioning system for businesses and institutions to issue certificates and licenses to members and participants. This repository is the backend API made with Node.js. The frontend repository can be found [here](https://github.com/joannang/credibly-fe).

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install the node module dependencies.

```bash
npm install
```

## Database

The applciation utilises MySQL 8.0, which can be downloaded [here](https://dev.mysql.com/downloads/windows/installer/8.0.html). Afterwards, generate the SQL script via your terminal. There should be an init.sql file generated in the scripts folder.

```bash
cd src/scripts
./init.sh
```

Next, run the following command to create the database and tables. Change username "root" and password "password" accordingly if necessary.

```bash
mysql -uroot -ppassword < <PATH_TO_FOLDER>/scripts/init.sql
```

If the above does not work, open MySQL Workbench and execute the init.sql script directly through it. 

## Setup Local Environment

Make a copy of env.sample.json and name it env.json. Open the env.json file and change the variables as required to suit your local environment.

## Run Local Application

Running the following command in the root folder will start the application locally.

```bash
npm run start
```

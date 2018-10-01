## Chess game

### Install
First, you need to install [postgres](https://www.postgresql.org/download/) or using brew
```sh
brew update
brew doctor
brew install postgresql
```

Also you should have `nodejs` with `npm`

Second, create DB and start migrations for database ([more](#backend)):
```sh
psql
CREATE DATABASE chess;

npm run db:up
```

Third, for start you need to run command:
```sh
npm run start
npm run server
```


### Pulling a new version
Refresh migrations:
```sh
npm install
npm run db:refresh
npm run start
npm run server
```


### Backend
You can see about backend [here](https://github.com/savtym/chess/tree/master/app)
# EarthBnB

EarthBnB is a website that mimics Airbnb both in functionality and style.

Website: https://earthbnbapp.herokuapp.com/

## Technologies used
### Frontend
* React
* Redux
* JavaScript
* CSS
* HTML5
### Backend
* Express
* PostgreSQL
* Sequelize
### Additional technologies
* AWS
* Heroku

## Development
Ensure PostgreSQL is installed and running

1. Create a database user with CREATEDB privledges.
2. Make a .env file in the backend and configure the enviroment variables with the user created in step 1.
   Configure JWT_SECRET, JWT_EXPIRES_IN, AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY environment variables
  
   .env example:
   PORT=5000
   DB_USERNAME=auth_app
   DB_PASSWORD=auth_app user password
   DB_DATABASE=auth_db
   DB_HOST=localhost
   JWT_SECRET=generate_strong_secret_here
   JWT_EXPIRES_IN=604800
   AWS_ACCESS_KEY_ID=this_comes_from_aws
   AWS_SECRET_ACCESS_KEY=this_comes_from_aws
   
3. Set up the database:
    1) Run npm run sequelize db:create
    2) Run npm run sequelize db:migrate
    3) Run npm run sequelize db:seed:all
    
4. Start the development servers:
    1) Run npm start in the backed directory
    2) Run npm start in the frontend directory
   
## Heroku deployment 

1. Configure JWT_SECRET, JWT_EXPIRES_IN, AWS_ACCESS_KEY_ID, S3_BUCKET_NAME=<the_name_of_your_bucket> and AWS_SECRET_ACCESS_KEY config vars on Heroku.
2. Login to Heroku in your terminal by running:
    heroku login
3. Add Heroku as a remote to your project's git repository:
    heroku git:remote -a <name-of-Heroku-app>
4. Push your project to Heroku:
    git push heroku master
5. To migrate the production database, run:
    heroku run npm run sequelize db:migrate
6. To seed the production database, run:
    heroku run npm run sequelize db:seed:all
7. Open your site in the browser with:
    heroku open





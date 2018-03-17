# Nearby-Shops-App

### Technologies used:
 - **Javascript**
   - **Frontend :** VueJS
   - **Backend :** NodeJS (ExpressJS)
   - **Database :** MongoDB
### Requirements:

- Node v8.9.4 or higher.
- NPM v5.6.0 or higher.
- MongoDB v3.2.19 or higher.
## How to use:

**To run the Nearby Shops App, you need to execute the following steps:**

### Setup
First, you need import the shops database from this [dump file](https://github.com/hiddenfounders/web-coding-challenge/blob/master/dump-shops.zip).
You need to extract the zip file and navigate into the extracted folder, then execute the command below :
```
mongorestore --db shops shops/
```
Then, you'll need to create a 2D-Sphere Index in your database. To do that, execute the following commands from the mongo shell:
```
use shops
db.shops.createIndex( { location : "2dsphere" } )
```
### Cloning the repo and running the app

Clone the repo using the following command:
```
git clone https://github.com/ttlgeek/Nearby-Shops-App.git
```
Navigate into the app folder:

    cd Nearby-Shops-App
    
Navigate into the client folder and install dependencies:

    cd client
    npm install
   
Then, navigate into the server folder and install dependencies:

    cd ../server
    npm install
Finally, run the app using this command:

    npm run app --kill-others
    
After it's done, navigate to **localhost:8080** on your favorite browser. **Enjoy!**

PS. If you get a database error or the register button isn't working, then it's either you haven't restored the dump file correctly, or you don't have the mongo daemon running. If that's the case, you can run it using this command:

    mongod

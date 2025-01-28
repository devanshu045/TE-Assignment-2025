import { app } from './app.js';
import dbConnection from './Database/dbConnection.js';
import dotenv from 'dotenv';

dotenv.config({
    path: './.env'
});
dbConnection().then(() => {
    const port =  process.env.PORT || 8080; 
    app.listen(port, () => {
        console.log(`Listening on port ${port}`); 
    });
}).catch(err => {
    console.log("Server connection failed", err); 
});

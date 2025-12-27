import {app} from './app.js';
import {connectDB} from './db/index.js';
import dotenv from 'dotenv';
dotenv.config(
    {
        path: './.env'
    }
);


const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.send('Welcome to Skill Tracker API');
});


connectDB(process.env.MONGODB_URI)
.then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})})
.catch((error) => {
    console.error("Failed to start the server:", error.message);
})
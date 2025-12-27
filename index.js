import {app} from './app.js';
import {connectDB} from './db/index.js';
import dotenv from 'dotenv';
import cors from "cors";
app.use(cors({ origin: "http://localhost:5000" }));

dotenv.config(
    {
        path: './.env'
    }
);


const PORT = process.env.PORT || 3000;



app.get('/', (req, res) => {
    res.send('Welcome to Skill Tracker API');
});



// imports routes
import authRoutes from './routes/auth.routes.js';

// use routes
app.use('/auth', authRoutes);

connectDB(process.env.MONGODB_URI)
.then(() => {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})})
.catch((error) => {
    console.error("Failed to start the server:", error.message);
})
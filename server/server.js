import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import blogRouter from './routes/blogRoutes.js';
import { signup } from './controllers/signupController.js';

const app = express();

await connectDB();

//Middlewares
app.use(cors())
app.use(express.json())

//Routes
app.get('/',(req,res)=> res.send("API IS WORKING!"))
app.use('/api/admin',adminRouter)
app.use('/api/blog',blogRouter)
app.post('/api/signup', signup);

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is running on port: " + PORT);
})

export default app;


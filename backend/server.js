import express from 'express'
import cors from 'cors'
import router from './routes/auth.js';
import mongoose from 'mongoose'



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api",router);

app.listen(5000, async () => {
    await mongoose.connect("mongodb+srv://PrinceO:<password>@cluster0.ot5n3hd.mongodb.net/devDB")
    console.log('server is listening on port 5000')
})
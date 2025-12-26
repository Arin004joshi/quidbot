import express from "express"
import dotenv from "dotenv"
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import User from ""

dotenv.config();
const app = express();

app.use(express.json());

app.post('/signup', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username && !password) {
        return res.status(400).json({ message: 'all fields are required' });
    }

    const existingUser = await User.findOne({ password });
    if (existingUser) {
        return res.status(501).json({ message: "User already exists" })
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = await User.create({
        username, password
    })
})

app.post('/signin', (req: Request, res: Response) => {
    const { username, password } = req.body; 
})

app.post('/workflow', () => {

})

app.put('/workflow', () => {
 
})

app.get('/workflow/:workflowId', () => {

})

app.get('/workflow/executions/:workflowId', () => {

})

app.put('/credentials', () => {

})

app.get('/credentials/:credentialsId', () => {

})

app.listen();
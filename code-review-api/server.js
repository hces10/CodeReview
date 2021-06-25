const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');

const connectDB = require('./config/db')

dotenv.config({ path: './.env' })

connectDB()

const server = express();

const PORT = 3333
const MONGO_DB = "mongodb+srv://admin:admin123@codereview.6tvtw.mongodb.net/codes?retryWrites=true&w=majority"

server.use(express.json());
server.use(routes);

server.listen(PORT, console.log('Server running on port 3333'));



// const { OAuth2Client } = require('google-auth-library')
// const client = new OAuth2Client(process.env.CLIENT_ID)

// server.post("/api/v1/auth/google", async (req, res) => {
//     const { token }  = req.body
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: process.env.CLIENT_ID
//     });
//     const { name, email, picture } = ticket.getPayload();    
//     const user = await db.user.upsert({ 
//         where: { email: email },
//         update: { name, picture },
//         create: { name, email, picture }
//     })
//     req.session.userId = user.id
//     res.status(201)
//     res.json(user)
// })

// server.use(async (req, res, next) => {
//     const user = await db.user.findFirst({where: { id:  req.session.userId }})
//     req.user = user
//     next()
// })

// server.delete("/api/v1/auth/logout", async (req, res) => {
//     await req.session.destroy()
//     res.status(200)
//     res.json({
//         message: "Logged out successfully"
//     })
// })

// server.get("/me", async (req, res) => {
//     res.status(200)
//     res.json(req.user)
// })
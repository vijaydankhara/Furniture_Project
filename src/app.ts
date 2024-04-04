import express from 'express';
import dotenv from 'dotenv';
const app = express();
import mongoose from 'mongoose';
import adminsRoutes from './routes/admin/index.routes';
dotenv.config();
const port : Number = Number(process.env.PORT);
const dbURL : string = process.env.MONGO_DB_URL as string ;

app.use(express.json());

app.use('/api/admin', adminsRoutes)
// /*---------------------------- Admin Route --------------------------------------*/
// const adminsRoutes = require('./src/routes/admin/index.routes');
// app.use('/api/admin', adminsRoutes);

// /*---------------------------- Users Route --------------------------------------*/
// const usersRoutes = require('./src/routes/user/index.routes');
// app.use('/api/user', usersRoutes);

app.listen(port, async () => {
    mongoose.connect(dbURL)
    .then(() => console.log('DB Is Connected ✔︎✔︎✔︎'))
    .catch(err => console.log(err.message));
    console.log(`server start at http://localhost:${port} ✔︎✔︎✔︎`);
});

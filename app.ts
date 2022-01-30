import * as express from "express";
import authRoutes from "./routes/authRoutes";
import { requireAuth, checkUser } from "./middleware/authMiddleware";
import * as mysql from "mysql2";
import "reflect-metadata";
import {createConnection} from "typeorm";
import * as User from "./entity/User";
import * as cookieParser from "cookie-parser";




// middleware


// view engine


// create connection

createConnection().then((connection) => {


  const app = express();

  app.use(express.static('public'));
  app.use(express.json());
  app.use(cookieParser());

  app.set('view engine', 'ejs');

  app.get('*', checkUser);
  app.get('/', (req, res) => res.render('home'));
  app.use(authRoutes);



  const PORT = process.env.PORT || 3400;

  app.listen(PORT, () => {
    console.log(`🔥🔥 Server is listening on port ${PORT} 🔥🔥🔥`);
  });
});








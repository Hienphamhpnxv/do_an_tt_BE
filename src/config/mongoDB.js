import mongoose from 'mongoose';
import { env } from '../config/environments';
import auth from '../models/auth';
const Role = auth.role;

export const connectDB = async () => {
  const client = await mongoose.connect(env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  console.log('connect to mongo DB ... ');
};

export const initialDB = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: 'user'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: 'moderator'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: 'admin'
      }).save(err => {
        if (err) {
          console.log('error', err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
};

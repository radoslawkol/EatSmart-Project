const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

// process.on('uncaughtException', (err) => {
//   console.log('UNCAUGHT EXCEPTION!  Shutting down...');
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then((con) => console.log('DB connection successful'));

const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server works on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION!  Shutting down...');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});

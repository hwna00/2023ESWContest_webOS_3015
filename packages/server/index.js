const express = require('express');
const cors = require('cors');

const user = require('./routes/user/user');
const hospital = require('./routes/hospital/hospital');
const auth = require('./routes/auth/auth');
const appointment = require('./routes/appointment/appointment');

require('dotenv').config();

const app = express();
const port = 3000 || process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api', auth);
app.use('/api', user);
app.use('/api', hospital);
app.use('/api', appointment);

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});

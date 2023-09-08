const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  console.log('get /');
});

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});

'use strict'
const cors = require('cors');
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const propierties = require('./config/properties');
const DB = require('./config/db');
// init DB
DB();

const app = express();
const router = express.Router();

const bodyParser = require('body-parser');
const bodyParserJSON = bodyParser.json();
const bodyParserURLEncoded = bodyParser.urlencoded({ extended: true });

app.use(bodyParserJSON);
app.use(bodyParserURLEncoded);

app.use(cors());

/*app.use((req,res,next)=>{
  res.Header("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.Header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  if (req.method === 'OPTIONS'){
  res.Header("Access-Control-Allow-Headers", "X-Requested-With,content-type");
  return res.status(200).json({});
}
 next();
});*/

app.use('/api', router);

authRoutes(router);
router.get('/', (req, res) => {
  res.send('Hello from home');
});
app.use(router);
app.listen(propierties.PORT, () => console.log(`Server runing on port ${propierties.PORT}`));
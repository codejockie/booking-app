import express = require('express');
import { json, urlencoded } from 'body-parser';

import { routes } from './routes';

const app = express();
const router = express.Router();
const port = process.env.PORT || 3000;

// Configure middleware
app.use(urlencoded({ extended: true }));
app.use(json());

// Enable CORS
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Configure routes
routes(router);
app.use('/v1', router);

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.listen(port, () => console.log(`Server is listening on ${port}`));

export default app;
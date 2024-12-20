import express from 'express';
import { create } from 'express-handlebars';
import './config/config';
import router from './routes';

const exphb = create({
  defaultLayout: 'main',
  layoutsDir: './src/views/layouts',
  partialsDir: './src/views/partials',
});
const app = express();

app.engine('handlebars', exphb.engine);

app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./src/public'));

app.use(router);

app.listen(process.env.APP_PORT, () => console.log(`Listening on localhost:${process.env.APP_PORT}`));

app.get('/', (req, res) => {
  const data = { title: 'Hello, World', message: 'Welcome to my MVC App!' };
  res.render('home', data);
});

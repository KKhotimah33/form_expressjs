const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const exphbs = require('express-handlebars');
const members = require('./Members');

const app = express();

//Init middleware
//app.use(logger);

//Handlebar middleware
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//homepage route
app.get('/',(req,res)=> res.render('index',{
	title: 'Members App',
	members
}));

//set static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/members', require('./routers/api/members'));

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
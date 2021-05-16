const express = require('express');
const mongoose = require('mongoose');
const app = express();
const mongodb = 'mongodb+srv://development:ZDInkkPtud8xWuex@cluster0.lnvra.mongodb.net/item-database?retryWrites=true&w=majority';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	console.log('connected');
	app.listen(4200);
}).catch(err => {
	console.log(err)
})
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	const items = [
		{name: 'mobile phone', price: 1000},
		{name: 'book', price: 70},
		{name: 'computer', price: 2000}
	]
  res.render(`index`, { items });
})

app.get('/add-item', (req, res) => {
    res.render(`add-item`);
})

// Should be last to go to error page
app.use((req, res) => {
    res.render(`error`);
})
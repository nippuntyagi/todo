const express = require('express');
const mongoose = require('mongoose');
const Item = require('./models/items');
const app = express();

app.use(express.urlencoded({extended: true}));

const mongodb = 'mongodb+srv://development:ZDInkkPtud8xWuex@cluster0.lnvra.mongodb.net/item-database?retryWrites=true&w=majority';

mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
	console.log('connected');
	app.listen(4200);
}).catch(err => {
	console.log(err)
})
app.set('view engine', 'ejs');

// mongo api routes

app.get('/create-item', (req, res)=> {
	const item = new Item({
		name: 'Computer',
		price: 2000
	});
	item.save().then(result=>{res.send(result)});
});

app.get('/get-items', (req, res)=> {
	Item.find().then(result=>{
		res.render(`index`, { items: result });
	}).catch(err => {
		console.log(err);
	});
});

app.get('/items/:id', (req, res)=> {
	const id = req.params.id
	Item.findById(id).then(result=>{
		res.render('item-detail', {item: result});
	}).catch(err => {
		console.log(err);
	});
});

app.delete('/items/:id', (req, res)=> {
	const id = req.params.id
	Item.findByIdAndDelete(id).then(result=>{
		// res.render('item-detail', {item: result});
		// res.redirect('/get-items')
		res.json({redirect: '/'})
	}).catch(err => {
		console.log(err);
	});
});

app.put('/items/:id', (req, res)=> {
	const id = req.params.id
	Item.findByIdAndUpdate(id, req.body).then(result=>{
		res.json({msg: 'Updated Successfully'})
	}).catch(err => {
		console.log(err);
	});
});

app.post('/items', (req, res) => {
	const item = Item(req.body);
	item.save().then(result=>{
		res.redirect('/get-items')	
	}).catch(err=>{
		console.log(err);
	})
})
// ui routes
app.get('/', (req, res) => {
	res.redirect('/get-items')
})

app.get('/add-item', (req, res) => {
    res.render(`add-item`);
})

// Should be last to go to error page
app.use((req, res) => {
    res.render(`error`);
})
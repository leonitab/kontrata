const express = require('express');
const app = express();
app.set('views', __dirname + '/public');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://localhost:27017';
const ObjectId = require('mongodb').ObjectId;

MongoClient.connect(mongoUrl, function(err, db) {
   if (err) {
      console.log(err);
      return;
   }
   console.log('Database successfully connected!');
   proj = db.collection('proj');
});

app.post('/proj/add', (req,res,next)=>{
  proj.insert({nr_rendor: req.body.nr_rendor, 
  	lloji_prokurimit: req.body.lloji_prokurimit, 
  	aktivivteti: req.body.aktiviteti, 
  	d_inicimit: req.body.d_inicimit,
  	d_publikimit: req.body.d_publikimit, 
   	d_nenshkrimit: req.body.d_nenshkrimit, 
   	afati1: req.body.afati1,
	afati2: req.body.afati2, 
	d_permbylljes: req.body.d_permbylljes, 
	cmimi_k: req.body.cmimi_k,
	cmimi_t: req.body.cmimi_t, 
	emri: req.body.emri}, 
  	(err,document)=>{
    if (err) {
      console.log(err);
      return;
    }
    res.redirect('/');
  })
})

app.get('/',function(req,res){
  proj.find({}).toArray(function(err,docs){
    if (err) {
      console.log(err);
    }
    res.render('index',{docs:docs});
  });
});


app.get("/proj/:id", function(req, res) {
	console.log(req.params.id);
	proj.findOne({_id: ObjectID(req.params.id)}, function(err, doc)
	{
		if(err) {
			console.log(err);
		}
		res.render("show", {doc: doc});
	})
});



app.get("/proj/edit/:id", function(req, res) {
	proj.findOne({_id: ObjectID(req.params.id)}, function(err, doc)
	{
		if (err) {
			console.log(err);
		}
		res.render("edit", {doc: doc});
	});
});



app.post("/proj/update/:id", function(req, res) {
	proj.updateOne({_id: ObjectID(req.params.id)},
		{$set: {nr_rendor: req.body.nr_rendor, 
  	lloji_prokurimit: req.body.lloji_prokurimit, 
  	aktivivteti: req.body.aktiviteti, 
  	d_inicimit: req.body.d_inicimit,
  	d_publikimit: req.body.d_publikimit, 
   	d_nenshkrimit: req.body.d_nenshkrimit, 
   	afati1: req.body.afati1,
	afati2: req.body.afati2, 
	d_permbylljes: req.body.d_permbylljes, 
	cmimi_k: req.body.cmimi_k,
	cmimi_t: req.body.cmimi_t, 
		emri: req.body.emri}}, function(err, doc) {
		if(err) {
			console.log(err);
		}
		res.redirect("/");
	});
});



app.get("/proj/delete/:id", function(req, res) {
	proj.remove({_id: ObjectID(req.params.id)},
		function(err, doc) {
		if(err) {
			console.log(err);
		}
		res.redirect("/");
	});
});




app.listen(3000, function() {
   console.log('App running at port 3000');
});

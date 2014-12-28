var Post = require('./models/posts');
var forecastIO = require('forecastio');

var printErr = function(err) {
  if (err) {
    return err;
  }
};

module.exports = function(app) {

  //get all posts
  app.get('/api/posts', function(req, res) {
    
    Post.find(function(err, posts) {
      if (err) { return err; }
      res.json(posts);
    });
  });

  //get the current weather at a specific location
  app.get('/api/weather/:lat/:long', function(req, res) {
    console.log("Getting the weather doge bro", req.params);

    var forecast = new forecastIO('c6e9c9098cb512f88259e7a27a25f70e');

    var epoch = Math.round((new Date()).getTime() / 1000);

    forecast.timeMachine(req.params.lat, req.params.long, epoch,
			 function(err, data) {
			   if (err) throw err;
			   res.json(data);
			 });
  });
  
  //get a specific post
  app.get('/api/posts/:id', function(req, res) {
    Post.findById(req.params.id, function(err, post) {
      if (err) { return err; }
      res.json(post);
    });
  });
  
  // create a new post, return all new posts to the user
  app.post('/api/posts', function(req, res) {
    console.log(req.body);
    Post.create({
      title: req.body.title,
      body: req.body.postTxt,
      date: Date.now()
    }, function(err, post) {
      Post.find(function(err, posts) {
	if (err) { return err; }
	res.json(posts);
      });
    });
  });
  
  //delete a post
  app.delete('/api/posts/:post_id', function(req, res) {
    console.log(req.params);

    Post.remove({
      _id: req.params.post_id
    }, function(err) {
      if (err) { return err; }
      Post.find(function(err, posts) {
	if (err) { return err; }
	res.json(posts);
      });
    });

  });
  
  //updates  a post
  app.put('/api/posts/:post_id', function(req, res) {
    console.log(req.body, req.params.post_id);
    res.send('blah');
  });
  
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './public/index.html'));
  });
};

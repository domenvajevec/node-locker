var Beer = require('../models/beer');

//Create endpoint /api/beers/ for POSTS
exports.postBeers = function (req, res) {
    //Crete new instance of beer model
    var beer = new Beer();

    //Set the beer properties that came from the post data
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    beer.userId = req.user._id;

    //Save the beer and check for errors
    beer.save(function(err){
        if(err)
            res.send(err);
        
        res.json({message: 'Beer added to locker'});
    });
};

//Create endpoint /api/beers for GET
exports.getBeers = function(req, res){
    // Use the beer model to find all beers
    Beer.find({ userId: req.user._id }, function(err, beers){
        if(err)
            res.send(err);
        res.json(beers);
    });
};

//Create endpoint /api/beers/:beer_id for GET
exports.getBeer = function(req, res){
    // Use the beer model to find specific beer
    Beer.findById({ userId: req.user._id, _id: req.params.beer_id }, function(err, beer){
        if(err)
            res.send(err);
        res.json(beer);
    });
};

//Create endpoint for /api/beers/:beer_id for PUT
exports.putBeer = function(req, res){
    // find beer
    Beer.findById({ userId: req.user._id, _id: req.params.beer_id }, { quantity: req.body.quantity}, function(err, num){
        if(err)
            res.send(err);

        res.json({ message: num + 'updated'});
    });
};

// Create enpoint /api/beers/:beer_id for DELETE
exports.deleteBeer = function(req, res){
    // find beer and remove it
    Beer.remove({userId: req.user._id, _id: req.params.beer_id }, function(err){
        if(err)
            res.send(err);

        res.json({ message: 'Beer removed from locker'});
    });
};
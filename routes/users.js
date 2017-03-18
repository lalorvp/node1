var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  User
  	.find({})
  	//.select('-edad -_id')
  	.exec(function(err, users){
  		if(err){
  			res.send({
  				status: 0,
  				message: 'Ocurrió error',
  				error: err,
  			});
  		}else{
  			res.send({
  				status: 1,
  				data: users,
  			});
  		}

  	});

});

//users/id
router.get('/:id', function(req, res, next){
	var idUser = req.params.id; // parametro GET
	// POST req.body.<variable>
	User
		.findById(idUser)
		.select('nombre apellido empresa')
		.populate({
			path: 'empresa',
			select: 'razsoc ruc _id'
		})
		.exec(function(err, user){
			if(err){
  				res.send({
	  				status: 0,
	  				message: 'Ocurrió error',
	  				error: err,
  				});
  			}else{
  				res.send({
  				status: 1,
  				data: user,
  			});
  		}
		});
});

router.post('/',function(req,res,next){
	console.log(req.body);

	User.create(req.body, function(err,user){
		if(err){
			res.send({
				status: 0,
				mensaje: 'Ocurrió error',
				err: err,
			});
		}else{
			res.send({
				status: 1,
				mensaje: 'usuario creado',
				data: user,
			});
		}
	});
	
});

router.put('/:id',function(req, res, next){

	User.findByIdAndUpdate(req.params.id,req.body,{ new: true }, function(err, user){
		if(err){
			res.send({
				status: 0,
				mensaje: 'Ocurrió error',
				err: err,
			});
		}else{
			res.send({
				status: 1,
				mensaje: 'usuario actualizado',
				data: user,
			});
		}

	});

});



module.exports = router;

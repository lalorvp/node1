var express = require('express');
var router = express.Router();
var Organization = require('../models/organization');

//LISTAR
router.get('/', function(req, res, next){

	Organization
		.find({})
		.select('-telefono')
		.exec(function(err, organization){
			if(err){
				res.send({
					status: 0,
					message: 'Ocurrió error',
					error: err,
				})
			}else{
				res.send({
					status: 1,
					data: organization,
				});
			}

		});

});

//GRABAR
router.post('/',function(req,res,next){
	console.log(req.body);

	Organization.create(req.body, function(err,organization){
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
				data: organization,
			});
		}
	});
	
});


// OBTENER DETALLE
router.get('/:id', function(req, res, next){
	var idOrganization = req.params.id;

	Organization
		.findById(idOrganization)
		.select('razsoc ruc direccion')
		.exec(function(err, organization){
			if(err){
  				res.send({
	  				status: 0,
	  				message: 'Ocurrió error',
	  				error: err,
  				});
  			}else{
  				res.send({
  				status: 1,
  				data: organization,
  				});
  			}
		});

});

//ACTUALIZAR
router.put('/:id',function(req, res, next){

	Organization.findByIdAndUpdate(req.params.id,req.body,{ new: true }, function(err, organization){
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
				data: organization,
			});
		}

	});

});


module.exports = router;
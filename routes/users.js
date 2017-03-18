var express = require('express');
var router = express.Router();
var User = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  res.send({
  	status:1,
  	data:[
  		{id:1, nombre: 'Carlos1', apellido:'Perez1'},
  		{id:2, nombre: 'Carlos2', apellido:'Perez2'},
  		{id:3, nombre: 'Carlos3', apellido:'Perez3'},
  		{id:4, nombre: 'Carlos4', apellido:'Perez4'},
  	]
  });

});

//users/id
router.get('/:id', function(req, res, next){
	var idUser = req.params.id; // parametro GET
	// POST req.body.<variable>

	res
		.status(200)
		.send('has solicitado el usuario' + idUser);
});

router.post('/',function(req,res,next){
	console.log(req.body);

	User.create(req,body, function(err,user){
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



module.exports = router;

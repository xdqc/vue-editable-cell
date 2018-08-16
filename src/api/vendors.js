import { Router } from "express"

export default ({ config, db }) => {
	let api = Router();

	//rest api to get all vendors
	api.get('/', (req, res) => {
		db.query('SELECT * from vendor', (error, results, fields) => {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	});

	//rest api to get a single vendor data
	api.get('/:id', (req, res) => {
		db.query('SELECT * from vendor where id=?', [req.params.id], function (error, results, fields) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	});

	//rest api to create a new vendor record into mysql database
	api.post('/', (req, res) => {
		var params = req.body;
		console.log(params);
		db.query('INSERT INTO vendor SET ?', params, function (error, results, fields) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	});

	//rest api to update record into mysql database
	api.put('/', (req, res) => {
		db.query('UPDATE vendor SET `name`=?,`type`=? where `id`=?', [req.body.name, req.body.type, req.body.id], (error, results, fields) => {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	});

	//rest api to delete record from mysql database
	api.delete('/', (req, res) => {
		console.log(req.body);
		db.query('DELETE FROM vendor WHERE `id`=?', [req.body.id], (error, results, fields) => {
			if (error) throw error;
			res.end('Record has been deleted!');
		});
	});
	return api;
};

import { Router } from "express"

export default ({ config, db }, table) => {
	let api = Router();

	//rest api to get all entries
	api.get('/', (req, res) => {
		db.query('SELECT * from ' + table, (error, results, fields) => {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	});

	//rest api to get a single entry data
	api.get('/:id', (req, res) => {
		db.query('SELECT * from ' + table + ' where id=?', [req.params.id], function (error, results, fields) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	});

	//rest api to create a new record into mysql database
	api.post('/', (req, res) => {
		var params = req.body;
		console.log(params);
		db.query('INSERT INTO ' + table + ' SET ?', params, function (error, results, fields) {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	});

	// rest api to update record into mysql database
	api.put('/', (req, res) => {
		db.query('UPDATE ' + table + ' SET ? where `id`=?', [req.body, req.body.id], (error, results, fields) => {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	});

	//rest api to update one record with id into mysql database
	api.put('/:id', (req, res) => {
		console.log(req.body);
		db.query('UPDATE ' + table + ' SET ? where id=?', [req.body, req.params.id], (error, results, fields) => {
			if (error) throw error;
			res.end(JSON.stringify(results));
		});
	});

	//rest api to delete record from mysql database
	api.delete('/', (req, res) => {
		console.log(req.body);
		db.query('DELETE FROM ' + table + ' WHERE `id`=?', [req.body.id], (error, results, fields) => {
			if (error) throw error;
			res.end('Record has been deleted!');
		});
	});
	return api;
};

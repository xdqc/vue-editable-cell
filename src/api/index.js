import { version } from '../../package.json';
import { Router } from 'express';
import vendors from './vendors';

export default ({ config, db }) => {
	let api = Router();

	// mount the vendors router
	api.use('/vendors', vendors({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
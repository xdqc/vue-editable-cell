import { version } from '../../package.json';
import { Router } from 'express';
import entries from './entries';

export default ({ config, db }) => {
	let api = Router();

	// mount the vendors router
	api.use('/vendors', entries({ config, db }, 'vendor'));

	// mount the users router
	api.use('/users', entries({ config, db }, 'user'));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
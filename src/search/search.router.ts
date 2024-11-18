import { Router } from 'express';
import { searchController } from './search.controller';

class SearchRouter {
	public readonly router: Router;

	constructor() {
		this.router = Router().get('/', searchController.search.bind(searchController));
	}
}
export const searchRouter = new SearchRouter().router;
import { Request, Response } from 'express';
import { logger } from '../logger';

import { HttpError } from 'http-errors';
import { SearchRequestDTO } from './dto';
import { SearchFormatterService, SearchParserService, SearchService } from './services';
import { SearchRequest } from './models';

class SearchController {

	constructor(
		private readonly searchParserService: SearchParserService,
		private readonly searchService: SearchService,
		private readonly searchFormatterService: SearchFormatterService
	) {
	}

	// Route handler for /search
	public async search(req: Request<any, any, any, SearchRequestDTO>, res: Response) {
		try {
			
			logger.debug('search: query : ', req.query);
			const params: SearchRequest = this.searchParserService.parse(req.query);
			logger.debug('search: params : ', params);
			
			const result = await this.searchService.perform(params);
			logger.debug('search: result : ', result);

			const response = this.searchFormatterService.format(result);
			logger.debug('search: response : ', response);
			
			res.status(200).json(response);
		} catch (error: unknown) {
			logger.error(error);
			if (error instanceof HttpError) {
				res.status(error.statusCode).json({ error: error.message });
				return;
			}
			res.status(500).json({ error: 'An error occurred while processing the request' });
		}
	}
}
export const searchController = new SearchController(
	new SearchParserService(),
	new SearchService(),
	new SearchFormatterService()
);
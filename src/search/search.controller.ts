import { Request, Response } from 'express';
import { logger } from '../logger';

import { HttpError } from 'http-errors';
import { SearchRequestDTO } from './dto';
import { SearchFormatterService, SearchParserService, SearchService } from './services';

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
			logger.info('search: begin');
			const params = this.searchParserService.parse(req.query);
			logger.info('search: params : ', params);
			
			const result = await this.searchService.perform(params);
			logger.info('search: result : ', result);
			const response = this.searchFormatterService.format(result);
			logger.info('search: response : ', response);
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
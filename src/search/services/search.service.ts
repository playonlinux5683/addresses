import placekit, { PKClient } from "@placekit/client-js";
import { logger } from "../../logger";
import { SearchRequest, SearchResponse } from "../models";

export class SearchService {

	private pkClient!: PKClient;

	constructor() {
		const PLACEKIT_API_KEY = process.env.PLACEKIT_API_KEY || 'pk_ole+bOPq2agFD7gQf9LRZbHkGRIiFRZrtnaMTMMqzu8=';
		if (!PLACEKIT_API_KEY) {
			logger.error('PLACEKIT_API_KEY is not set. Please set it in the environment variables.');
			process.exit(1);
		}

		this.pkClient = placekit(PLACEKIT_API_KEY);
	}

	public async perform(params: SearchRequest): Promise<SearchResponse> {
		return this.pkClient.search(params.query, {
			types: ['street'],
			countries: params.countries
		}).catch((error) => { throw error; });

	}
}
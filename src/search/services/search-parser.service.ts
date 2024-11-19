import createHttpError from "http-errors";
import { ParserService } from "../../parser.interface";
import { SearchRequestDTO } from "../dto";
import { SearchRequest } from "../models";

const COUNTRIES = [
	'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE',
	'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV',
	'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
	'SI', 'ES', 'SE', // EU countries
	'TN', 'ML', 'SN', 'CI', 'BF', 'CM', 'CG', 'GA',
	'TD', 'PH', 'KM', 'HT', 'LK', 'GN', 'MR', 'CD' // Additional countries
];

export class SearchParserService implements ParserService<SearchRequestDTO, SearchRequest> {

	parse(request: SearchRequestDTO): SearchRequest {
		const { query, countries = COUNTRIES } = request;
		if (!query || typeof query !== 'string') {
			throw createHttpError(400, 'Query parameter is required and must be a string')
		}
		return { query, countries };
	}

}
import createHttpError from "http-errors";
import { ParserService } from "../../parser.interface";
import { SearchRequestDTO } from "../dto";
import { SearchRequest } from "../models";

const DEFAULT_COUNTRIES = [
	'AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE',
	'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV',
	'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK',
	'SI', 'ES', 'SE', 
	'TN', 'ML', 'SN', 'CI', 'BF', 'CM', 'CG', 'GA',
	'TD', 'PH', 'KM', 'HT', 'LK', 'GN', 'MR', 'CD'
];
const DEFAULT_COORDINATES = '48.856483,2.352414';
const DEFAULT_LANGUAGE = 'fr';

export class SearchParserService implements ParserService<SearchRequestDTO, SearchRequest> {

	parse(request: SearchRequestDTO): SearchRequest {
		const { 
			query, 
			countries = DEFAULT_COUNTRIES, 
			coordinates = DEFAULT_COORDINATES, 
			language = DEFAULT_LANGUAGE 
		} = request;

		if (!query || typeof query !== 'string') {
			throw createHttpError(400, 'Query parameter is required and must be a string')
		}
		return { query, countries, coordinates, language };
	}

}
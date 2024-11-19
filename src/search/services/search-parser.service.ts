import createHttpError from "http-errors";
import { ParserService } from "../../parser.interface";
import { SearchRequestDTO } from "../dto";
import { SearchRequest } from "../models";

const COUNTRIES = [
	'at', 'be', 'bg', 'hr', 'cy', 'cz', 'dk', 'ee',
	'fi', 'fr', 'de', 'el', 'hu', 'ie', 'it', 'lv',
	'lt', 'lu', 'mt', 'nl', 'pl', 'pt', 'ro', 'sk',
	'si', 'es', 'se', // EU countries
	'tn', 'ml', 'sn', 'ci', 'bf', 'cm', 'cg', 'ga',
	'td', 'ph', 'km', 'ht', 'lk', 'gn', 'mr', 'cd' // Additional countries
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
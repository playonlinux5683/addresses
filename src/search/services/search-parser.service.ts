import createHttpError from "http-errors";
import { ParserService } from "../../parser.interface";
import { SearchRequestDTO } from "../dto";
import { SearchRequest } from "../models";

export class SearchParserService implements ParserService<SearchRequestDTO, SearchRequest> {

	parse(request: SearchRequestDTO): SearchRequest {
		if (!request.query || typeof request.query !== 'string') {
			throw createHttpError(400, 'Query parameter is required and must be a string')
		}
		return request;
	}

}
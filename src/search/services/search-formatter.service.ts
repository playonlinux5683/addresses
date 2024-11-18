import { FormatterService } from "../../formatter.interface";
import { SearchResponseDTO } from "../dto";
import { SearchResponse } from "../models";

export class SearchFormatterService implements FormatterService<SearchResponse, SearchResponseDTO> {

	format(response: SearchResponse): SearchResponseDTO {
		return response.results;
	}

}
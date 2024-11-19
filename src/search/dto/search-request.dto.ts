export interface SearchRequestDTO {
    query: string;
    countries?: string[];
    coordinates?: string;
    language?: string;
}
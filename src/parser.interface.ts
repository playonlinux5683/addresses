export interface ParserService<T, U> {
    parse(query: T): U;
}
export interface FormatterService<T, U> {
	format(data: T): U;
}
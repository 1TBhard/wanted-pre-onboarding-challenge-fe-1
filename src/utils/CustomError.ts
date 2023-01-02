// interface WantedErrorResponse {
// 	details: string;
// }

class CustomError extends Error {
	constructor({
		errorResponse,
		customErrorMessage,
	}: {
		errorResponse?: any;
		customErrorMessage?: string;
	}) {
		const message = errorResponse?.details ?? customErrorMessage;

		super(message);
	}
}

export default CustomError;

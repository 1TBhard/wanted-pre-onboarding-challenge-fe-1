const LOCAL_STORAGE_TOKEN_KEY = "token";

export class Token {
	isEmpty() {
		return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) == null;
	}

	getToken() {
		return localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
	}

	setToken(newToken: string) {
		if (newToken.length === 0) {
			throw Error("토큰의 길이는 최대 1자 이상압니다.");
		}

		localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, newToken);
	}

	removeToken() {
		localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
	}
}

const token = new Token();

export default token;

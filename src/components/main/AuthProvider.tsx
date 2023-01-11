import token, { Token } from "src/utils/Token";
import { createContext, ReactNode } from "react";

export const AuthContext = createContext<Token>(null);

export default function AuthProvider({ children }: { children: ReactNode }) {
	return <AuthContext.Provider value={token}>{children}</AuthContext.Provider>;
}

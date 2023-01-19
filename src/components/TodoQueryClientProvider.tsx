import { QueryClient, QueryClientProvider } from "react-query";
import { ReactNode } from "react";

export const todoQueryClient = new QueryClient();

export const TodoQueryClientProvider = ({
	children,
}: {
	children: ReactNode;
}) => {
	return (
		<QueryClientProvider client={todoQueryClient}>
			{children}
		</QueryClientProvider>
	);
};

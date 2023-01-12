import * as Styled from "./MainLayout.style";
import { ReactNode } from "react";

export const MainLayout = ({ children }: { children: ReactNode }) => {
	return <Styled.Frame>{children}</Styled.Frame>;
};

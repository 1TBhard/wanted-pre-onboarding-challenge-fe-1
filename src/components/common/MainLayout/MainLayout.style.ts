import { NAVIGATION_HEIGHT } from "src/constants/style/NAVIGATION_HEIGHT";
import styled from "styled-components";

export const Frame = styled.div`
	height: calc(100vh - ${NAVIGATION_HEIGHT});
	margin: 0 max(10vw, 100px);
	margin-top: 20px;
`;

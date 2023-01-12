import { NAVIGATION_HEIGHT } from "src/constants/style/NAVIGATION_HEIGHT";
import styled from "styled-components";

export const Frame = styled.div`
	height: calc(100vh - ${NAVIGATION_HEIGHT});
	width: 100vw;
`;

import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";
import { NAVIGATION_HEIGHT } from "src/constants/style/NAVIGATION_HEIGHT";

export const Frame = styled.div`
	display: flex;
	justify-content: center;
	width: 100vw;
	height: ${NAVIGATION_HEIGHT};
`;

export const Link = styled(RouterLink)`
	text-decoration: none;
	color: #000;

	&:hover {
		color: #219ebc;
	}
`;

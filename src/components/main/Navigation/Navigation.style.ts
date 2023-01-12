import styled from "styled-components";
import { Link as RouterLink } from "react-router-dom";

export const Frame = styled.div`
	position: fixed;
	display: flex;
	justify-content: center;
	width: 100vw;
`;

export const Link = styled(RouterLink)`
	text-decoration: none;
	color: #000;

	&:hover {
		color: #219ebc;
	}
`;

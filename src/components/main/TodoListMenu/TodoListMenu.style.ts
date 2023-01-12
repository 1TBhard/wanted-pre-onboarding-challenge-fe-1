import styled from "styled-components";

export const Frame = styled.div``;

export const MenuHeader = styled.div`
	text-align: center;
	border-bottom: 1px solid black;
	font-weight: bold;
`;

export const MenuItem = styled.div`
	width: 200px;
	overflow: hidden;
	text-overflow: ellipsis;

	padding: 10px 0;

	cursor: pointer;

	&:hover {
		color: #219ebc;
	}
`;

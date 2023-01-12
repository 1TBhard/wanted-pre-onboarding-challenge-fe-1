import styled from "styled-components";

export const Frame = styled.div`
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 500px;
`;

export const Body = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

export const Label = styled.label``;

export const Input = styled.input`
	width: 300px;
`;

export const Error = styled.div`
	position: relative;
	color: red;
	font-size: 20px;
`;

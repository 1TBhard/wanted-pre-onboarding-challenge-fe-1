import styled from "styled-components";

export const Frame = styled.div`
	margin-bottom: 16px;
	display: flex;
	flex-direction: column;
	gap: 10px;
`;

export const Body = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	gap: 40px;
`;

export const Label = styled.label`
	width: 150px;
`;

export const Textarea = styled.textarea`
	width: 100%;
	height: 100%;
	resize: none;
`;

export const Error = styled.div`
	position: relative;
	color: red;
	font-size: 20px;
`;

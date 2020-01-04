import styled from 'styled-components';

export const Container = styled.div`
	display: block;
	justify-content: center;
	align-items: center;
	width: 100%;
`;

export const PageTitle = styled.h1`
	text-decoration: underline;
	text-align: center;
	@media (max-width: 575px) {
		text-align: unset;
		margin-left: 15px;
	}
`;

export const ErrorMsg = styled.div`
	text-align: center;
`;

import styled from 'styled-components';

export const Container = styled.div`
	float: right;
	margin-right: 20px;
	@media (max-width: 575px) {
		float: unset;
		margin-left: 20px;
		margin-top: 15px;
	}
`;

export const Label = styled.div`
	display: inline;
	font-weight: bold;
`;

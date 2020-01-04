import styled from 'styled-components';

export const StyledCard = styled.div`
	margin: 20px;
	border: solid 2px;
`;

export const Currency = styled.h5`
	font-weight: bold;
	text-align: right;
	vertical-align: top;
	padding-right: 5px;
	@media (max-width: 575px) {
		padding-top: 5px;
		padding-right: 10px;
	}
`;

export const Title = styled.div`
	color: gray;
	font-size: small;
`;

export const Info = styled.div`
	font-weight: bold;
`;

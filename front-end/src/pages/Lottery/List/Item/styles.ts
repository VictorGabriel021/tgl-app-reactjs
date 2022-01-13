import styled from "styled-components";

export const ItemContent = styled.div`
  border-left: solid 5px red;
  padding-left: 10px;
  margin: 25px 0;
`;

const ColorParagraph = styled.p`
  color: #868686;
`;

export const TextParagraphBold = styled(ColorParagraph)`
  font-weight: bold;
`;

export const TextParagraph = styled(ColorParagraph)`
  line-height: 0;
`;

import styled from "styled-components";

export const IconTrash = styled.span`
  font-size: 25px;
  margin-right: 10px;
  cursor: pointer;
`;
export const ColorGame = styled.span<{ color: string }>`
  color: ${(props) => props.color};
  font-weight: bold;
`;

export const ItemContent = styled.div<{ color: string }>`
  border-left: solid 5px ${(props) => props.color};
  padding-left: 10px;
  margin: 25px 0;
  min-height: 60px;
`;

const ColorParagraph = styled.p`
  color: #868686;
`;

export const TextParagraphBold = styled(ColorParagraph)`
  font-weight: bold;
  overflow-wrap: break-word;
`;

export const TextParagraphBoldMedia = styled(TextParagraphBold)`
  @media (min-width: 991.98px) and (max-width: 1199px) {
    max-width: 55%;
  }
  @media (min-width: 1200px) and (max-width: 1400px) {
    max-width: 70%;
  }
`;

export const TextParagraph = styled(ColorParagraph)`
  line-height: 0;
`;

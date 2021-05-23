import React from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import palette from "../../libs/style/palette";

interface IconButtonProps {
  icon: React.ReactNode;
  description: string;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, description }) => {
  return (
    <Button active={false}>
      {icon}
      <div className="description">{description}</div>
    </Button>
  );
};

export default IconButton;

const Button = styled.button<{ active: boolean }>`
  outline: none;
  flex: 1;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: bold;
  background: white;
  font-size: 1.125rem;
  color: ${palette.blueGray600};
  border: 1px solid ${palette.blueGray300};
  padding: 0;
  padding-left: 1rem;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #fdfdfd;
  }
  ${(props) =>
    props.active &&
    css`
      border: solid 1px ${palette.amber300};
      color: ${palette.amber300};
    `}
  svg {
  }
  & + & {
    margin-left: 1rem;
  }
  .description {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

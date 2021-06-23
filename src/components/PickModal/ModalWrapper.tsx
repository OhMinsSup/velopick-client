import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { BiX } from "react-icons/bi";
import zIndexes from "../../libs/style/zIndexes";
import palette from "../../libs/style/palette";
import media from "../../libs/style/media";

interface ModalWrapperProps {
  side: React.ReactNode;
  visible: boolean;
  onClose: () => void;
}
const ModalWrapper: React.FC<ModalWrapperProps> = ({
  side,
  visible,
  children,
  onClose,
}) => {
  const [closed, setClosed] = useState(true);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;
    if (visible) {
      setClosed(false);
    } else {
      timeoutId = setTimeout(() => {
        setClosed(true);
      }, 200);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [visible]);

  if (!visible && closed) return null;

  return (
    <ModalBlock visible={visible}>
      <div className="wrapper">
        <div className="right-block">
          <ExitBlock className="flex lg:hidden absolute z-50 right-8 top-8">
            <BiX onClick={onClose} />
          </ExitBlock>
          <div className="block-content">{children}</div>
        </div>
        <div className="left-block">
          <ExitBlock className="flex">
            <BiX onClick={onClose} />
          </ExitBlock>
          <div className="block-content">{side}</div>
        </div>
      </div>
    </ModalBlock>
  );
};

export default ModalWrapper;

const ModalBlock = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: ${zIndexes.Modal};
  .wrapper {
    flex: 1;
    width: auto;
    height: 100%;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.09);
    display: flex;

    ${(props) =>
    props.visible
      ? css`
            animation: popInFromBottom 0.4s forwards ease-in-out;
          `
      : css`
            animation: popOutToBottom 0.2s forwards ease-in-out;
          `}

    .right-block {
      flex: 1;
      background: white;
      /* padding: 1.5rem; */
      display: flex;
      flex-direction: column;
      overflow-y: auto;

      .block-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
    }

    .left-block {
      ${media.medium} {
        display: none;
      }

      padding: 1.5rem;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      background: white;
      .block-content {
        width: 400px;
      }
    }
  }
`;

const ExitBlock = styled.div`
  justify-content: flex-end;
  font-size: 1.5rem;
  color: ${palette.blueGray600};
  margin-bottom: 2.25rem;
  margin-bottom: 0;

  &:hover {
    color: ${palette.red400};
  }

  svg {
    cursor: pointer;
  }
`;

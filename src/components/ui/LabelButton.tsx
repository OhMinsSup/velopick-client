import React, { useCallback } from "react";

interface LabelButtonProps {
  icon: React.ReactNode;
  name: string;
  text: string;
  onClickLabel: (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>,
    name: string
  ) => void;
}
const LabelButton: React.FC<LabelButtonProps> = ({
  icon,
  text,
  onClickLabel,
  name,
}) => {
  const onClick = useCallback((e) => {
    onClickLabel(e, name);
  }, []);

  return (
    <label
      className="flex flex-row items-center mb-3 opacity-50 cursor-pointer button-transparent hover:opacity-100"
      onClick={onClick}
    >
      {icon}
      <span>{text}</span>
    </label>
  );
};

export default LabelButton;

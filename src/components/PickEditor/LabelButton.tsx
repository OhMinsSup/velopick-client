import React from "react";

interface LabelButtonProps {
  icon: React.ReactNode;
  text: string;
}
const LabelButton: React.FC<LabelButtonProps> = ({ icon, text }) => {
  return (
    <label className="flex flex-row items-center mb-10 opacity-50 cursor-pointer button-transparent hover:opacity-100">
      {icon}
      <span>{text}</span>
    </label>
  );
};

export default LabelButton;

import React from "react";
import Button from "./Button";

export default function ConfirmBox({
  buttons = [],
  title = "Confirm",
  subTitle = "Are you sure you want to proceed?",
}) {
  const getButtonVariant = (type) => {
    if (type === "confirm") return "primary";
    if (type === "danger") return "danger";
    return "outline";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[9999]">
      <div className="flex flex-col items-center p-5 bg-bgComponent rounded-lg shadow-lg space-y-4">
        <h1 className="text-lg font-bold text-primary">{title}</h1>
        <h2>{subTitle}</h2>

        <div className="flex flex-row gap-3 justify-center items-center">
          {buttons.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              variant={getButtonVariant(button.type)}
            >
              {button.content}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

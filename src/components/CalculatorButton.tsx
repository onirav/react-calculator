import { useEffect, useRef } from "react";
import { Control } from "../utils/types";

const CalculatorButton: React.FC<Control> = ({
  controlId,
  controlText,
  onClick,
}) => {
  const buttonRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const button = buttonRef.current;

    const handleContextMenu = (event: MouseEvent) => event.preventDefault();
    const handleDoubleClick = (event: MouseEvent) => event.preventDefault();

    if (button) {
      button.addEventListener("contextmenu", handleContextMenu);
      button.addEventListener("dblclick", handleDoubleClick);
    }

    return () => {
      if (button) {
        button.removeEventListener("contextmenu", handleContextMenu);
        button.removeEventListener("dblclick", handleDoubleClick);
      }
    };
  }, []);

  return (
    <span id={controlId} onClick={onClick} ref={buttonRef}>
      {controlText}
    </span>
  );
};

export default CalculatorButton;

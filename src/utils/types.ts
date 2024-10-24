export interface Control {
  controlId: string;
  controlText: string;
  controlType?: "number" | "operator" | "decimal" | "equal" | "reset" | "clear";
  onClick?: () => void;
}

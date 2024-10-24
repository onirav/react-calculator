import React from "react";

interface HistoryPanelProps {
  history: string[];
  isOpen: boolean;
  onClose: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({
  history,
  isOpen,
  onClose,
}) => {
  return (
    <div className={`history ${isOpen ? "open" : ""}`}>
      <span onClick={onClose} className="close-button">
        X
      </span>

      <h3 className="title">History</h3>

      <ul>
        {history.length > 0 ? (
          history.map((entry, index) => <li key={index}>{entry}</li>)
        ) : (
          <li>No history available.</li>
        )}
      </ul>
    </div>
  );
};

export default HistoryPanel;

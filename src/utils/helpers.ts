// Set the maximum number of digits for display
export const MAX_DIGITS = 10;

// Helper function to format the number on the screen
export const FormatValue = (value: string): string => {
  if (value.length > MAX_DIGITS) {
    // If the number is too large, use exponential notation
    return parseFloat(value).toExponential(3);
  }
  return value;
};

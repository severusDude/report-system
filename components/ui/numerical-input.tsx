import React from "react";
import { Input } from "@/components/ui/input"; // Adjust the import path for your shadcn/ui Input component

// --- Handlers ---

/**
 * Handles individual key presses to ensure only numerical characters and specific controls are entered.
 */
const handleNumericalInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
  // Allow special keys (e.g., navigation, deletion, decimal point)
  if (
    ["Backspace", "Delete", "Tab", "Escape", "Enter", "."].includes(event.key)
  ) {
    return;
  }

  // Allow standard modifier key combinations (e.g., Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X)
  if (
    (event.ctrlKey || event.metaKey) &&
    ["a", "c", "v", "x"].includes(event.key)
  ) {
    return;
  }

  // Prevent non-numeric input (includes spaces and all letters/symbols)
  if (isNaN(Number(event.key)) || event.key === " ") {
    event.preventDefault();
  }
};

/**
 * Handles paste actions to ensure no non-numerical content is pasted.
 */
const handleNumericalPaste = (
  event: React.ClipboardEvent<HTMLInputElement>
) => {
  const pastedData = event.clipboardData?.getData("Text");

  if (pastedData) {
    // Regular Expression: /[^0-9.]/g matches any character that is NOT a digit (0-9) and NOT a period (.)
    const nonNumericRegex = /[^0-9.]/g;

    // If non-numerical characters are found, prevent the paste
    if (nonNumericRegex.test(pastedData)) {
      event.preventDefault();
    }
  }
};

// --- Component Definition ---
interface NumericalInputProps extends React.ComponentProps<"input"> {
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
}

/**
 * A wrapper around the shadcn/ui Input component that enforces numerical-only input.
 */
export const NumericalInput = React.forwardRef<
  HTMLInputElement,
  NumericalInputProps
>(({ onKeyDown, onPaste, ...props }, ref) => {
  return (
    <Input
      ref={ref}
      // Merge the custom numerical handlers with any handlers passed in by the user (props)
      onKeyDown={(e) => {
        handleNumericalInput(e);
        onKeyDown?.(e); // Call user-defined onKeyDown if it exists
      }}
      onPaste={(e) => {
        handleNumericalPaste(e);
        onPaste?.(e); // Call user-defined onPaste if it exists
      }}
      // Set the native type to 'text' for maximum control over input masking
      type="text"
      {...props}
    />
  );
});

NumericalInput.displayName = "NumericalInput";

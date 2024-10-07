import React, {
  createContext,
  useContext,
  ReactNode,
  TextareaHTMLAttributes,
} from "react";

interface TextAreaContextProps {
  errorMessage?: string;
}

const TextAreaContext = createContext<TextAreaContextProps | undefined>(
  undefined,
);

interface TextAreaRootProps {
  children: ReactNode;
  errorMessage?: string;
}

export function TextAreaRoot({ children, errorMessage }: TextAreaRootProps) {
  return (
    <TextAreaContext.Provider value={{ errorMessage }}>
      <div className="mb-4 flex flex-col">{children}</div>
    </TextAreaContext.Provider>
  );
}

interface TextAreaLabelProps {
  children: ReactNode;
}

export function TextAreaLabel({ children }: TextAreaLabelProps) {
  return (
    <label className="mb-1 text-sm font-medium text-gray-700">{children}</label>
  );
}

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  icon?: ReactNode;
}

export function TextAreaField({ icon, ...props }: TextAreaFieldProps) {
  return (
    <div className="flex items-center rounded-md border border-gray-300 focus-within:border-blue-500">
      {icon && <span className="p-2">{icon}</span>}
      <textarea className="flex-1 resize-none p-2 outline-none" {...props} />
    </div>
  );
}

export function TextAreaErrorMessage() {
  const context = useContext(TextAreaContext);
  if (!context) {
    throw new Error("TextAreaErrorMessage must be used within a TextAreaRoot");
  }

  return context.errorMessage ? (
    <span className="mt-1 text-xs text-red-500">{context.errorMessage}</span>
  ) : null;
}

export const TextArea = {
  Root: TextAreaRoot,
  Label: TextAreaLabel,
  Field: TextAreaField,
  ErrorMessage: TextAreaErrorMessage,
};

import React, {
  createContext,
  useContext,
  ReactNode,
  InputHTMLAttributes,
} from "react";

interface InputContextProps {
  errorMessage?: string;
}

const InputContext = createContext<InputContextProps | undefined>(undefined);

interface InputRootProps {
  children: ReactNode;
  errorMessage?: string;
}

export function InputRoot({ children, errorMessage }: InputRootProps) {
  return (
    <InputContext.Provider value={{ errorMessage }}>
      <div className="mb-4 flex flex-col">{children}</div>
    </InputContext.Provider>
  );
}

interface InputLabelProps {
  children: ReactNode;
}

export function InputLabel({ children }: InputLabelProps) {
  return (
    <label className="mb-1 text-sm font-medium text-gray-700">{children}</label>
  );
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
}

export function InputField({ icon, ...props }: InputFieldProps) {
  return (
    <div className="flex items-center rounded-md border border-gray-300 focus-within:border-blue-500">
      {icon && <span className="p-2">{icon}</span>}
      <input className="flex-1 p-2 outline-none" {...props} />
    </div>
  );
}

export function InputErrorMessage() {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("InputErrorMessage must be used within an InputRoot");
  }

  return context.errorMessage ? (
    <span className="mt-1 text-xs text-red-500">{context.errorMessage}</span>
  ) : null;
}

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Field: InputField,
  ErrorMessage: InputErrorMessage,
};

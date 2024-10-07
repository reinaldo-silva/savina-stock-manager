import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import React, {
  createContext,
  useContext,
  ReactNode,
  InputHTMLAttributes,
  forwardRef,
} from "react";

interface InputContextProps {
  errorMessage?: string;
}

const InputContext = createContext<InputContextProps | undefined>(undefined);

interface InputRootProps {
  children: ReactNode;
  errorMessage?: string;
  className?: string;
}

export function InputRoot({
  children,
  errorMessage,
  className,
}: InputRootProps) {
  return (
    <InputContext.Provider value={{ errorMessage }}>
      <div className={clsx("relative flex flex-col pb-4", className)}>
        {children}
      </div>
    </InputContext.Provider>
  );
}

interface InputLabelProps {
  children: ReactNode;
}

export function InputLabel({ children }: InputLabelProps) {
  return (
    <label className="mb-0.5 text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  Icon?: LucideIcon;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ Icon, ...props }, ref) => {
    return (
      <div className="flex items-center border border-gray-300 focus-within:border-blue-500">
        {Icon && <Icon />}
        <input ref={ref} className="flex-1 p-2 outline-none" {...props} />
      </div>
    );
  },
);

InputField.displayName = "InputField";

export function InputErrorMessage() {
  const context = useContext(InputContext);
  if (!context) {
    throw new Error("InputErrorMessage must be used within an InputRoot");
  }

  return context.errorMessage ? (
    <span className="absolute bottom-0 w-full truncate text-xs text-red-500">
      {context.errorMessage}
    </span>
  ) : null;
}

export const Input = {
  Root: InputRoot,
  Label: InputLabel,
  Field: InputField,
  ErrorMessage: InputErrorMessage,
};

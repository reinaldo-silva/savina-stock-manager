import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import {
  ComponentProps,
  createContext,
  forwardRef,
  ReactNode,
  useContext,
} from "react";

interface TextAreaContextProps {
  errorMessage?: string;
}

const TextAreaContext = createContext<TextAreaContextProps | undefined>(
  undefined,
);

interface TextAreaRootProps {
  children: ReactNode;
  className?: string;
  errorMessage?: string;
}

export function TextAreaRoot({
  children,
  errorMessage,
  className,
}: TextAreaRootProps) {
  return (
    <TextAreaContext.Provider value={{ errorMessage }}>
      <div className={clsx("relative flex flex-col pb-4", className)}>
        {children}
      </div>
    </TextAreaContext.Provider>
  );
}

interface TextAreaLabelProps {
  children: ReactNode;
}

export function TextAreaLabel({ children }: TextAreaLabelProps) {
  return (
    <label className="mb-0.5 text-sm font-medium text-gray-700">
      {children}
    </label>
  );
}

interface TextAreaFieldProps extends ComponentProps<"textarea"> {
  Icon?: LucideIcon;
}
export const TextAreaField = forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(({ Icon, ...props }, ref) => {
  return (
    <div className="flex items-center border border-gray-300 focus-within:border-blue-500">
      {Icon && <Icon />}
      <textarea ref={ref} className="flex-1 p-2 outline-none" {...props} />
    </div>
  );
});

TextAreaField.displayName = "TextAreaField";

export function TextAreaErrorMessage() {
  const context = useContext(TextAreaContext);
  if (!context) {
    throw new Error("TextAreaErrorMessage must be used within a TextAreaRoot");
  }

  return context.errorMessage ? (
    <span className="absolute bottom-0 w-full truncate text-xs text-red-500">
      {context.errorMessage}
    </span>
  ) : null;
}

export const TextArea = {
  Root: TextAreaRoot,
  Label: TextAreaLabel,
  Field: TextAreaField,
  ErrorMessage: TextAreaErrorMessage,
};

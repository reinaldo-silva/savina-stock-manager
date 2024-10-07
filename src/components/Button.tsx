import clsx from "clsx";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import { zinc } from "tailwindcss/colors";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  Icon?: LucideIcon;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ Icon, children, disabled, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          "flex items-center gap-2 border p-2",
          {
            "cursor-not-allowed bg-zinc-300": disabled,
            "bg-zinc-100": !disabled,
          },
          className,
        )}
        disabled={disabled}
        {...rest}
      >
        {children}
        {Icon && <Icon size={20} color={zinc[600]} />}
      </button>
    );
  },
);

Button.displayName = "Button";

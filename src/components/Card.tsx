import React, { ComponentProps, ReactNode } from "react";
import clsx from "clsx";

interface CardRootProps extends ComponentProps<"div"> {
  children: ReactNode;
  className?: string;
}

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

const Root = ({ children, className, ...rest }: CardRootProps) => {
  return (
    <div className={clsx("border bg-zinc-100 shadow", className)} {...rest}>
      {children}
    </div>
  );
};

const Header = ({ children, className }: CardSectionProps) => {
  return <div className={clsx("border-b p-4", className)}>{children}</div>;
};

const Body = ({ children, className }: CardSectionProps) => {
  return <div className={clsx("p-4", className)}>{children}</div>;
};

const Footer = ({ children, className }: CardSectionProps) => {
  return <div className={clsx("border-t p-4", className)}>{children}</div>;
};

export const Card = {
  Root,
  Header,
  Body,
  Footer,
};

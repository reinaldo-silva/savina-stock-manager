import React, { ReactNode } from "react";
import clsx from "clsx";

interface CardRootProps {
  children: ReactNode;
  className?: string;
}

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

const Root = ({ children, className }: CardRootProps) => {
  return (
    <div className={clsx("rounded-lg border shadow", className)}>
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

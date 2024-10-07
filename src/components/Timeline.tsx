import React, { ReactNode } from "react";
import clsx from "clsx";

interface TimelineRootProps {
  children: ReactNode;
  className?: string;
}

interface StepProps {
  title: string;
  description?: string;
  status?: "completed" | "in-progress" | "upcoming";
  className?: string;
}

interface StepIndicatorProps {
  status?: "completed" | "in-progress" | "upcoming";
}

const Root = ({ children, className }: TimelineRootProps) => {
  return (
    <div
      className={clsx("relative flex items-center justify-between", className)}
    >
      <div className="absolute inset-0 top-1/2 z-0 h-0.5 w-full -translate-y-1/2 transform bg-gray-300" />
      {children}
    </div>
  );
};

const Step = ({
  title,
  description,
  status = "upcoming",
  className,
}: StepProps) => {
  return (
    <div
      className={clsx("relative z-10 flex flex-col items-center", className)}
    >
      <StepIndicator status={status} />
      <div className="mt-2 text-center">
        <h3 className="font-medium">{title}</h3>
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
    </div>
  );
};

const StepIndicator = ({ status = "upcoming" }: StepIndicatorProps) => {
  return (
    <div
      className={clsx(
        "flex h-6 w-6 items-center justify-center rounded-full border-2",
        {
          "border-green-500 bg-green-500": status === "completed",
          "border-blue-500 bg-blue-100": status === "in-progress",
          "border-gray-300 bg-white": status === "upcoming",
        },
      )}
    />
  );
};

export const Timeline = {
  Root,
  Step,
  StepIndicator,
};

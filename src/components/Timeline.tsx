import clsx from "clsx";
import { ReactNode } from "react";
import { Text } from "./Text";

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
      className={clsx(
        "flex flex-wrap border-b border-zinc-300 pb-4",
        className,
      )}
    >
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
      className={clsx(
        "relative z-10 flex w-[160px] grow flex-col items-center",
        className,
      )}
    >
      <StepIndicator status={status} />
      <div className="mt-2 text-center">
        <Text size="sm" className="font-medium">
          {title}
        </Text>
        {description && (
          <Text size="xs" className="text-sm text-gray-500">
            {description}
          </Text>
        )}
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
          "border-zinc-600 bg-zinc-500": status === "completed",
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

import { ChevronDown } from "lucide-react";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface SelectContextProps {
  isOpen: boolean;
  selected: string | null;
  toggleOpen: () => void;
  selectOption: (value: string) => void;
}

const SelectContext = createContext<SelectContextProps | undefined>(undefined);

interface SelectRootProps {
  children: ReactNode;
}

export function SelectRoot({ children }: SelectRootProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  const selectOption = (value: string) => {
    setSelected(value);
    setIsOpen(false);
  };

  return (
    <SelectContext.Provider
      value={{ isOpen, selected, toggleOpen, selectOption }}
    >
      <div className="relative inline-block w-full">{children}</div>
    </SelectContext.Provider>
  );
}

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used within a SelectProvider");
  }
  return context;
}

interface SelectTriggerProps {
  placeholder: string;
}

export function SelectTrigger({ placeholder }: SelectTriggerProps) {
  const { toggleOpen, selected } = useSelectContext();

  return (
    <button
      onClick={toggleOpen}
      className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2"
    >
      <span>{selected ? selected : placeholder}</span>
      <ChevronDown />
    </button>
  );
}

interface OptionListProps {
  children: ReactNode;
}

export function SelectOptionList({ children }: OptionListProps) {
  const { isOpen } = useSelectContext();

  if (!isOpen) return null;

  return (
    <ul className="absolute left-0 right-0 z-10 mt-1 max-h-60 overflow-auto rounded-md border border-gray-300 bg-white shadow-md">
      {children}
    </ul>
  );
}

interface OptionProps {
  value: string;
  children: ReactNode;
}

export function SelectOption({ value, children }: OptionProps) {
  const { selectOption } = useSelectContext();

  return (
    <li
      onClick={() => selectOption(value)}
      className="cursor-pointer px-4 py-2 hover:bg-gray-100"
    >
      {children}
    </li>
  );
}

export const Select = {
  Root: SelectRoot,
  Trigger: SelectTrigger,
  OptionList: SelectOptionList,
  Option: SelectOption,
};

import clsx from "clsx";
import { X } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Card } from "./Card";

interface ModalRootProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

interface ModalContentProps {
  children: ReactNode;
  className?: string;
}

interface ModalHeaderProps {
  children: ReactNode;
}

interface ModalFooterProps {
  children: ReactNode;
}

interface ModalCloseButtonProps {
  onClose: () => void;
}

const Root = ({ isOpen, onClose, children }: ModalRootProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted || !isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <Overlay onClose={onClose}>{children}</Overlay>
    </div>,
    document.body,
  );
};

const Overlay = ({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <Card.Root
        className="relative w-full max-w-3xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </Card.Root>
    </div>
  );
};

const Content = ({ children, className }: ModalContentProps) => {
  return <div className={clsx("p-4", className)}>{children}</div>;
};

const Header = ({ children }: ModalHeaderProps) => {
  return <div className="mb-4 border-b pb-3">{children}</div>;
};

const Footer = ({ children }: ModalFooterProps) => {
  return (
    <div className="mt-4 flex gap-2 border-t border-zinc-300 pt-3">
      {children}
    </div>
  );
};

const CloseButton = ({ onClose }: ModalCloseButtonProps) => {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 text-gray-600 hover:text-gray-900 focus:outline-none"
    >
      <X />
    </button>
  );
};

export const Modal = {
  Root,
  Overlay,
  Content,
  Header,
  Footer,
  CloseButton,
};

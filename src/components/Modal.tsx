import { animated, useSpring } from "@react-spring/web";
import clsx from "clsx";
import { X } from "lucide-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
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

interface ModalContextProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalContext = createContext<ModalContextProps | null>(null);

const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModalContext must be used within a ModalProvider");
  }
  return context;
};

const Root = ({ isOpen, onClose, children }: ModalRootProps) => {
  const [shouldRender, setShouldRender] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setShouldRender(true);
    }
  }, [isOpen]);

  const closeModal = () => {
    onClose();
    setTimeout(() => setShouldRender(false), 300);
  };

  if (!shouldRender) return null;

  return ReactDOM.createPortal(
    <ModalContext.Provider value={{ isOpen, onClose: closeModal }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <Overlay>{children}</Overlay>
      </div>
    </ModalContext.Provider>,
    document.body,
  );
};

const Overlay = ({ children }: { children: ReactNode }) => {
  const { isOpen, onClose } = useModalContext();
  useEscapeToClose(onClose);
  const [currentAnimation, setCurrentAnimation] = useState(false);

  const overlaySpring = useSpring({
    opacity: currentAnimation ? 1 : 0,
    config: { duration: 300 },
  });

  useEffect(() => {
    setCurrentAnimation(!isOpen ? false : true);
  }, [isOpen]);

  return (
    <animated.div
      style={overlaySpring}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <CardComponent>{children}</CardComponent>
    </animated.div>
  );
};

const AnimatedCard = animated(Card.Root);

const CardComponent = ({ children }: { children: ReactNode }) => {
  const { isOpen } = useModalContext();
  const [currentAnimation, setCurrentAnimation] = useState(false);
  const cardSpring = useSpring({
    opacity: currentAnimation ? 1 : 0,
    transform: currentAnimation ? "scale(1)" : "scale(0.95)",
    config: { duration: 300 },
  });

  useEffect(() => {
    setCurrentAnimation(!isOpen ? false : true);
  }, [isOpen]);

  return (
    <AnimatedCard
      style={cardSpring}
      className="relative w-full max-w-3xl p-6"
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </AnimatedCard>
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

const useEscapeToClose = (onClose: () => void) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);
};

export const Modal = {
  Root,
  Overlay,
  Content,
  Header,
  Footer,
  CloseButton,
};

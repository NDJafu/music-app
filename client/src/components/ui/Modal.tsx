import { createContext, useContext, useState } from 'react';
import { BsX } from 'react-icons/bs';

export const ModalContext = createContext<{
  showModal: boolean;
  toggleModal: () => void;
}>({ showModal: false, toggleModal: () => {} });

export function Modal({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <ModalContext.Provider value={{ showModal, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
}

interface ModalTriggerProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

export function ModalTrigger({ children, ...props }: ModalTriggerProps) {
  const { toggleModal } = useContext(ModalContext);

  return (
    <button {...props} onClick={toggleModal}>
      {children}
    </button>
  );
}

interface ModalContentProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export function ModalContent({ children, ...props }: ModalContentProps) {
  const { showModal, toggleModal } = useContext(ModalContext);

  if (showModal)
    return (
      <>
        <div className="fixed inset-0 z-10 bg-black/50" onClick={toggleModal} />
        <div {...props} className={`z-20 p-8 ${props.className}`}>
          <button className="absolute right-8 top-8" onClick={toggleModal}>
            <BsX size={36} />
          </button>
          {children}
        </div>
      </>
    );
}

export function ModalTitle({ children }: { children: React.ReactNode }) {
  return <h1 className="text-2xl font-bold">{children}</h1>;
}

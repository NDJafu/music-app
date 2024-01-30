import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

export const DropdownContext = createContext<{
  showDropdown: boolean;
  toggleDropdown: () => void;
  subMenu: string;
  setActiveSubMenu: (menu: string) => void;
}>({
  showDropdown: false,
  toggleDropdown: () => {},
  subMenu: '',
  setActiveSubMenu: () => {},
});

export function Dropdown({ children }: { children: React.ReactNode }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [subMenu, setSubMenu] = useState('');

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function setActiveSubMenu(menu: string) {
    setSubMenu(menu);
  }

  return (
    <DropdownContext.Provider
      value={{ showDropdown, toggleDropdown, subMenu, setActiveSubMenu }}
    >
      <div className="relative">{children}</div>
    </DropdownContext.Provider>
  );
}

interface DropdownTriggerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

export function DropdownTrigger({ children, ...props }: DropdownTriggerProps) {
  const { toggleDropdown } = useContext(DropdownContext);

  return (
    <button {...props} onClick={toggleDropdown}>
      {children}
    </button>
  );
}

interface DropdownContentProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export function DropdownContent({ children, ...props }: DropdownContentProps) {
  const { showDropdown, toggleDropdown, setActiveSubMenu } =
    useContext(DropdownContext);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (!dropdownRef.current?.contains(event.target as Node) && showDropdown) {
      toggleDropdown();
      setActiveSubMenu('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [showDropdown]);

  if (showDropdown)
    return (
      <div
        {...props}
        className={`absolute right-0 z-10 w-56 rounded bg-neutral-900 p-1 shadow-lg shadow-black/50 ${props.className}`}
        ref={dropdownRef}
      >
        {children}
      </div>
    );
}

interface DropdownItemProps extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
  onClick: () => void;
}

export function DropdownItem({
  onClick,
  children,
  ...props
}: DropdownItemProps) {
  const { toggleDropdown, setActiveSubMenu } = useContext(DropdownContext);
  const menu = useContext(SubMenuContext);

  return (
    <button
      {...props}
      className={
        props.className ??
        'w-full items-center gap-2 rounded-sm p-2 text-start hover:bg-white/5'
      }
      onMouseOver={() => {
        if (!menu) setActiveSubMenu('');
      }}
      onClick={() => {
        onClick();
        toggleDropdown();
        setActiveSubMenu('');
      }}
    >
      {children}
    </button>
  );
}

export const SubMenuContext = createContext<string>('');

export function DropdownSubMenu({
  children,
  menu,
}: {
  children: React.ReactNode;
  menu: string;
}) {
  return (
    <SubMenuContext.Provider value={menu}>
      <div className="relative">{children}</div>
    </SubMenuContext.Provider>
  );
}

interface DropdownTriggerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  children: React.ReactNode;
}

export function DropdownSubMenuTrigger({
  children,
  ...props
}: DropdownTriggerProps) {
  const { subMenu, setActiveSubMenu } = useContext(DropdownContext);
  const menu = useContext(SubMenuContext);

  return (
    <button
      {...props}
      className={
        props.className ??
        `w-full items-center gap-2 rounded-sm p-2 text-start ${subMenu == menu && 'bg-white/5'}`
      }
      onMouseOver={() => setActiveSubMenu(menu)}
    >
      {children}
    </button>
  );
}

interface DropdownSubMenuContentProps
  extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
}

export function DropdownSubMenuContent({
  children,
  ...props
}: DropdownSubMenuContentProps) {
  const { subMenu } = useContext(DropdownContext);
  const menu = useContext(SubMenuContext);

  if (subMenu == menu)
    return (
      <div
        {...props}
        className={`absolute right-56 top-0 w-56 rounded bg-neutral-900 p-1 shadow-lg shadow-black/50 ${props.className}`}
      >
        {children}
      </div>
    );
}

export function DropdownSeparator() {
  return <div className="w-full border-b border-white/5" />;
}

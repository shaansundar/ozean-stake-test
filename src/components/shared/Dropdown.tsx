import React, { ReactNode, forwardRef } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";

interface DropdownProps {
  children: ReactNode;
  trigger: ReactNode;
  className?: string;
}

export const Dropdown = ({ children, trigger, className }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>{trigger}</DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx("min-w-fit bg-backgroundGrey flex rounded-3xl flex-col gap-2 p-2", className)}
          sideOffset={4}
        >
          {children}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface DropdownItemProps {
  children: ReactNode;
  className?: string;
  onSelect?: () => void;
}

export const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  ({ children, className, onSelect }, ref) => {
    return (
      <DropdownMenu.Item
        ref={ref}
        className={clsx(
          "outline-none select-none h-10 pl-3 pr-1 flex items-center text-sm rounded-3xl shadow transition-all cursor-pointer",
          className
        )}
        onSelect={onSelect}
      >
        {children}
      </DropdownMenu.Item>
    );
  }
);

DropdownItem.displayName = "DropdownItem";

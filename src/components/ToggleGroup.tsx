import * as RadixToggleGroup from "@radix-ui/react-toggle-group";
import clsx from "clsx";

type ToggleGroupProps = {
  children: React.ReactNode;
  selected: number | string;
  setSelected: (selected: number | string) => void;
  className?: string;
};

export const ToggleGroup = ({
  children,
  selected,
  setSelected,
  className,
}: ToggleGroupProps) => {
  return (
    <RadixToggleGroup.Root
      className={clsx("flex items-center gap-2", className)}
      type="single"
      value={selected.toString()}
      onValueChange={(value) =>
        setSelected(
          value === "stake" || value === "unstake"
            ? value
            : Number(value)
        )
      }
    >
      {children}
    </RadixToggleGroup.Root>
  );
};

export const ToggleGroupItem = RadixToggleGroup.Item;

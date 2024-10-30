import { Dropdown, DropdownItem } from "@/components/shared/Dropdown";
import Image from "next/image";
import { PiCaretDown } from "react-icons/pi";
import clsx from "clsx";

export const ModifiedDropdown = ({
  selectedValue,
  setSelectedValue,
  values,
  type,
}: {
  selectedValue: string | undefined;
  setSelectedValue: (value: string) => void;
  values: string[];
  type: "Networks" | "Tokens";
}) => {
  return (
    <Dropdown
      trigger={
        <button className="outline-none font-semibold select-none w-52 h-10 bg-white rounded-full flex items-center justify-between p-1">
          <Image
            priority
            src={`/${type}/${
              selectedValue
                ? selectedValue?.toLowerCase()
                : type === "Networks"
                ? "ethereum"
                : "eth"
            }.svg`}
            alt={selectedValue || "Ethereum"}
            width={32}
            height={32}
          />
          <div
            className={clsx(
              "text-sm font-semibold",
              `text-${(selectedValue || "Ethereum").toLowerCase()}Theme`
            )}
          >
            {selectedValue || "Ethereum"}
          </div>
          <PiCaretDown className="size-4 mr-2" />
        </button>
      }
    >
      {values.map((value, index) => (
        <DropdownItem
          className={clsx(
            `hover:bg-primaryBlue flex w-52 items-center justify-between font-semibold hover:text-white text-${value.toLowerCase()}Theme bg-white text-sm`
          )}
          onSelect={() => setSelectedValue(value)}
          key={index}
        >
          <h1>{value}</h1>
          <div className="size-8 rounded-full flex items-center justify-center bg-white">
            <Image
              priority
              src={`/${type}/${
                value
                  ? value?.toLowerCase()
                  : type === "Networks"
                  ? "ethereum"
                  : "eth"
              }.svg`}
              alt={value}
              width={28}
              height={28}
            />
          </div>
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

"use client";
import { useTab } from "@/state/TabProvider";
import { ItemType } from "@/types/generic";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  PiBridge,
  PiGlobeHemisphereEast,
  PiPiggyBank,
  PiWallet,
} from "react-icons/pi";
import { useAccount, useConnect, useDisconnect } from "wagmi";

const items: ItemType[] = [
  {
    itemName: "Bridge",
    ItemIcon: PiBridge,
    isWallet: false,
  },
  {
    itemName: "Stake",
    ItemIcon: PiPiggyBank,
    isWallet: false,
  },
  {
    itemName: "Explore",
    ItemIcon: PiGlobeHemisphereEast,
    isWallet: false,
  },
  {
    itemName: "Wallet",
    ItemIcon: PiWallet,
    isWallet: true,
  },
];

const NavigationIsland = () => {
  const [isHover, setHover] = useState<boolean>(false);
  const [itemsState, setItemsState] = useState<ItemType[]>(items);
  const { tab, toggleTab } = useTab();
  const { isConnected } = useAccount();
  // const { connect } = useConnect()
  const { disconnect } = useDisconnect();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    hydrated ? (
      <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="transition-all z-50 origin-center flex gap-1 items-center justify-between ease-in-out duration-300 w-[240px] h-[40px] hover:h-[52px] hover:w-[600px] rounded-full bg-black p-1"
    >
      {itemsState.map(({ itemName, ItemIcon, isWallet }, index) => {
        if (isWallet) {
          return (
            <ConnectButton.Custom key={index}>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
              }) => {
                return (
                  <button
                    onClick={() =>
                      isConnected ? disconnect() : openConnectModal()
                    }
                    className={clsx(
                      "p-1 flex items-center justify-center cursor-pointer transition-all duration-300",
                      isHover
                        ? "first-of-type:rounded-l-[32px] last-of-type:rounded-r-[32px] w-full h-full"
                        : "size-8 rounded-[32px]",
                      account
                        ? "bg-primaryBlue !text-white"
                        : "bg-primaryGrey !text-secondaryGrey"
                    )}
                  >
                    <ItemIcon className={clsx("size-6")} />
                    <div
                      className={clsx(
                        "font-semibold transition-all",
                        isHover
                          ? "text-base ml-3 delay-300 relative"
                          : "text-[0px] delay-0"
                      )}
                    >
                      <h1
                        className={clsx(
                          "transition-colors delay-0",
                          account ? "text-white" : "text-secondaryGrey"
                        )}
                      >
                        {account ? "Connected" : "Disconnected"}
                      </h1>
                    </div>
                  </button>
                );
              }}
            </ConnectButton.Custom>
          );
        } else {
          const itemText = () => (
            <h1
              className={clsx(
                "transition-colors delay-0",
                tab === itemName.toLowerCase()
                  ? "text-primaryBlue"
                  : "text-white"
              )}
            >
              {itemName}
            </h1>
          );
          return (
            <button
              onClick={() =>
                toggleTab(
                  itemName.toLowerCase() as "bridge" | "stake" | "explore"
                )
              }
              key={index}
              className={clsx(
                "p-1 flex items-center justify-center cursor-pointer transition-all duration-300",
                isHover
                  ? "first-of-type:rounded-l-[32px] last-of-type:rounded-r-[32px] w-full h-full"
                  : "size-8 rounded-[32px]",
                tab === itemName.toLowerCase()
                  ? "text-primaryBlue bg-white"
                  : "bg-secondaryGrey text-white"
              )}
            >
              <ItemIcon className={clsx("size-6")} />
              <div
                className={clsx(
                  "font-semibold transition-all",
                  isHover
                    ? "text-base ml-3 delay-300 relative"
                    : "text-[0px] delay-0"
                )}
              >
                {itemText()}
              </div>
            </button>
          );
        }
        // <button
        //   key={index}
        //   className={clsx(
        //     "w-full h-full flex text-white items-center justify-center cursor-pointer first-of-type:pl-1 last-of-type:pr-1 transition-all first-of-type:rounded-l-full last-of-type:rounded-r-full",
        //     isHover
        //       ? "border-r-0 border-white bg-[#191919] hover:bg-blue-600 hover:text-white last-of-type:border-r-0"
        //       : "border-r-0 bg-transparent"
        //   )}
        // >
        //   <div
        //     className={clsx(
        //       "rounded-full p-1 size-fit flex items-center justify-center",
        //       isActive && !isHover && "bg-white text-blue-600",
        //       isActive && isWallet && !isHover && "bg-blue-600 text-blue-white",
        //       !isActive && isWallet && !isHover && "bg-gray-600 text-blue-white",
        //     )}
        //   >
        //     <ItemIcon
        //       className={clsx(
        //         "transition-all duration-500",
        //         isHover ? "size-8" : "size-6"
        //       )}
        //     />
        //   </div>
        //   <h1
        //     className={clsx(
        //       "text-white font-semibold transition-all",
        //       isHover ? "text-lg ml-3 delay-300 relative" : "text-[0px] delay-0"
        //     )}
        //   >
        //     {itemName}
        //   </h1>
        // </button>
      })}
      </div>
    ) : (
      <></>
    )
  );
};

export default NavigationIsland;

import React, { useEffect, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import clsx from "clsx";
import { PiUserCircleFill } from "react-icons/pi";
import { useAccountModal, useConnectModal } from "@rainbow-me/rainbowkit";

const AccountCard = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { openAccountModal } = useAccountModal();
  const { disconnect } = useDisconnect();
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated ? (
    <button
      onClick={() => {
        address ? openAccountModal?.() : openConnectModal?.();
      }}
      className={clsx(
        "w-full h-10 flex items-center text-xs justify-between font-semibold rounded-full pl-1 pr-3",
        address ? "bg-primaryBlue text-white" : "bg-cardGrey text-secondaryBlue"
      )}
    >
      <PiUserCircleFill className="size-8" />
      {address
        ? address.slice(0, 6) + "..." + address.slice(-4)
        : "Disconnected"}
    </button>
  ) : null;
};

export default AccountCard;

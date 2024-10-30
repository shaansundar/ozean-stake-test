import { useTab } from "@/state/TabProvider";
import { useEffect, useState } from "react";
import Stake from "./Stake";
import Explore from "./Explore";
import Bridge from "./Bridge";
import { PiDeviceMobileSlash } from "react-icons/pi";

type Props = {};

const TabSwitch = () => {
  const { tab } = useTab();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    hydrated ? (
      <>
    <div className="w-full h-full hidden xl:flex items-center justify-between gap-4">
      {tab === "bridge" ? (
        <Bridge />
      ) : tab === "stake" ? (
        <Stake />
      ) : (
        <Explore />
      )}
        </div>
        <div className="w-full h-full flex flex-col gap-4 xl:hidden items-center justify-center">
          <PiDeviceMobileSlash className="text-primaryBlue text-4xl" />
          <p className="text-primaryBlue font-semibold text-xl">
            This feature is not available on mobile or tablet devices
          </p>
          <p className="text-secondaryBlue text-sm text-center max-w-[80%]">
            Please use a desktop device to access this feature. If the issue
            persists, try zooming out your browser window or contact support
          </p>
        </div>
      </>
    ) : null
  );
};

export default TabSwitch;

import { useTab } from "@/state/TabProvider";
import { useEffect, useState } from "react";
import Bridge from "./Bridge";
import Stake from "./Stake";
import Explore from "./Explore";

type Props = {};

const TabSwitch = () => {
  const { tab } = useTab();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  return (
    hydrated ? (
    <div className="w-full h-full flex items-center justify-between gap-4">
      {tab === "bridge" ? (
        <Bridge />
      ) : tab === "stake" ? (
        <Stake />
      ) : (
        <Explore />
      )}
      </div>
    ) : null
  );
};

export default TabSwitch;

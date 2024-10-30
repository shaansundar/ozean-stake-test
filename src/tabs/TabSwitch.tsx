import { useTab } from "@/state/TabProvider";
import React from "react";
import Bridge from "./Bridge";
import Stake from "./Stake";
import Explore from "./Explore";

type Props = {};

const TabSwitch = () => {
  const { tab } = useTab();
  return (
    <div className="w-full h-full flex items-center justify-between gap-4">
      {tab === "bridge" ? (
        <Bridge />
      ) : tab === "stake" ? (
        <Stake />
      ) : (
        <Explore />
      )}
    </div>
  );
};

export default TabSwitch;

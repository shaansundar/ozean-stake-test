import React from "react";
import { PiWarning } from "react-icons/pi";

type Props = {};

const Explore = (props: Props) => {
  return (
    <div className="w-full h-full flex-col gap-8 flex items-center justify-center">
      <PiWarning className="text-primaryBlue text-8xl" />
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-primaryBlue text-2xl">
          This is a Work in Progress
        </h1>
        <p className="text-primaryGrey text-sm">
          This page is still under development
        </p>
      </div>
    </div>
  );
};

export default Explore;

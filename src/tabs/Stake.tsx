import { ToggleGroup, ToggleGroupItem } from "@/components/shared/ToggleGroup";
import React, { Dispatch, SetStateAction, useState } from "react";
import { PiPiggyBank } from "react-icons/pi";
import clsx from "clsx";

const poolData = [
  {
    name: "TVL",
    value: "$100,000",
  },
  {
    name: "Est. Total Rewards (APR)",
    value: "~226.77%",
  },
  {
    name: "Est. ozUSD Yield",
    value: "~7.93%",
  },
  {
    name: "Price Per ozUSD",
    value: "$1.004",
  },
  {
    name: "Maturity",
    value: "34d 11h 23m",
  },
  {
    name: "Total Staked USDX",
    value: "$34,885,258",
  },
];

const Stake = () => {
  const [inputNumber, setInputNumber] = useState(0);
  const [selectedPercentage, setSelectedPercentage] = useState(1);
  const [mode, setMode] = useState<"stake" | "unstake">("stake");
  return (
    <div className="w-full h-full bg-backgroundGrey rounded-[32px] p-4 flex items-center justify-center">
      <div className="w-1/2 h-full p-4 pr-12 flex flex-col items-start justify-start">
        <h1 className="text-[48px] leading-[64px] text-secondaryBlue font-bold">
          oz Staking Rewards are
        </h1>
        <h1 className="text-[80px] leading-[98px] text-primaryBlue font-bold">
          Now Live
        </h1>
        <p className="font-semibold mt-8">
          Earn up to <span className="text-primaryBlue">500% APY</span> by
          staking your USDX in{" "}
          <span className="text-primaryBlue">USDX-ozUSD Pools</span>
          <br />
          Rewards are distributed Bi-Weekly
        </p>
        <div className="w-full grid grid-cols-3 gap-4 mt-8">
          {poolData.map((item) => (
            <div key={item.name} className="rounded-xl bg-white p-4 min-h-[140px] flex flex-col items-center justify-center gap-4">
              <p className="text-secondaryBlue text-sm font-bold">
                {item.name}
              </p>
              <p className="text-primaryBlue text-3xl font-bold">
                {item.value}
              </p>
            </div>
          ))}
        </div>
        <span className="text-secondaryBlue font-semibold text-sm mt-auto">
          Need Help?{" "}
          <a
            href="/"
            className="underline ml-1 text-primaryBlue underline-offset-2"
          >
            Read Docs
          </a>
        </span>
      </div>
      <div className="w-1/2 h-full rounded-[32px] bg-white flex gap-4 flex-col items-center justify-between pt-8">
        <div className="flex flex-col gap-4 items-center w-full h-full">
          <ToggleGroup
            className="w-60 flex items-center justify-between rounded-full h-14 bg-black p-1"
            selected={mode}
            setSelected={(value: string | number) => {
              console.log(value);
              setMode(value as "stake" | "unstake");
            }}
          >
            <ToggleGroupItem
              className={clsx(
                "transition-all w-full h-full rounded-full",
                mode === "stake" ? "bg-primaryBlue text-white" : " text-white"
              )}
              value="stake"
            >
              Stake
            </ToggleGroupItem>
            <ToggleGroupItem
              className={clsx(
                "transition-all w-full h-full rounded-full",
                mode === "unstake" ? "bg-primaryBlue text-white" : " text-white"
              )}
              value="unstake"
            >
              Unstake
            </ToggleGroupItem>
          </ToggleGroup>
          <h3 className="text-xs text-black">Wallet Balance: 7.445 ETH</h3>
          <input
            placeholder="7.445"
            autoFocus
            style={{ "field-sizing": "content" }}
            className={clsx(
              "bg-transparent leading-[98px] placeholder:opacity-25 placeholder:text-primaryGrey text-center max-w-[740px] w-fit min-w-80 border-b-[6px] text-[98px] font-bold outline-none focus:outline-none border-primaryGrey",
              `focus:border-primaryBlue text-primaryBlue`
            )}
            value={inputNumber}
            onChange={(e) => setInputNumber(Number(e.target.value))}
            type="number"
          />
          <ToggleGroup
            selected={selectedPercentage}
            setSelected={setSelectedPercentage}
            className="mt-2"
          >
            <ToggleGroupItem
              className="text-xs flex items-center justify-center bg-backgroundGrey p-2 font-semibold text-secondaryBlue transition-colors rounded-lg hover:bg-primaryBlue hover:text-white"
              value={"0.25"}
            >
              25%
            </ToggleGroupItem>
            <ToggleGroupItem
              className="text-xs flex items-center justify-center bg-backgroundGrey p-2 font-semibold text-secondaryBlue transition-colors rounded-lg hover:bg-primaryBlue hover:text-white"
              value={"0.5"}
            >
              50%
            </ToggleGroupItem>
            <ToggleGroupItem
              className="text-xs flex items-center justify-center bg-backgroundGrey p-2 font-semibold text-secondaryBlue transition-colors rounded-lg hover:bg-primaryBlue hover:text-white"
              value={"0.75"}
            >
              75%
            </ToggleGroupItem>
            <ToggleGroupItem
              className="text-xs flex items-center justify-center bg-backgroundGrey p-2 font-semibold text-secondaryBlue transition-colors rounded-lg hover:bg-primaryBlue hover:text-white"
              value={"1"}
            >
              100%
            </ToggleGroupItem>
          </ToggleGroup>
          <div className="w-full flex mt-auto items-center justify-center">
            <table className="w-11/12 max-w-[720px] h-fit">
              <tbody className="flex flex-col gap-2 w-full">
                <tr className="py-4 h-fit flex items-center justify-between">
                  <td className="text-start h-fit w-1/2">Your Current Stake</td>
                  <td className="text-end w-1/2">
                    <span className="font-bold">18,933</span> USDX{" "}
                  </td>
                </tr>
                <tr className="py-4 h-fit flex items-center justify-between">
                  <td className="text-start h-fit w-1/2">
                    Your Current Rewards
                  </td>
                  <td className="text-end w-1/2">
                    <span className="font-bold">233.45</span> ozUSD
                  </td>
                </tr>
                <tr className="py-4 h-fit flex items-center justify-between">
                  <td className="text-start h-fit w-1/2">Reedemable Stake</td>
                  <td className="text-end w-1/2">
                    <span className="font-bold">11,382.11</span> USDX
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button
          disabled={inputNumber === 0}
          className="bg-primaryBlue transition-colors text-xl font-bold hover:bg-primaryBlue/80 disabled:bg-gray-400 text-white disabled:text-black rounded-b-[32px] h-20 w-full flex items-center justify-center"
        >
          <PiPiggyBank className="size-7 mr-2" />
          {mode === "stake" ? "Stake" : "Unstake"}
        </button>
      </div>
    </div>
  );
};

export default Stake;

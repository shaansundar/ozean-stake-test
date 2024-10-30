import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PiBridge, PiWallet } from "react-icons/pi";
import clsx from "clsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/shared/ToggleGroup";
import { useAccount, useBalance, useChainId, useSwitchChain } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { formatEther } from "viem";
import { ModifiedDropdown } from "@/components/page-specific/ModifiedDropdown";

const FEES = {
  GAS: 0.004,
  BRIDGE: 0.012,
  USD_RATE: 2750,
  MIN_AMOUNT: 0.001,
} as const;

const Bridge = () => {
  // WAGMI hooks
  const { switchChain, chains } = useSwitchChain();
  const chainId = useChainId();
  const { isConnected, address } = useAccount();
  const { data: balanceData } = useBalance({ address });
  const { openConnectModal } = useConnectModal();

  // Constants
  const tokens = ["ETH", "ARB", "OP", "POL"];
  const networks = chains.map((chain) => chain.name.split(" ")[0]);

  // States
  const [state, setState] = useState<{
    network: string | undefined;
    token: string;
    percentage: number;
    hydrated: boolean;
  }>({
    network: chains.find((chain) => chain.id === chainId)?.name.split(" ")[0],
    token: tokens[0],
    percentage: 1,
    hydrated: false,
  });

  const balance = balanceData?.value
    ? Number(parseFloat(formatEther(balanceData.value)).toFixed(4))
    : 0;
  const [inputNumber, setInputNumber] = useState(balance);

  // Effects
  useEffect(() => {
    setState((prev) => ({ ...prev, hydrated: true }));
  }, []);

  useEffect(() => {
    setInputNumber(balance * state.percentage);
  }, [state.percentage, balance]);

  useEffect(() => {
    const chainId = chains.find(
      (chain) => chain.name.split(" ")[0] === state.network
    )?.id;
    if (chainId) {
      switchChain?.({ chainId });
      setState((prev) => ({
        ...prev,
        token: (chainId === 137 ? "POL" : "ETH") as string,
      }));
    }
  }, [state.network, chains, switchChain]);

  const totalAmount = inputNumber + FEES.BRIDGE + FEES.GAS;
  const usdValue = (amount: number) => (amount * FEES.USD_RATE).toFixed(3);

  return state.hydrated ? (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full h-full flex items-center gap-4">
        <div className="w-1/2 h-full rounded-tl-[32px] bg-cardGrey flex gap-4 flex-col items-center justify-start pt-8">
          <div className="w-full flex h-16 items-center justify-center">
            <ModifiedDropdown
              selectedValue={state.network}
              setSelectedValue={(network) => {
                setState((prev) => ({ ...prev, network }));
              }}
              values={networks}
              type="Networks"
            />
          </div>
          <h3 className="text-xs text-black">
            Wallet Balance: {balance} {state.token}
          </h3>
          <input
            autoFocus
            placeholder="7.445"
            // style={{ "field-sizing": "content" }}
            className={clsx(
              "bg-transparent leading-[80px] placeholder:opacity-25 placeholder:text-primaryGrey text-center w-auto max-w-[740px] border-b-[6px] text-[80px] font-bold outline-none focus:outline-none border-primaryGrey",
              state.network &&
                `focus:border-${state.network.toLowerCase()} text-${state.network.toLowerCase()}Theme`
            )}
            value={inputNumber}
            onChange={(e) => setInputNumber(Number(e.target.value))}
            type="number"
            style={{
              width: `${inputNumber.toString().length+1}ch`,
              minWidth: "200px",
            }}
          />
          <div className="w-full flex h-fit mt-4 items-center justify-center">
            <ModifiedDropdown
              selectedValue={state.token}
              setSelectedValue={(token) => {
                setState((prev) => ({ ...prev, token }));
              }}
              values={tokens}
              type="Tokens"
            />
          </div>
          <ToggleGroup
            selected={state.percentage}
            setSelected={(value) =>
              setState((prev) => ({ ...prev, percentage: Number(value) }))
            }
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
          <div className="w-full flex mt-8 items-center justify-center">
            <table className="w-11/12 max-w-[720px] h-fit">
              <tbody className="flex flex-col gap-2 w-full">
                <tr className="py-4 h-fit flex items-center justify-between">
                  <td className="text-start h-fit w-1/2">Gas Fee</td>
                  <td className="text-end w-1/2">{`${FEES.GAS} ${
                    state.token
                  } (~$${usdValue(FEES.GAS)})`}</td>
                </tr>
                <tr className="py-4 h-fit flex items-center justify-between">
                  <td className="text-start h-fit w-1/2">Bridge Fee</td>
                  <td className="text-end w-1/2">{`${FEES.BRIDGE} ${
                    state.token
                  } (~$${usdValue(FEES.BRIDGE)})`}</td>
                </tr>
                <tr className="py-4 h-fit flex items-center justify-between">
                  <td className="text-start h-fit w-1/2">
                    Total Transfer Amount
                  </td>
                  <td className="text-end font-bold w-1/2">{`${totalAmount} ${
                    state.token
                  } (~$${usdValue(totalAmount)})`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-1/2 h-full flex flex-col items-center justify-between rounded-tr-[32px] p-4 bg-white">
          <h1 className="text-center text-4xl text-secondaryBlue font-semibold">
            You Get
          </h1>
          <div className="flex flex-col items-center gap-8 justify-center h-full w-full">
            <h1 className="text-center truncate max-w-[80%] -mt-[240px] text-[80px] text-wrap text-primaryBlue font-bold">{`$${(
              totalAmount * FEES.USD_RATE -
              2.65
            ).toFixed(3)}`}</h1>
            <div className="outline-none select-none w-52 h-10 bg-white border border-primaryGrey rounded-full flex items-center justify-between p-1">
              <Image
                priority
                src={`/Tokens/usdx.svg`}
                alt={"USDX"}
                width={32}
                height={32}
              />
              <div
                className={clsx("text-sm mr-[35%] font-semibold", `text-black`)}
              >
                USDX
              </div>
            </div>
          </div>
          <h1 className="text-center text-secondaryBlue">
            Estimated Time: ~45 Seconds
          </h1>
        </div>
      </div>
      {!isConnected ? (
        <button
          onClick={() => {
            openConnectModal?.();
          }}
          className="bg-primaryBlue transition-colors text-xl font-bold hover:bg-primaryBlue/80 disabled:bg-gray-400 text-white disabled:text-black rounded-b-[32px] h-20 w-full flex items-center justify-center"
        >
          <PiWallet className="size-7 mr-2" />
          Connect Wallet to Bridge
        </button>
      ) : (
        <button
          disabled={inputNumber < 0.001}
          onClick={() => {
            if (!isConnected) {
              openConnectModal?.();
            } else {
              alert("Mock Bridge Successful");
            }
          }}
          className="bg-primaryBlue transition-colors text-xl font-bold hover:bg-primaryBlue/80 disabled:bg-gray-400 text-white disabled:text-black rounded-b-[32px] h-20 w-full flex items-center justify-center"
        >
          {isConnected && inputNumber > 0.001 && (
            <PiBridge className="size-7 mr-2" />
          )}
          {!isConnected
            ? "Connect Wallet to Bridge"
            : inputNumber < 0.001
            ? "Enter Amount > 0.001"
            : "Bridge"}
        </button>
      )}
    </div>
  ) : (
    <div className="w-full h-full flex items-center justify-center">
      <h1>Loading...</h1>
    </div>
  );
};

export default Bridge;

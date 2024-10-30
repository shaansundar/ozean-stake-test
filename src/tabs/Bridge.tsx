import { Dropdown, DropdownItem } from "@/components/Dropdown";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PiCaretDown, PiBridge } from "react-icons/pi";
import clsx from "clsx";
import { ToggleGroup, ToggleGroupItem } from "@/components/ToggleGroup";
import { useChainId, useSwitchChain } from "wagmi";

const tokens = ["ETH", "ARB", "OP", "POL"];

const Bridge = () => {
  const { switchChain, chains } = useSwitchChain();
  const chainId = useChainId();
  const networks = chains.map((chain) => chain.name.split(" ")[0]);
  const [selectedNetwork, setSelectedNetwork] = useState(chains.find((chain) => chain.id === chainId)?.name.split(" ")[0]);
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [inputNumber, setInputNumber] = useState(0);
  const [selectedPercentage, setSelectedPercentage] = useState(1);
  
  useEffect(() => {
    const chainId = chains.find((chain) => chain.name.split(" ")[0] === selectedNetwork)?.id;
    if (chainId) {
      switchChain?.({chainId});
    }
  }, [selectedNetwork, chains, switchChain]);

  useEffect(() => {
    setInputNumber(7.445 * selectedPercentage);
  }, [selectedPercentage]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="w-full h-full flex items-center gap-4">
        <div className="w-1/2 h-full rounded-tl-[32px] bg-cardGrey flex gap-4 flex-col items-center justify-start pt-8">
          <div className="w-full flex h-16 items-center justify-center">
            <Dropdown
              trigger={
                <button className="outline-none font-semibold select-none w-52 h-10 bg-white rounded-full flex items-center justify-between p-1">
                  <Image
                    priority
                    src={`/Networks/${(selectedNetwork || "Ethereum").toLowerCase()}.svg`}
                    alt={selectedNetwork || "Ethereum"}
                    width={32}
                    height={32}
                  />
                  <div
                    className={clsx(
                      "text-sm font-semibold",
                      `text-${(selectedNetwork || "Ethereum").toLowerCase()}Theme`
                    )}
                  >
                    {selectedNetwork || "Ethereum"}
                  </div>
                  <PiCaretDown className="size-4 mr-2" />
                </button>
              }
            >
              {networks.map((network, index) => (
                <DropdownItem
                  className={clsx(
                    `hover:bg-primaryBlue flex w-52 items-center justify-between font-semibold hover:text-white text-${network.toLowerCase()}Theme bg-white text-sm`
                  )}
                  onSelect={() => setSelectedNetwork(network)}
                  key={index}
                >
                  <h1>{network}</h1>
                  <div className="size-8 rounded-full flex items-center justify-center bg-white">
                    <Image
                      priority
                      src={`/Networks/${network.toLowerCase()}.svg`}
                      alt={network}
                      width={28}
                      height={28}
                    />
                  </div>
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
          <h3 className="text-xs text-black">Wallet Balance: 7.445 ETH</h3>
          <input
            autoFocus
            placeholder="7.445"
            style={{ "field-sizing": "content" }}
            className={clsx(
              "bg-transparent leading-[98px] placeholder:opacity-25 placeholder:text-primaryGrey text-center max-w-[740px] w-fit min-w-80 border-b-[6px] text-[98px] font-bold outline-none focus:outline-none border-primaryGrey",
              selectedNetwork && `focus:border-${selectedNetwork.toLowerCase()} text-${selectedNetwork.toLowerCase()}Theme`
            )}
            value={inputNumber}
            onChange={(e) => setInputNumber(Number(e.target.value))}
            type="number"
          />
          <div className="w-full flex h-fit mt-4 items-center justify-center">
            <Dropdown
              className="items-center"
              trigger={
                <button className="outline-none select-none w-40 h-10 bg-white rounded-full flex items-center justify-between p-1">
                  <Image
                    priority
                    src={`/Tokens/${selectedToken.toLowerCase()}.svg`}
                    alt={selectedToken}
                    width={32}
                    height={32}
                  />
                  <div
                    className={clsx(
                      "text-sm font-semibold",
                      `text-${selectedToken.toLowerCase()}`
                    )}
                  >
                    {selectedToken}
                  </div>
                  <PiCaretDown className="size-4 mr-2" />
                </button>
              }
            >
              {tokens.map((token, index) => (
                <DropdownItem
                  className={clsx(
                    `hover:bg-primaryBlue flex items-center w-40 justify-between hover:text-white text-${token.toLowerCase()} bg-white text-sm`
                  )}
                  onSelect={() => setSelectedToken(token)}
                  key={index}
                >
                  <h1>{token}</h1>
                  <div className="size-8 rounded-full flex items-center justify-center bg-white">
                    <Image
                      priority
                      src={`/Tokens/${token.toLowerCase()}.svg`}
                      alt={token}
                      width={28}
                      height={28}
                    />
                  </div>
                </DropdownItem>
              ))}
            </Dropdown>
          </div>
          <ToggleGroup
            selected={selectedPercentage}
            setSelected={(value) => setSelectedPercentage(Number(value))}
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
                  <td className="text-end w-1/2">{`0.004 ${selectedToken} (~$5.22)`}</td>
                </tr>
                <tr className="py-4 h-fit flex items-center justify-between">
                  <td className="text-start h-fit w-1/2">Bridge Fee</td>
                  <td className="text-end w-1/2">{`0.012 ${selectedToken} (~$15.66)`}</td>
                </tr>
                <tr className="py-4 h-fit flex items-center justify-between">
                  <td className="text-start h-fit w-1/2">
                    Total Transfer Amount
                  </td>
                  <td className="text-end font-bold w-1/2">{`${(
                    inputNumber +
                    0.012 +
                    0.004
                  ).toFixed(5)} ${selectedToken} (~$${(
                    ((inputNumber + 0.012 + 0.004) * 5.22) /
                    0.004
                  ).toFixed(3)}) `}</td>
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
            <h1 className="text-center truncate max-w-[80%] -mt-[240px] text-[98px] text-wrap text-primaryBlue font-bold">{`$${(
              ((inputNumber + 0.012 + 0.004) * 5.22) / 0.004 -
              0.65
            ).toFixed(3)}`}</h1>
            <div className="outline-none select-none w-52 h-10 bg-white border border-primaryGrey rounded-full flex items-center justify-between p-1">
              <Image
                priority
                src={`/Tokens/USDX.svg`}
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
      <button
        disabled={inputNumber === 0}
        className="bg-primaryBlue transition-colors text-xl font-bold hover:bg-primaryBlue/80 disabled:bg-gray-400 text-white disabled:text-black rounded-b-[32px] h-20 w-full flex items-center justify-center"
      >
        <PiBridge className="size-7 mr-2" />
        Bridge
      </button>
    </div>
  );
};

export default Bridge;

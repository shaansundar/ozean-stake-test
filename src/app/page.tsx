"use client";
import NavigationIsland from "@/components/NavigationIsland";
import Image from "next/image";
import { TabProvider } from "@/state/TabProvider";
import TabSwitch from "@/tabs/TabSwitch";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { config } from "@/config/wagmiConfig";
import AccountCard from "@/components/AccountCard";


export default function Home() {
  const queryClient = new QueryClient();

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <TabProvider>
            <main className="flex font-manrope h-screen w-screen overflow-hidden flex-col items-center justify-start p-4">
              <header className="w-full h-16 flex items-center justify-between">
                <Image
                  priority
                  src="/logo.png"
                  className=" ml-2"
                  alt="Ozean Logo"
                  width={131.5}
                  height={24}
                />
                <NavigationIsland />
                <span className="mr-2 w-[131.5px] ">
                  <AccountCard />
                </span>
              </header>
              <div className="w-full h-full p-4 mt-2 rounded-[32px] bg-backgroundGrey">
                <TabSwitch />
                {/* <Bridge /> */}
              </div>
            </main>
          </TabProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

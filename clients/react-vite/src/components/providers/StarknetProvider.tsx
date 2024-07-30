import React from "react";
import CartridgeConnector from "@cartridge/connector";
import { sepolia, mainnet } from "@starknet-react/chains";
import { StarknetConfig, publicProvider, voyager } from "@starknet-react/core";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const cartridge = new CartridgeConnector([]);

  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={publicProvider()}
      connectors={[cartridge]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}

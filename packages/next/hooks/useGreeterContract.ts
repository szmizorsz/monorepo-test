import {ethers} from 'ethers';
import {useEffect, useState} from 'react';

import type {Greeter} from '@monorepotest/hardhat/typechain'
import {Greeter__factory} from '@monorepotest/hardhat/dist/typechain'

export default function useGreeterContract (
  signer?: ethers.providers.JsonRpcSigner
) {
  const [greeterContract, setGreeterContract] = useState<Greeter | null>(null);

  useEffect(() => {
    (async () => {
      if (
        !process.env.NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS ||
        !process.env.NEXT_PUBLIC_RPC_TARGET
      ) {
        return;
      }

      const signerOrProvider =
        signer ||
        new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_TARGET);

      const contract = Greeter__factory.connect(
        process.env.NEXT_PUBLIC_GREETER_CONTRACT_ADDRESS,
        signerOrProvider
      );

      setGreeterContract(contract);
    })();
  }, [signer]);

  return greeterContract;
}

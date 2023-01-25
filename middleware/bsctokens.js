const { EvmChain } = require("@moralisweb3/common-evm-utils/lib");
const Token = require("../model/Token");

const Moralis = require("moralis").default;

const BscTokens = async (address,type) => {
  const logo = "https://myothuhtay.github.io/assets/blockchains/smartchain/assets/";
  // const ethTokenLogo = "https://myothuhtay.github.io/assets/blockchains/ethereum/assets/";
  // const polygonTokenLogo = "https://myothuhtay.github.io/assets/blockchains/polygon/assets/";
  const chain = EvmChain.BSC;
  //const defaultlogo = "https://myothuhtay.github.io/assets/blockchains/smartchain/assets/0x2fd38C1A195A0994944e302bE78D604D3a6cf22f/logo.png";

  try {
    let tokenList = [];
    const tokenData = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });
    return tokenData;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = BscTokens;

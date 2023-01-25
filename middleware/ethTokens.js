const { EvmChain } = require("@moralisweb3/common-evm-utils/lib");
//const Token = require("../model/Token");

const Moralis = require("moralis").default;

const EthToken = async (address,type) => {
  //const bscTokenLogo = "https://myothuhtay.github.io/assets/blockchains/smartchain/assets/";
  const ethTokenLogo = "https://myothuhtay.github.io/assets/blockchains/ethereum/assets/";
  //const polygonTokenLogo = "https://myothuhtay.github.io/assets/blockchains/polygon/assets/";
  const chain = EvmChain.ETHEREUM;
   let logo = "";
//   switch (type) {
//     case type === "BEP-20":
//       logo = bscTokenLogo;
//       chain = EvmChain.BSC;
      
//       break;
//     case type === "ERC-20":
//       logo = ethTokenLogo;
//       chain = EvmChain.ETHEREUM;
//       break;
//     default:
//       logo = polygonTokenLogo;
//       chain = EvmChain.POLYGON;
//       break;
//   }
//   switch (type) {
//     case type === "BEP-20":
//       logo === bscTokenLogo;
//       break;
//     case type === "ERC-20":
//       logo === ethTokenLogo;
//       break;
//     default:
//       logo === polygonTokenLogo;
//       break;
//   }
  try {
    let tokenList = [];
    const tokenData = await Moralis.EvmApi.token.getWalletTokenBalances({
      address,
      chain,
    });
    // tokenData.map((d) => tokenList.push(new Token({
    //     type,
    //     name: d.name,

    // },),),),
    // tokenList = tokenData.raw.map((d) =>new Token({
    //         type,
    //         name: d.raw.name,
    //         symbol: d.raw.symbol,
    //         decimals: d.raw.decimals,
    //         logo:`${logo/d.raw.contractAddress/logo.png}`,
    //         amount: d.raw.raw.ether.toString(),
    //         contractAddress: d.raw.contractAddress,
    //       })
    //   )
    //   .toList();
    //console.log(tokenData);
    //tokenList = await tokenList.save();
    return tokenData;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = EthToken;

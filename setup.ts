import { ethers } from "ethers";
import { Presets } from "userop";
import { erc20ABI } from "./src/abi";
import { fundIfRequired } from "./src/helpers";
import config from "./config";

export default async function () {
  const provider = new ethers.providers.JsonRpcProvider(config.nodeUrl);
  const signer = new ethers.Wallet(config.signingKey);
  const testToken = new ethers.Contract(
    config.testERC20Token,
    erc20ABI,
    provider
  );
  const acc = await Presets.Builder.SimpleAccount.init(signer, config.nodeUrl, {factory:"0x941C8f00A3ac2Ff92F30e7dCc5Bf71ee2960488F"});
  await fundIfRequired(
    provider,
    testToken,
    await signer.getAddress(),
    acc.getSender(),
    config.testAccount
  );
}

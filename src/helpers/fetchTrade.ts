import { getTradeDataByType } from "./checkTradeType";
import { getTrade } from "./getterHelpers";
import { resolveDataType } from "./resolveData";

export const fetchTrade = async (userAddress: string, id: number) => {
  const trade = await getTrade(id);
  console.log("trade", await getTrade(49));
  const resolvedData = resolveDataType(trade);
  const tradeObj = await getTradeDataByType(resolvedData as any, userAddress);
  return tradeObj;
};

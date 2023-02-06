import { getTradeDataByType } from "./checkTradeType";
import { getTrade } from "./getterHelpers";
import { resolveDataType } from "./resolveData";

export const fetchTrade = async (userAddress: string, id: number) => {
  const trade = await getTrade(id);

  const resolvedData = resolveDataType(trade);
  console.log("trade", resolvedData);
  const tradeObj = await getTradeDataByType(resolvedData as any, userAddress);

  return tradeObj;
};

import React, { useEffect } from "react";
import TableRow from "@/components/TransactionList/TableRow";
import SearchBox from "@/components/TransactionList/SearchBox";
import UserDetail from "./UserDetail";
import Button from "../elements/Button";
import Pagination from "./Pagination";
import { getLastTransactions, getTradeList } from "./fetchTrades";
import { Trade, TradeData } from "./type";
import { useFormatAddress } from "@/hooks/hooks";
import { useAccount } from "wagmi";
import Spinner from "../elements/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchTradesPending, fetchTrades } from "@/redux/trade/tradesSlice";
import { RootState } from "@/redux/store";

// import { useQuery } from "@apollo/client";
// import { GET_ALL_TRADES, GET_TRADE_BY_ID } from "@/helpers/getDataFromGraph";

const TradeList = () => {
  const [pendingTrades, setPendingTrades] = React.useState([]) as any;
  const tradeList = useSelector((state: RootState) => state.trades.data);
  const [isLoading, setLoading] = React.useState(true);
  const { address } = useAccount();
  const dispatch = useDispatch();

  // const {
  //   loading: isListFetchingLoading,
  //   error: isListFetchingError,
  //   data: tradeListsFromGraph,
  // } = useQuery(GET_ALL_TRADES);
  // console.log(tradeListsFromGraph);
  // const {
  //   loading: isTradeLoading,
  //   error: isTradeFetchError,
  //   data: tradeFromGraph,
  // } = useQuery(GET_TRADE_BY_ID, {
  //   variables: { id: 0 },
  // });
  // console.log(tradeFromGraph);

  useEffect(() => {
    if (!address) return;
    const fetchTradeList = async () => {
      dispatch(fetchTradesPending());
      const data = await getTradeList(tradeList, address);
      dispatch(fetchTrades(data));
      setPendingTrades(
        data.filter((trade: TradeData) => trade.status === "Pending"),
      );
      setLoading(false);
    };

    fetchTradeList();
  }, [dispatch, tradeList, address]);

  return (
    <div className="w-screen px-5 md:px-10">
      <UserDetail
        userAddress={useFormatAddress(address)}
        transactionCount={tradeList.length}
      />

      {isLoading ? (
        <div className="flex justify-center items-center min-h-[50vh] mt-10">
          <Spinner className="w-10 h-10 mr-2 text-gray-300 dark:text-gray-600 fill-secondary-500 animate-spin" />
        </div>
      ) : (
        <>
          <SearchBox />
          <div className="flex justify-between mb-2 mt-3">
            <h2 className="text-lg font-semibold text-dark-orange-200 ">
              {pendingTrades.length > 0
                ? "Action Required"
                : "No pending trades"}
            </h2>
            <Button
              label="View All"
              size="medium"
              bg="bg-bg flex flex-row gap-2 items-center justify-center px-5 text-sm bg-secondary-800 hover:bg-secondary-700"
              variant="secondary"
            />
          </div>
          <div className="flex flex-col gap-2 my-2 text-[14px] md:text-lg">
            <div className="flex flex-col border border-b-4  border-slate-600 border-b-secondary-900 overflow-hidden">
              <div className="grid grid-cols-12 p-2 items-center gap-1 shadow">
                <div className="col-span-2 text-text md:text-lg md:uppercase md:font-semibold">
                  <span className="hidden lg:inline">Counterparty</span>
                  <span className="md:hidden">CP</span>
                </div>
                <div className="col-span-3 overflow-clip  text-text md:text-lg md:uppercase md:font-semibold">
                  You Receive
                </div>
                <div className="col-span-3 text-text flex-col md:text-lg md:uppercase md:font-semibold">
                  You Send
                </div>
                <div className="col-span-3 text-text overflow-hidden text-center md:text-lg md:uppercase md:font-semibold">
                  Status
                </div>
                <div className="col-span-1 overflow-hidden"></div>
              </div>
            </div>
          </div>

          {pendingTrades
            .sort((a: TradeData, b: TradeData) => b.id - a.id)
            .map((trade: TradeData, index: number) => {
              if (!trade.isCreatedByYou) {
                return (
                  <TableRow
                    key={index}
                    buyerAddress={trade.buyer}
                    amountOfTokenToBuy={trade.amountOfAssetToReceive}
                    amountOfTokenToSell={trade.amountOfAssetToSend}
                    status={trade.status}
                    TransferTokenId={trade.symbolAssetToSend}
                    ReceiveTokenId={trade.symbolAssetToReceive}
                    txId={trade.id}
                  />
                );
              }
            })}
          <h2 className="text-lg font-semibold text-text my-2">
            Other Transactions
          </h2>
          {getLastTransactions(tradeList, 5).map(
            (trade: TradeData, index: number) => {
              if (trade.status !== "Pending" || trade.isCreatedByYou) {
                return (
                  <TableRow
                    key={index}
                    buyerAddress={trade.buyer}
                    amountOfTokenToBuy={trade.amountOfAssetToReceive}
                    amountOfTokenToSell={trade.amountOfAssetToSend}
                    status={trade.status}
                    TransferTokenId={trade.symbolAssetToSend}
                    ReceiveTokenId={trade.symbolAssetToReceive}
                    txId={trade.id}
                  />
                );
              }
            },
          )}
          {tradeList.length > 5 && <Pagination />}
        </>
      )}
    </div>
  );
};

export default TradeList;

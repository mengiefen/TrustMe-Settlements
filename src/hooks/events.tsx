import {
  updateCreatedTrade,
  updateExpiredTrade,
  updateConfirmedTrade,
  updateCanceledTrade,
  updateWithdrawnTrade,
} from "@/redux/trade/tradesSlice";
import { fetchTrade } from "@/helpers/fetchTrade";
import { useDispatch } from "react-redux";
import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { trustMeContract } from "@/helpers/getterHelpers";
import { useAccount } from "wagmi";

export const useHandleCreatedEvent = (address: string) => {
  const { isConnected } = useAccount();
  const [tradeCreated, setTradeCreated] = useState({
    isTradeCreated: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected) return;
    const listenEvent = async () => {
      const trustMe = await trustMeContract();
      await trustMe.on(
        "TradeCreated",
        async (tradeId: BigNumber, buyer: string, seller: string) => {
          if (buyer == address || seller == address) {
            if (!tradeCreated.isTradeCreated) {
              await fetchTrade(address as string, Number(tradeId)).then(
                (trade) => {
                  dispatch(updateCreatedTrade(trade));
                },
              );
            }

            setTradeCreated({
              isTradeCreated: true,
              tradeId: Number(tradeId),
              buyer: buyer,
              seller: seller,
            });
          }
        },
      );

      return trustMe;
    };

    listenEvent().then((contract) => {
      return () => {
        contract.removeAllListeners("TradeCreated");
      };
    });
  }, [dispatch, address, tradeCreated.isTradeCreated]);

  return tradeCreated;
};

export const useHandleExpiredEvent = (address: string) => {
  const { isConnected } = useAccount();
  const [tradeExpired, setTradeExpired] = useState({
    isTradeExpired: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected) return;

    const listenEvent = async () => {
      const trustMe = await trustMeContract();
      await trustMe.on(
        "TradeExpired",
        async (tradeId: BigNumber, buyer: string, seller: string) => {
          if (buyer == address || seller == address) {
            dispatch(updateExpiredTrade(Number(tradeId)));
            setTradeExpired({
              isTradeExpired: true,
              tradeId: Number(tradeId),
              buyer: buyer,
              seller: seller,
            });
          }
        },
      );

      return trustMe;
    };

    listenEvent().then((contract) => {
      return () => {
        contract.removeAllListeners("TradeExpired");
      };
    });
  }, [dispatch, address, tradeExpired.isTradeExpired]);

  return tradeExpired;
};

export const useHandleCanceledEvent = (address: string) => {
  const { isConnected } = useAccount();
  const [tradeCanceled, setTradeCanceled] = useState({
    isTradeCanceled: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected) return;
    const listenEvent = async () => {
      const trustMe = await trustMeContract();
      await trustMe.on(
        "TradeCanceled",
        async (tradeId: BigNumber, buyer: string, seller: string) => {
          if (buyer == address || seller == address) {
            dispatch(updateCanceledTrade(Number(tradeId)));
            setTradeCanceled({
              isTradeCanceled: true,
              tradeId: Number(tradeId),
              buyer: buyer,
              seller: seller,
            });
          }
        },
      );

      return trustMe;
    };

    listenEvent().then((contract) => {
      return () => {
        contract.removeAllListeners("TradeCanceled");
      };
    });
  }, [dispatch, address, tradeCanceled.isTradeCanceled]);

  return tradeCanceled;
};

export const useHandleWithdrawEvent = (address: string) => {
  const { isConnected } = useAccount();
  const [tradeWithdrawn, setTradeWithdrawn] = useState({
    isTradeWithdrawn: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected) return;
    const listenEvent = async () => {
      const trustMe = await trustMeContract();
      await trustMe.on(
        "TradeWithdrawn",
        async (tradeId: BigNumber, buyer: string, seller: string) => {
          if (buyer == address || seller == address) {
            dispatch(updateWithdrawnTrade(Number(tradeId)));
            setTradeWithdrawn({
              isTradeWithdrawn: true,
              tradeId: Number(tradeId),
              buyer: buyer,
              seller: seller,
            });
          }
        },
      );

      return trustMe;
    };

    listenEvent().then((contract) => {
      return () => {
        contract.removeAllListeners("TradeWithdrawn");
      };
    });
  }, [dispatch, address, tradeWithdrawn.isTradeWithdrawn]);

  return tradeWithdrawn;
};

export const useHandleConfirmedEvent = (address: string) => {
  const { isConnected } = useAccount();
  const [tradeConfirmed, setTradeConfirmed] = useState({
    isTradeConfirmed: false,
    tradeId: 0,
    buyer: "",
    seller: "",
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isConnected) return;

    const listenEvent = async () => {
      const trustMe = await trustMeContract();
      await trustMe.on(
        "TradeConfirmed",
        async (tradeId: BigNumber, buyer: string, seller: string) => {
          if (buyer == address || seller == address) {
            dispatch(updateConfirmedTrade(Number(tradeId)));
            setTradeConfirmed({
              isTradeConfirmed: true,
              tradeId: Number(tradeId),
              buyer: buyer,
              seller: seller,
            });
          }
        },
      );

      return trustMe;
    };

    listenEvent().then((contract) => {
      return () => {
        contract.removeAllListeners("TradeConfirmed");
      };
    });
  }, [dispatch, address, tradeConfirmed.isTradeConfirmed]);

  return tradeConfirmed;
};

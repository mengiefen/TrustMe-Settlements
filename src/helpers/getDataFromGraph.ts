import { gql } from "@apollo/client";

export const GET_ALL_TRADES = gql`
  query GetAllTrades {
    allTrades(first: 5) {
      id
      tradeID
      seller
      buyer
      tokenToSell
      tokenToBuy
      amountOfTokenToSell
      amountOfTokenToBuy
      deadline
      status
    }
  }
`;

export const GET_TRADE_BY_ID = gql`
  query GetTradeById($id: ID!) {
    allTrade(id: $id) {
      id
      tradeID
      seller
      buyer
      tokenToSell
      tokenToBuy
      amountOfTokenToSell
      amountOfTokenToBuy
      deadline
      status
    }
  }
`;

import TransactionList from "@/components/TransactionList/TradeList";
import Layout from "@/Layout";
import React from "react";

const List = () => {
  return (
    <Layout>
      <div className="px-5">
        <TransactionList />
      </div>
    </Layout>
  );
};

export default List;

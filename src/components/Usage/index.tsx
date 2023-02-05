import React from "react";
import UsageCard from "../elements/UsageCard";
import UsageCardReverse from "../elements/UsageCardReverse";

const Usage = () => {
  return (
    <div className="container px-5 mb-12">
      <h2 className="text-2xl text-center text-text mt-5 tracking-wide leading-10 mb-5">
        How to Use
      </h2>
      <div className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-blue-50">
        <UsageCard />
        <UsageCardReverse />
        <UsageCard />
        <UsageCardReverse />
      </div>
    </div>
  );
};

export default Usage;

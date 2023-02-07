import React from "react";
import Image, { StaticImageData } from "next/image";

type selectprops = {
  title: string;
  name: string;
  OptionData: Array<{
    id: number;
    symbol: string;
  }>;
};

const Tokendrop = (props: selectprops) => {
  const { title, name, OptionData } = props;

  return (
    <div className="inline-block relative w-64 h-full py-[1px]">
      <select
        required
        name={name}
        className="block appearance-none w-full h-full border border-gray-100 px-3 py-[2px] pr-8 rounded text-xs"
      >
        <option className="items-center text-small">
          {title}
        </option>
        {OptionData.map((item) => (
          <option
            key={item.id}
            className="flex flex-row items-center justify-start text-xm"
          >
            {item.symbol}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
};

export default Tokendrop;

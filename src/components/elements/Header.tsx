import React from "react";
import { FiMenu } from "react-icons/fi";
import { GiTwoCoins } from "react-icons/gi";
import MobileMenu from "./MobileMenu";
import { BiArrowBack } from "react-icons/bi";
import { useRouter } from "next/router";
import DesktopMenu from "./DestopMenu";

type HeaderProps = {
  bg?: string;
  logoPrimaryColor?: string;
};

const Header = ({
  bg = "bg-slate-800 border-bg border-b-[0.5px]",
  logoPrimaryColor = "text-text",
}: HeaderProps) => {
  const router = useRouter();
  const [isActive, setIsActive] = React.useState(false);
  const showMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex flex-col">
      <nav
        className={`w-screen h-[70px] md:h-[85px] ${bg} px-5 my-auto ${logoPrimaryColor}}`}
      >
        <div className="md:hidden flex h-full flex-row justify-between items-center">
          <div className="flex flex-row items-center gap-1">
            {router.pathname == "/" ? (
              <>
                <GiTwoCoins className="text-3xl" />
                <h1 className="text-2xl  font-semibold tracking-wide">
                  Trust<span className="text-secondary-600 font-bold">ME</span>
                </h1>
              </>
            ) : (
              <button
                className="py-2 px-2 text-3xl outline-none
             rounded-full border-2 border-secondary-100 md:hover:border-secondary-700
              text-light focus:hover:border-secondary-700 focus:outline-none
              transition duration-300 overflow-hidden
              md:hover:bg-secondary-200
              focus:bg-secondary-200"
                style={{
                  color: router.pathname == "/addTrade" ? "white" : "slate-800",
                }}
                onClick={() => router.back()}
              >
                <BiArrowBack />
              </button>
            )}
          </div>

          <button type="button" className="outline-none border-none p-0">
            <FiMenu className="text-3xl" onClick={() => showMenu()} />
          </button>
        </div>

        <DesktopMenu />
      </nav>

      <MobileMenu showMenu={() => showMenu()} isActive={isActive} />
    </div>
  );
};

export default Header;

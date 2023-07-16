import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";

const Header = () => {
  return (
    <>
      <nav className="fixed z-10 w-full mx-auto bg-white/40 bg-opacity-80 px-2 sm:px-4 py -2.5 pt-4 rounded">
        <div className="max-w-[1080px] container flex flex-wrap justify-between items-center mx-auto">
          <Link href="/" className="flex items-center flex-1">
            <div className="flex flex-row items-center self-center text-xl font-bold whitespace-nowrap text-indigo-500 hover:text-cyan-600">
              <div className="hidden sm:block">PIN</div>
            </div>
          </Link>
          <div className="flex md:order-2" style={{ marginLeft: "2rem" }}>
            <ConnectButton />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
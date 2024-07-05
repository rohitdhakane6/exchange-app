import Link from "next/link";

export const Appbar = () => {
  return (
    <div className="z-20 w-full bg-baseBackgroundL0">
      <div className="flex h-14 w-full flex-col justify-center pl-[21px] pr-4 ">
        <div className="flex flex-row justify-between">
          <div className="flex items-center flex-row">
            <Link href="/" passHref>
              <div className="text-center font-semibold rounded-lg focus:ring-blue-200 focus:none focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 flex flex-col justify-center bg-transparent h-8 text-sm p-0 mr-6 shrink-0">
                <div className="flex flex-row items-center justify-center gap-2.5">
                  Exchange
                </div>
              </div>
            </Link>
            <div className="ml-[20px] mr-[20px] flex flex-row items-center justify-center">
              <Link href="/" passHref>
                <div className="text-center font-semibold rounded-lg focus:ring-blue-200 focus:none focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 flex flex-col justify-center bg-transparent h-8 text-sm p-0 text-baseTextHighEmphasis">
                  Markets
                </div>
              </Link>
            </div>
            <div className="ml-[20px] mr-[20px] flex flex-row items-center justify-center">
              <Link href="/trade/SOL_USDC" passHref>
                <div className="text-center font-semibold rounded-lg focus:ring-blue-200 focus:none focus:outline-none hover:opacity-90 disabled:opacity-80 disabled:hover:opacity-80 flex flex-col justify-center bg-transparent h-8 text-sm p-0 text-baseTextMedEmphasis">
                  Trade
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-row">
            <Link href="/signup" passHref>
              <div className="my-auto ml-10 text-nowrap rounded-lg bg-greenText/[16%] px-3 py-1.5 text-sm font-semibold text-greenText hover:opacity-90">
                Sign up
              </div>
            </Link>
            <Link href="/login" passHref>
              <div className="my-auto ml-6 text-nowrap rounded-lg bg-accentBlue/[16%] px-3 py-1.5 text-sm font-semibold text-accentBlue hover:opacity-90">
                Sign in
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

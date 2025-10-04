import laptop from "../assets/laptop.png";
import phone from "../assets/phone.png";
import trade from "../assets/trade.png";

export default function Gateway() {

  const handleClick = () => {
    window.open("https://orbith-b8tw.onrender.com/", "_blank");
  };
  
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-semibold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            Your Gateway to <br /> Fractional Domains
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-8">
            Trade smarter with domain scores, real-time chat, and secure <br />
            on-chain offers.
          </p>
        </div>

        <div className="space-y-12">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-medium mb-4">
                Data-Driven Domain <br />
                Scoring System
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Every domain is scored with clear metrics — liquidity,
                <br /> holders, history, and more.
              </p>
              <button onClick={handleClick} className="cursor-pointer self-start bg-blue-700 text-white text-sm font-medium py-3 px-4 rounded-xl shadow-md hover:bg-blue-800 hover:scale-105 transition duration-200">
                Get Started
              </button>
            </div>
            <div className="relative h-full min-h-[400px]">
              <img src={laptop} alt="Analytics Dashboard" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-full min-h-[400px] order-2 md:order-1">
              <img src={phone} alt="Mobile Chat" />
            </div>

            <div className="p-12 flex flex-col justify-center order-1 md:order-2">
              <h3 className="text-2xl font-medium mb-4">
                Direct Chat With Domain <br />
                Owners
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                Message owners directly inside Orbith. Negotiate and
                <br /> propose offers without middlemen.
              </p>
              <button className=" self-start bg-blue-700 text-white text-sm font-medium py-3 px-4 rounded-xl shadow-md hover:bg-blue-800 hover:scale-105 transition duration-200">
                Get Started
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-12 flex flex-col justify-center">
              <h3 className="text-2xl font-medium mb-4">
                Transparent and Secure <br />
                On-Chain Trades
              </h3>
              <p className="text-gray-400 mb-6 text-sm">
                All offers and transfers are executed safely on-chain,
                <br /> ensuring transparent ownership.
              </p>
              <button className=" self-start bg-blue-700 text-white text-sm font-medium py-3 px-4 rounded-xl shadow-md hover:bg-blue-800 hover:scale-105 transition duration-200">
                Get Started
              </button>
            </div>
            <div className="relative h-full min-h-[400px]">
              <img src={trade} alt="Trading Chart" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

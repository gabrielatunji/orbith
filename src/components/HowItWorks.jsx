import fraction from "../assets/fraction.png";
import lock from "../assets/lock.png";
import message from "../assets/message.png";
import offer from "../assets/offer.png";
import search from "../assets/search.png";
import wallet from "../assets/wallet.png";

export default function HowItWorks() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black via-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-semibold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
            How it works
          </h2>
          <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-8">
            We make trading fractional domains simple and <br /> transparent.
            From scoring to negotiation to <br /> ownership transfer, everything
            happens in a few <br /> clicks.
          </p>
        </div>

        <div className="max-w-6xl mx-auto p-2 md:p-2 bg-neutral-900 rounded-3xl shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <div className="bg-black rounded-2xl p-6 flex flex-col items-center text-center space-y-3">
            <div className="  rounded-xl flex items-center justify-center mb-6">
              <img src={wallet} alt="Wallet Image" />
            </div>
            <h3 className="text-xl font-medium text-white mt-4">
              Connect Wallet
            </h3>
            <p className="text-gray-400 text-sm -mt-1">
              Link your wallet to get started. No <br /> extra sign-up needed.
            </p>
          </div>

          <div className="bg-black rounded-2xl p-6 flex flex-col items-center text-center space-y-3">
            <div className="rounded-xl flex items-center justify-center -mb-10 ">
              <img src={message} alt="Message Image" />
            </div>
            <h3 className="text-xl font-medium text-white -mt-2">
              Chat with Owners
            </h3>
            <p className="text-gray-400 text-sm -mt-1">
              Message domain owners directly <br /> and negotiate inside the
              platform.
            </p>
          </div>

          <div className="bg-black rounded-2xl p-6 flex flex-col items-center text-center space-y-3">
            <div className="rounded-xl flex items-center justify-center mb-10 ">
              <img src={search} alt="Search Image" />
            </div>
            <h3 className="text-xl font-medium text-white mt-2">
              Discover Domains
            </h3>
            <p className="text-gray-400 text-sm -mt-1">
              Explore fractionalized domains with <br /> scores, traits, and
              analytics.
            </p>
          </div>

          <div className="bg-black rounded-2xl p-6 flex flex-col items-center text-center space-y-3">
            <div className="rounded-xl flex items-center justify-center mb-6 -mt-6">
              <img src={offer} alt="Offer Image" />
            </div>
            <h3 className="text-xl font-medium text-white -mt-15">
              Propose Offers
            </h3>
            <p className="text-gray-400 text-sm -mt-1 mb-8">
              Send price offers inside the chat. <br /> Owners can accept or
              counter.
            </p>
          </div>

          <div className="bg-black rounded-2xl p-6 flex flex-col items-center text-center space-y-3">
            <div className="rounded-xl flex items-center justify-center mb-6 -mt-6">
              <img src={lock} alt="Lock Image" />
            </div>
            <h3 className="text-xl font-medium text-white ">
              Secure Transactions
            </h3>
            <p className="text-gray-400 text-sm -mt-1 ">
              All offers and acceptances are
              <br /> handled safely on-chain.
            </p>
          </div>

           <div className="bg-black rounded-2xl p-6 flex flex-col items-center text-center space-y-3">
            <div className="  rounded-xl flex items-center justify-center mb-6">
              <img src={fraction} alt="Fraction Image" />
            </div>
            <h3 className="text-xl font-medium text-white mt-4">
              Own Fractions
            </h3>
            <p className="text-gray-400 text-sm -mt-1">
              Link your wallet to get started. No <br /> extra sign-up needed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

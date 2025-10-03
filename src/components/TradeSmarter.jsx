import image from "../assets/image.png";
import mask from "../assets/mask.png";

export default function TradeSmarter() {
  return (
    <section className="py-20 px-6 bg-gradient-to-b from-black-900 to-gray-900">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-5xl md:text-8xl font-semibold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Trade <br /> Smarter
        </h2>
        <p className="text-gray-400 text-sm max-w-2xl mx-auto mt-8">
          Orbith lets you explore fractionalized domains, view <br />{" "}
          data-driven scores, chat with owners, and trade <br /> securely
          on-chain - all in one place.
        </p>
        <button className="self-start bg-blue-700 text-white text-sm mt-4 font-medium py-3 px-4 rounded-xl shadow-md hover:bg-blue-800 hover:scale-105 transition duration-200">
          Let's get started
        </button>
        <div className="mt-16 mx-auto w-full max-w-4xl">
          <img src={image} alt="Phone Image" />
        </div>
      </div>
      <div className="mt-16 mx-auto w-full ">
        <img src={mask} alt="Logo Mask" />
      </div>
    </section>
  );
}

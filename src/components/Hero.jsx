import heroImage from "../assets/hero-image.png";

export default function Hero() {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-semibold mb-6 bg-gradient-to-r from-white via-gray-300 to-gray-500 bg-clip-text text-transparent">
          Score, Trade & Own
          <br />
          Fractional Domains
        </h1>
         <p className="text-gray-400 max-w-2xl text-sm mx-auto mb-8">
          Discover fractionalized domains, analyze scores,
          <br />
          and negotiate directly with owners.
        </p>
        <button className="bg-blue-700 text-white text-sm font-semibold py-4 px-6 rounded-lg shadow-md hover:bg-blue-800 hover:scale-105 transition duration-200">
          Get Started
        </button>

        <div className="mt-16 mx-auto w-full max-w-4xl">
          <img src={heroImage} alt="Laptop Interface" />
        </div>
      </div>
    </section>
  );
}

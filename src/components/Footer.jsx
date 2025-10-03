import qrcode from "../assets/qrcode.png";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="py-12 px-6 bg-black-800 ">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="mb-4 w-16 mx-1">
              <img src={logo} alt="Logo" />
            </div>
            <p className="text-gray-400 text-sm">
              Score, chat, and trade fractionalized <br />
              domains with data-driven insights <br />
              and secure on-chain transactions - <br />
              all in one place.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Discover
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors"></a>
                My Chats
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors"></a>
                Follow on X
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Connect Wallet
                </a>
              </li>
            </ul>
          </div>

          <div className="max-w-6xl mx-auto p-2 md:p-2 bg-neutral-900 rounded-3xl shadow-lg ">
            <div className="flex flex-col items-center space-y-4">
              <button className="w-48 px-6 py-3 bg-white text-black rounded-full p-4 hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2 font-medium">
                <span>Follow on X</span>
              </button>

              <div className="bg-black rounded-3xl p-4 w-48 flex flex-col items-center ">
                <div className="w-32 h-32 mt-4  bg-white rounded-lg  flex items-center justify-center mb-4">
                  <img src={qrcode} alt="QR Code" />
                </div>
                <p className="text-white text-center mb-4 text-sm">
                  Experience <br /> Orbith Mobile
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p className="text-gray-400 text-sm">
            © 2025 Orbith. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

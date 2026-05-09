import paymentMethods from "../assets/bottom_bar_icons.61919e0e5a533c34d368.png";

export default function Footer() {
  return (
    <footer className="w-full bg-[#263957] px-8 py-7 mt-12">
      <div className="w-full">
        <h3 className="text-white font-bold text-[28px] mb-5">
          Payment Methods
        </h3>

        <div className="w-full overflow-hidden mb-5">
          <img
            src={paymentMethods}
            alt="Payment Methods"
            className="w-full max-w-[720px] h-auto object-contain"
          />
        </div>

        <div className="border-t border-white pt-5 text-center">
          <p className="text-white text-[16px]">
            Copyright © 2025 Developed by Betpro Exchange
          </p>
        </div>
      </div>
    </footer>
  );
}
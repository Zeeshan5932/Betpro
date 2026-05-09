import logo from "../assets/logo.png";

export default function Header() {
  return (
    <header className="w-full bg-[#2C4F6A] h-[78px] sm:h-[86px] md:h-[92px] flex items-center justify-center" style={{ background: 'linear-gradient(#2e506c, #152337)' }}>
      <div className="flex items-center justify-center gap-2 sm:gap-3">
        <img
          src={logo}
          alt="Betpro Wallet Logo"
          className="w-[28px] h-[28px] sm:w-[32px] sm:h-[32px] md:w-[34px] md:h-[34px] object-contain"
        />

        <h1 className="text-white font-bold leading-none text-[22px] sm:text-[26px] md:text-[28px]">
          Betpro Wallet
        </h1>
      </div>
    </header>
  );
}
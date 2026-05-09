import { FaDownload } from "react-icons/fa";

export default function DownloadCard() {
  return (
    <div className="download-card">
      <h2 className="text-[32px] font-bold leading-[1.15] text-white">
        Download Betpro <br /> Wallet
      </h2>

      <p className="text-[11px] font-bold mt-2 text-white">
        On your phone today
      </p>

      <p className="text-[11px] font-semibold mt-4 leading-[1.35] text-white">
        Betpro Wallet APP is an Android earning app that provides the best
        platform for users to start earning money right away.
      </p>

      <button className="download-btn flex items-center justify-center gap-3 mx-auto mt-8">
        <FaDownload className="text-[17px]" />
        Download Now
      </button>
    </div>
  );
}
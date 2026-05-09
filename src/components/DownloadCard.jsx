import { FaDownload } from 'react-icons/fa'

export default function DownloadCard() {
  return (
    <div className="auth-card mt-8">
      <h3 className="text-white font-bold text-lg mb-2">Download Betpro Wallet</h3>
      <p className="text-accent text-sm mb-3">On your phone today</p>
      <p className="text-gray-300 text-sm mb-4">
        Betpro Wallet APP is an Android earning app that provides the best platform for users to start earning money right away.
      </p>
      <button className="btn-primary flex items-center justify-center gap-2">
        <FaDownload size={16} />
        Download Now
      </button>
    </div>
  )
}

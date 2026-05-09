import { FaWhatsapp } from 'react-icons/fa'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+923256954764"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed right-6 bottom-6 sm:right-8 sm:bottom-8 w-14 h-14 bg-success rounded-full flex items-center justify-center text-white shadow-lg hover:bg-opacity-90 transition-all z-50"
      title="Contact us on WhatsApp"
    >
      <FaWhatsapp size={28} />
    </a>
  )
}

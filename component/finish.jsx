// pages/thankyou.js
import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-6">Terima kasih!</h1>
        <p className="text-lg mb-4">
          Terima kasih telah meluangkan waktu untuk mengisi form sebelumnya.
        </p>
        <p className="text-gray-600 mb-6">
          Kami sangat menghargai kontribusi Anda.
        </p>
        <Link href="/">
          <p className="text-blue-500 hover:underline">Kembali ke Beranda</p>
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;

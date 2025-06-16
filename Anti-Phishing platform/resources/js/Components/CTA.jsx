import { Link } from "@inertiajs/react";

const CTA = () => {
  return (
    <div className="relative px-6 py-16 overflow-hidden text-center bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-100">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute rounded-full w-80 h-80 bg-blue-400/10 -top-20 -left-20 blur-3xl animate-pulse"></div>
        <div className="absolute delay-1000 rounded-full w-96 h-96 bg-cyan-400/10 -bottom-20 -right-20 blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl animate-fadeInUp">
          Stay Secure with <span className="text-blue-600">Secura</span>
        </h2>
        <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-700 delay-200 md:text-xl animate-fadeInUp">
          Defend against phishing threats with cutting-edge security tools. Join now and scan your links in real-time!
        </p>
        <Link
          href="/services"
          className="inline-block px-8 py-4 text-lg font-bold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl hover:shadow-xl hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 animate-fadeInUp delay-400"
        >
          Get Started Now
        </Link>
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .delay-200 {
          animation-delay: 0.2s;
        }
        .delay-400 {
          animation-delay: 0.4s;
        }
      `}</style>
    </div>
  );
};

export default CTA;
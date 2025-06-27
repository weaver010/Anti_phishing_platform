import React from 'react';
import { CheckCircle2, PlayCircle, Clock, BookOpen, GraduationCap, Newspaper, Video, BarChart3, Shield } from 'lucide-react';

const AwarenessSection = ({ completedAwareness, handleCompleteAwareness }) => {
  return (
    <div className="relative w-full">
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Left Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-100 mb-4">
              Comprehensive Cybersecurity Training Platform
            </h1>
            <p className="text-blue-200 text-lg mb-8 font-medium">
              Explore our integrated learning ecosystem designed to enhance your security awareness and protect against evolving cyber threats
            </p>
            <div className="prose prose-invert prose-lg max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#22304a] p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6" />
                    Awareness
                  </h2>
                  <p className="text-blue-100">
                    Master the fundamentals of phishing defense through expert-led security protocols and best practices. Learn to identify and prevent sophisticated cyber threats.
                  </p>
                </div>
                <div className="bg-[#22304a] p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                    <Newspaper className="w-6 h-6" />
                    Articles
                  </h2>
                  <p className="text-blue-100">
                    Access in-depth analysis of emerging cyber threats and advanced defense methodologies through expert-written articles and research papers.
                  </p>
                </div>
                <div className="bg-[#22304a] p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                    <Video className="w-6 h-6" />
                    Videos
                  </h2>
                  <p className="text-blue-100">
                    Watch expert-led demonstrations and real-world scenarios showcasing effective threat mitigation strategies and best practices.
                  </p>
                </div>
                <div className="bg-[#22304a] p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-6 h-6" />
                    Progress
                  </h2>
                  <p className="text-blue-100">
                    Monitor your cybersecurity training advancement through our comprehensive analytics dashboard and track your learning journey.
                  </p>
                </div>
                <div className="bg-[#22304a] p-6 rounded-lg">
                  <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center gap-2">
                    <Shield className="w-6 h-6" />
                    Updates
                  </h2>
                  <p className="text-blue-100">
                    Stay informed with real-time security intelligence and critical threat advisories to maintain your cybersecurity awareness.
                  </p>
                </div>
              </div>

              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-blue-300 mb-4">Understanding Phishing</h2>
                <p className="text-blue-100 text-xl font-medium leading-relaxed max-w-3xl mx-auto">
                  In today's digital landscape, phishing has emerged as one of the most sophisticated cyber threats. This guide will equip you with essential knowledge to recognize and prevent these evolving security challenges.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-blue-300 mb-4">Definition of Phishing</h2>
              <p className="text-blue-100 mb-4">
                Phishing is a fraudulent attempt to obtain sensitive information such as usernames, passwords, and credit card details by disguising oneself as a trustworthy entity in electronic communication.
              </p>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-6">
                <li>Phishing attacks can occur via email, text messages, social media, or even phone calls.</li>
                <li>The goal is to trick individuals into revealing personal or confidential information.</li>
              </ul>
              <h2 className="text-2xl font-bold text-blue-300 mb-4">Types of Phishing Attacks</h2>
              <div className="space-y-4">
                <div className="bg-[#22304a] p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-400 mb-2">Email Phishing</h3>
                  <ul className="list-disc list-inside text-blue-100 space-y-1">
                    <li>Most common type</li>
                    <li>Attackers impersonate trusted entities (banks, agencies, etc.)</li>
                    <li>Examples: fake invoices, account verifications, urgent messages</li>
                  </ul>
                </div>
                <div className="bg-[#22304a] p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-400 mb-2">Spear Phishing</h3>
                  <ul className="list-disc list-inside text-blue-100 space-y-1">
                    <li>Targeted attacks on individuals or organizations</li>
                    <li>Often personalized using research</li>
                    <li>Example: emails referencing specific projects</li>
                  </ul>
                </div>
                <div className="bg-[#22304a] p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-400 mb-2">Vishing (Voice Phishing)</h3>
                  <ul className="list-disc list-inside text-blue-100 space-y-1">
                    <li>Conducted via voice calls</li>
                    <li>Attackers pretend to be from legit orgs</li>
                    <li>Example: fake customer support calls</li>
                  </ul>
                </div>
                <div className="bg-[#22304a] p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-blue-400 mb-2">Smishing (SMS Phishing)</h3>
                  <ul className="list-disc list-inside text-blue-100 space-y-1">
                    <li>Similar to email phishing, but via text messages</li>
                    <li>Example: SMS asking for banking details</li>
                  </ul>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-blue-300 mb-4 mt-8">Recognizing Phishing Emails</h2>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-6">
                <li>Spelling/grammar mistakes</li>
                <li>Urgent language or threats</li>
                <li>Mismatched or suspicious URLs</li>
                <li>Emails from unknown or impersonated senders</li>
              </ul>
              <h2 className="text-2xl font-bold text-blue-300 mb-4">Protecting Yourself From Phishing Attacks</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#1e2a3a] p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-green-400 mb-2">Verify The Sender</h3>
                  <p className="text-blue-100">Always check email addresses and domain legitimacy</p>
                </div>
                <div className="bg-[#1e2a3a] p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-green-400 mb-2">Be Skeptical of Urgent Requests</h3>
                  <p className="text-blue-100">Verify through other channels before taking action</p>
                </div>
                <div className="bg-[#1e2a3a] p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-green-400 mb-2">Hover Over Links</h3>
                  <p className="text-blue-100">Check URLs before clicking</p>
                </div>
                <div className="bg-[#1e2a3a] p-4 rounded-lg">
                  <h3 className="font-bold text-lg text-green-400 mb-2">Use Security Software</h3>
                  <p className="text-blue-100">Keep antivirus and spam filters updated</p>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-blue-300 mb-4">Reporting Phishing Attempts</h2>
              <ul className="list-disc list-inside text-blue-100 space-y-2 mb-6">
                <li>Report to email providers, APWG, FTC, etc.</li>
                <li>Provide detailed information when reporting</li>
              </ul>
              <h2 className="text-2xl font-bold text-blue-300 mb-4">Conclusion</h2>
              <p className="text-blue-100">
                Phishing is a serious and growing threat. Vigilance, awareness, and best practices can help protect against it.
              </p>
            </div>
          </div>
          <button
            className={`mt-6 px-8 py-4 text-white font-bold rounded-2xl shadow-lg transition-all duration-300 text-lg w-full max-w-xs flex items-center justify-center gap-2 ${
              completedAwareness 
                ? 'bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800'
                : 'bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800'
            }`}
            onClick={handleCompleteAwareness}
            disabled={completedAwareness}
          >
            {completedAwareness ? (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Completed!
              </>
            ) : (
              <>
                <CheckCircle2 className="w-6 h-6" />
                Mark as Completed
              </>
            )}
          </button>
        </div>
        {/* Right Content - Video */}
        <div className="sticky top-[200px] bg-[#22304a] rounded-2xl shadow-xl p-6 border border-blue-900 flex flex-col items-center h-fit">
          <h3 className="text-xl font-bold text-blue-200 mb-4 flex items-center gap-2">
            <PlayCircle className="w-6 h-6" />
            Awareness Video
          </h3>
          <div className="aspect-w-16 aspect-h-9 w-full rounded-xl overflow-hidden shadow-md mb-4">
            <video 
              className="w-full h-full object-cover bg-black"
              controls
              poster="/assets/video-poster.jpg"
            >
              <source src="/assets/Awareness.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="text-sm text-blue-300 italic flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Watch this short video to boost your phishing awareness
          </p>
        </div>
      </div>
    </div>
  );
};

export default AwarenessSection; 
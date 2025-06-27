import React from 'react';

const MyProgress = ({ progress, totals, setActiveTab }) => {
  const sections = [
    { key: 'awareness', label: 'Awareness', color: 'bg-blue-500', icon: '📘' },
    { key: 'articles', label: 'Articles', color: 'bg-cyan-400', icon: '📰' },
    { key: 'videos', label: 'Videos', color: 'bg-green-400', icon: '🎥' },
    // { key: 'updates', label: 'Updates', color: 'bg-gray-400' },
  ];

  return (
    <div className="w-full p-0">
      <div className="bg-[#1a2332] rounded-2xl shadow-xl p-4 md:p-8">
        <h1 className="text-3xl font-bold text-center text-blue-100 mb-8 flex items-center justify-center gap-3">
          <span className="text-4xl">📊</span>
          Training Progress
        </h1>
        <div className="space-y-8">
          {sections.map(section => {
            const percent = totals[section.key] ? Math.round((progress[section.key] || 0) / totals[section.key] * 100) : 0;
            return (
              <div 
                key={section.key} 
                className="bg-[#22304a] rounded-xl p-6 hover:shadow-lg transition-all transform hover:scale-[1.02] border border-blue-900"
              >
                <div className="flex justify-between items-center mb-4">
                  <a
                    href="#"
                    className="flex items-center gap-3 font-bold text-lg text-blue-200 hover:text-blue-400 transition-colors group"
                    onClick={e => {
                      e.preventDefault();
                      if (typeof setActiveTab === 'function') {
                        setActiveTab(section.key);
                      }
                    }}
                  >
                    <span className="text-2xl transform group-hover:scale-110 transition-transform">{section.icon}</span>
                    <span className="group-hover:underline">{section.label}</span>
                  </a>
                  <span className="text-blue-300 font-semibold bg-[#1a2332] px-4 py-2 rounded-full border border-blue-900">
                    {progress[section.key] || 0} / {totals[section.key] || 0} completed
                  </span>
                </div>
                <div className="relative">
                  <div className="w-full bg-[#2a3952] rounded-full h-4 overflow-hidden">
                    <div
                      className={`${section.color} h-4 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="absolute right-0 -top-6 text-sm font-semibold text-blue-300 bg-[#1a2332] px-2 rounded-full border border-blue-900">
                    {percent}%
                  </div>
                </div>
                <div className="mt-4 flex justify-between items-center text-sm text-blue-300">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400"></span>
                    Start
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Complete
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-8 text-center">
          <p className="text-blue-300 italic flex items-center justify-center gap-2">
            <span>💡</span>
            Click on any section to navigate directly to that content
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyProgress;

import React from 'react';
import { GraduationCap, BookOpen, CheckCircle2 } from 'lucide-react';

const ModulesSection = ({ contents, validCompletedModules, handleCompleteModule }) => {
  const filteredContents = contents.filter(c => c.type === 'module');

  return (
    <div className="bg-[#22304a] rounded-2xl shadow-xl p-6 border border-blue-900 w-full mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-blue-100 flex items-center gap-3">
        <GraduationCap className="w-10 h-10" />
        Modules
      </h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {filteredContents.map(content => (
          <div key={content.id} className="bg-[#1a2332] border border-blue-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col">
            <h3 className="font-bold text-xl mb-3 text-blue-200 flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              {content.title}
            </h3>
            <p className="text-blue-100 mb-4 flex-1">{content.description}</p>
            <button
              className={`mt-2 px-4 py-2 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                validCompletedModules.includes(content.id) 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={() => handleCompleteModule(content.id)}
              disabled={validCompletedModules.includes(content.id)}
            >
              {validCompletedModules.includes(content.id) ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Completed
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Mark as Completed
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModulesSection; 
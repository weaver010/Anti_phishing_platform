import React from 'react';
import { Video, PlayCircle, CheckCircle2 } from 'lucide-react';

const getYouTubeID = (url) => {
  const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([\w-]{11})/;
  const match = url.match(regExp);
  return match ? match[1] : null;
};

const VideosSection = ({ contents, validCompletedVideos, handleCompleteVideo }) => {
  const filteredContents = contents.filter(c => c.type === 'video');

  return (
    <div className="bg-[#22304a] rounded-2xl shadow-xl p-6 border border-blue-900 w-full mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-8 text-blue-100 flex items-center gap-3">
        <Video className="w-10 h-10" />
        Videos
      </h1>
      <div className="grid gap-8 md:grid-cols-2">
        {filteredContents.map(content => (
          <div key={content.id} className="bg-[#1a2332] border border-blue-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex flex-col">
            <h3 className="font-bold text-xl mb-4 text-blue-200 flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              {content.title}
            </h3>
            <div className="aspect-w-16 aspect-h-9 mb-4">
              {(content.video_url.includes('youtube.com') || content.video_url.includes('youtu.be')) ? (
                <iframe
                  className="w-full h-full rounded-lg"
                  src={`https://www.youtube.com/embed/${getYouTubeID(content.video_url)}`}
                  title={content.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <video controls className="w-full h-full rounded-lg">
                  <source src={content.video_url} type="video/mp4" />
                </video>
              )}
            </div>
            <button
              className={`mt-2 px-4 py-2 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
                validCompletedVideos.includes(content.id) 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
              onClick={() => handleCompleteVideo(content.id)}
              disabled={validCompletedVideos.includes(content.id)}
            >
              {validCompletedVideos.includes(content.id) ? (
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

export default VideosSection; 
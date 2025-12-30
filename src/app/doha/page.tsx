'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Info, Hotel, ArrowLeft, Train } from 'lucide-react';

export default function DohaMetroMap() {
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);

  React.useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({ lat: position.coords.latitude, lon: position.coords.longitude });
        },
        () => {}
      );
    }
  }, []);

  const gpsToMapCoords = (lat: number, lon: number) => {
    const dohaCenterLat = 25.2854;
    const dohaCenterLon = 51.5310;
    const mapCenterX = 300;
    const mapCenterY = 300;
    const scaleX = 15000;
    const scaleY = 15000;
    const x = mapCenterX + (lon - dohaCenterLon) * scaleX;
    const y = mapCenterY - (lat - dohaCenterLat) * scaleY;
    return { x, y };
  };

  const userMapPosition = userLocation ? gpsToMapCoords(userLocation.lat, userLocation.lon) : null;

  const stops = [
    { id: 1, name: 'HIA Airport', x: 450, y: 350, type: 'major', info: 'Hamad International Airport Terminal 1. Direct metro connection from arrivals. One of the worlds best airports with duty-free shopping, restaurants, and lounges. The metro runs every 5-6 minutes to the city center (20 min ride).' },
    { id: 2, name: 'Souq Waqif', x: 300, y: 300, type: 'major', info: 'Traditional Qatari marketplace dating back centuries. Maze of alleyways with spices, textiles, handicrafts, and traditional restaurants. Try authentic Qatari cuisine. Open until midnight. Gold Line station, 5 min walk.' },
    { id: 3, name: 'Museum of Islamic Art', x: 320, y: 280, type: 'major', info: 'World-class museum designed by I.M. Pei featuring 14 centuries of Islamic art. Stunning waterfront location on the Corniche. Free entry to park, museum ticket 50 QAR. Open Sat-Thu 9am-7pm. Nearby Corniche station on Red Line.' },
    { id: 4, name: 'The Pearl-Qatar', x: 250, y: 200, type: 'major', info: 'Luxury man-made island with Mediterranean-style marinas, upscale shopping, fine dining, and beaches. Perfect for evening strolls. No direct metro - take Red Line to Legtaifiya then taxi (10 min, 15-20 QAR) or Metrolink bus.' },
    { id: 5, name: 'Katara Cultural Village', x: 220, y: 230, type: 'major', info: 'Cultural hub with amphitheater, galleries, beaches, and restaurants representing global cuisines. Regular festivals and exhibitions. Free entry. Open daily. Direct Red Line station. Beautiful at sunset. Allow 2-3 hours.' },
    { id: 6, name: 'National Museum of Qatar', x: 330, y: 310, type: 'major', info: 'Stunning desert rose-inspired architecture by Jean Nouvel. Chronicles Qatar history from geological origins to modern day. Immersive galleries and artifacts. Entry 50 QAR. Open daily 9am-7pm. Gold Line station, direct access.' },
    { id: 7, name: 'Msheireb Downtown', x: 300, y: 295, type: 'major', info: 'Smart sustainable downtown district blending heritage and modernity. Four heritage house museums, boutique shops, cafes. Central interchange station connecting all three metro lines. Free museum entry. Modern Qatari architecture showcase.' },
    { id: 8, name: 'Villaggio Mall', x: 280, y: 330, type: 'regular', info: 'Venice-themed shopping mall with indoor canal and gondola rides. 200+ stores including luxury brands. Indoor theme park, ice rink, cinema. Gold Line to Al Aziziyah station then short taxi. Great for families and AC shopping escape.' },
    { id: 9, name: 'Education City', x: 200, y: 320, type: 'regular', info: 'Home to branch campuses of major universities. Modern architecture, Qatar National Library (stunning design, free entry), Qatar Foundation. Green Line direct access. Peaceful campus atmosphere, great for walking tours.' },
    { id: 10, name: 'West Bay', x: 270, y: 250, type: 'major', info: 'Modern financial district with skyscrapers including iconic Tornado Tower and Burj Qatar. Waterfront Corniche promenade perfect for jogging or walking. Many hotels and restaurants. Red Line West Bay station. Business heart of Doha.' },
    { id: 11, name: 'Aspire Park', x: 260, y: 340, type: 'regular', info: 'Doha largest park with lake, playgrounds, sports facilities, and iconic Aspire Tower (The Torch). Perfect for picnics and outdoor activities. Free entry. Green Line to Al Aziziyah area. Popular with families, especially evenings and weekends.' }
  ];

  const highlights = [
    { title: 'Souq Waqif', description: 'Ancient marketplace with traditional Qatari goods, spices, textiles, and authentic restaurants. Open until midnight. Perfect for evening exploration and dinner.', stop: 'Souq Waqif (Gold Line)', time: '2-3 hours' },
    { title: 'Museum of Islamic Art', description: 'I.M. Pei masterpiece with 1400 years of Islamic art. Waterfront Corniche location. 50 QAR entry. One of Middle Easts finest museums.', stop: 'Corniche (Red Line)', time: '2-3 hours' },
    { title: 'Katara Cultural Village', description: 'Cultural hub with amphitheater, galleries, beach, and international restaurants. Regular festivals and events. Free entry. Beautiful sunset spot.', stop: 'Katara (Red Line)', time: '2-3 hours' },
    { title: 'The Pearl-Qatar', description: 'Luxury man-made island with marinas, upscale shopping, and fine dining. Mediterranean atmosphere. Evening strolls along the marina recommended.', stop: 'Legtaifiya then taxi', time: '2-4 hours' },
    { title: 'National Museum of Qatar', description: 'Jean Nouvel desert rose architecture. Chronicles Qatar from ancient times to present. Immersive galleries. 50 QAR entry.', stop: 'National Museum (Gold Line)', time: '2-3 hours' },
    { title: 'West Bay Corniche', description: 'Modern skyline with waterfront promenade. Perfect for walks with city views. Many restaurants and cafes. Free outdoor gym equipment along the path.', stop: 'West Bay (Red Line)', time: '1-2 hours' }
  ];

  const currentStop = selectedStop ? stops.find(s => s.id === selectedStop) : null;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800 p-6">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold mb-4 hover:bg-gray-100 transition-all">
          <ArrowLeft className="w-5 h-5" />
          Back to Cities
        </a>

        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Train className="w-10 h-10 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-600">Doha Metro Red Line Guide</h1>
          </div>
          <p className="text-xl text-gray-700">Ultra-Modern Metro System • February 5-7, 2026</p>
        </div>

        <div className="bg-blue-100 border-l-4 border-blue-500 p-4 mb-6 rounded-lg">
          <p className="text-blue-900">
            <strong>Metro Info:</strong> Doha Metro operates 6 AM-11 PM (Sat-Wed), 6 AM-12 AM (Thu), 2 PM-12 AM (Fri). Day pass only 6 QAR for unlimited rides! Trains every 5-6 minutes. All stations are air-conditioned.
          </p>
        </div>

        {currentStop && (
          <div className="bg-white border-2 border-purple-500 rounded-xl p-4 mb-6 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-purple-600 mb-2">{currentStop.name}</h3>
                <p className="text-gray-700">{currentStop.info}</p>
              </div>
              <button onClick={() => setSelectedStop(null)} className="text-gray-500 hover:text-gray-700 text-2xl font-bold ml-4">×</button>
            </div>
          </div>
        )}

        {userLocation && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
            <p className="text-green-900 text-sm"><strong>Your location is shown on the map</strong> as a blue pulsing dot</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-b from-blue-50 to-purple-100 rounded-2xl shadow-2xl p-8 relative">
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg text-sm z-10">
              <div className="flex items-center gap-2 mb-2"><div className="w-4 h-4 bg-purple-600 rounded-full border-2 border-purple-800"></div><span>Major Attraction</span></div>
              <div className="flex items-center gap-2 mb-2"><div className="w-4 h-4 bg-indigo-500 rounded-full border-2 border-indigo-700"></div><span>Metro Stop</span></div>
              {userLocation && (<div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-700"></div><span>Your Location</span></div>)}
            </div>

            <svg viewBox="0 0 600 600" className="w-full h-auto">
              <path d="M 100 350 Q 200 340 400 350 Q 500 360 550 380" fill="none" stroke="#60A5FA" strokeWidth="20" opacity="0.5"/>
              <text x="300" y="380" fill="#2563EB" fontSize="14" fontWeight="bold">Arabian Gulf</text>
              
              <path d="M 450 150 L 450 400 Q 430 450 380 480 Q 320 510 260 520 Q 200 520 150 490 Q 120 470 110 430 L 110 300 Q 120 250 150 220 Q 180 190 220 180 Q 280 170 320 200 L 400 240 Q 430 260 450 280" 
                    fill="none" stroke="#9333EA" strokeWidth="5" strokeDasharray="8,4" opacity="0.8"/>
              
              <text x="450" y="170" fill="#9333EA" fontSize="14" fontWeight="bold">Red Line →</text>
              
              {userMapPosition && userMapPosition.x > 0 && userMapPosition.x < 600 && userMapPosition.y > 0 && userMapPosition.y < 600 && (
                <g>
                  <circle cx={userMapPosition.x} cy={userMapPosition.y} r="15" fill="#3B82F6" opacity="0.3">
                    <animate attributeName="r" from="15" to="25" dur="1.5s" repeatCount="indefinite"/>
                    <animate attributeName="opacity" from="0.3" to="0" dur="1.5s" repeatCount="indefinite"/>
                  </circle>
                  <circle cx={userMapPosition.x} cy={userMapPosition.y} r="8" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2"/>
                  <text x={userMapPosition.x} y={userMapPosition.y - 20} textAnchor="middle" fontSize="11" fontWeight="bold" fill="#1E40AF">You are here</text>
                </g>
              )}
              
              {stops.map(stop => {
                const isSelected = selectedStop === stop.id;
                return (
                  <g key={stop.id}>
                    <circle cx={stop.x} cy={stop.y} r={isSelected ? 12 : 8} fill={stop.type === 'major' ? '#9333EA' : '#6366F1'} stroke={isSelected ? '#FCD34D' : '#581C87'} strokeWidth={isSelected ? 4 : 2} onClick={() => setSelectedStop(stop.id)} style={{ cursor: 'pointer' }}/>
                    <text x={stop.x} y={stop.y - 15} textAnchor="middle" fontSize="10" fontWeight="600" fill="#1F2937" style={{ pointerEvents: 'none' }}>{stop.name}</text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-4 text-sm text-gray-700 bg-white p-3 rounded-lg"><strong>Tip:</strong> Click any dot to see detailed information. Red Line connects all major attractions!</div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4"><MapPin className="w-6 h-6 text-purple-600" /><h3 className="text-xl font-bold text-purple-600">Top Attractions</h3></div>
              <div className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg border-2 border-transparent hover:border-purple-500 transition-all">
                    <h4 className="font-semibold text-gray-800 mb-1">{highlight.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{highlight.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-purple-600 font-semibold">Station: {highlight.stop}</p>
                      <p className="text-xs text-gray-500 italic">{highlight.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4"><Info className="w-6 h-6 text-purple-600" /><h3 className="text-xl font-bold text-purple-600">Travel Tips</h3></div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="pb-2 border-b border-gray-200"><strong>Day Pass:</strong> 6 QAR unlimited travel (best value!)</li>
                <li className="pb-2 border-b border-gray-200"><strong>Weather:</strong> 15-25C, sunny and pleasant in February</li>
                <li className="pb-2 border-b border-gray-200"><strong>Dress Code:</strong> Modest clothing (shoulders and knees covered)</li>
                <li className="pb-2 border-b border-gray-200"><strong>Prayer Times:</strong> Some shops close briefly (5-15 min)</li>
                <li className="pb-2 border-b border-gray-200"><strong>Currency:</strong> Qatari Riyal (QAR), 1 QAR = 0.27 USD</li>
                <li className="pb-2 border-b border-gray-200"><strong>Language:</strong> Arabic, English widely spoken</li>
                <li><strong>Safety:</strong> Extremely safe, low crime rate</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-2xl shadow-xl p-6 border-2 border-purple-500">
              <h3 className="text-xl font-bold text-purple-800 mb-4">Metro Lines</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-red-600">Red Line (40km, 18 stations)</p>
                  <p className="text-gray-600 text-xs">Lusail → Airport → Souq Waqif → Al Wakra</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-green-600">Green Line (22km, 11 stations)</p>
                  <p className="text-gray-600 text-xs">Education City → Hospital → Library</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-yellow-600">Gold Line (14km, 11 stations)</p>
                  <p className="text-gray-600 text-xs">National Museum → Souq Waqif → Villaggio</p>
                </div>
                <p className="text-xs text-gray-600 italic mt-2">All lines connect at Msheireb Station</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Info, ArrowLeft, Bus } from 'lucide-react';

export default function AbuDhabiBigBusMap() {
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
    const abuDhabiCenterLat = 24.4539;
    const abuDhabiCenterLon = 54.3773;
    const mapCenterX = 300;
    const mapCenterY = 300;
    const scaleX = 18000;
    const scaleY = 18000;
    const x = mapCenterX + (lon - abuDhabiCenterLon) * scaleX;
    const y = mapCenterY - (lat - abuDhabiCenterLat) * scaleY;
    return { x, y };
  };

  const userMapPosition = userLocation ? gpsToMapCoords(userLocation.lat, userLocation.lon) : null;

  const stops = [
    { id: 1, name: 'Sheikh Zayed Mosque', x: 180, y: 350, type: 'major', info: 'One of the worlds largest mosques, accommodating 40,000 worshippers. Stunning white marble, 82 domes, 1000 columns, and intricate Islamic design. FREE entry but strict dress code required (long sleeves, long pants/skirt, headscarf for women provided). Open Sat-Thu 9am-10pm, Fri 4:30pm-10pm. Guided tours in English hourly. Dedicated shuttle from Abu Dhabi Mall. Allow 2-3 hours.' },
    { id: 2, name: 'Louvre Abu Dhabi', x: 320, y: 240, type: 'major', info: 'Spectacular Jean Nouvel-designed museum on Saadiyat Island. 700 permanent artworks plus 300 on loan, spanning human history and cultures. Famous rain of light dome. Entry 63 AED, open 10am-6:30pm, closed Mondays. Collect ticket from Big Bus driver at Stop 2. Allow 2-3 hours for full visit. Waterfront cafes available.' },
    { id: 3, name: 'Presidential Palace', x: 380, y: 280, type: 'major', info: 'Qasr Al Watan - working presidential palace open to visitors. Intricate Arabian design, grand halls, stunning library, and exhibits on UAE governance. Entry 65 AED. Open 9am-7pm daily, tours every 30 minutes. STRICT dress code: long pants for men, modest dress with long sleeves for women. Allow 1.5-2 hours.' },
    { id: 4, name: 'Emirates Palace', x: 350, y: 300, type: 'major', info: 'One of worlds most luxurious hotels. Gold-plated interiors, private beach, and opulent architecture. Visit the lobby, have afternoon tea, or try the famous 24-karat gold cappuccino at Le Cafe (85 AED). Gardens open to public. Perfect for photos and experiencing ultra-luxury Abu Dhabi style.' },
    { id: 5, name: 'Corniche', x: 300, y: 280, type: 'major', info: '8km waterfront promenade with pristine public beaches, parks, restaurants, and cycling paths. Free public beaches with Blue Flag status. Perfect for morning jogs, sunset walks, or relaxing by the Arabian Gulf. Bike rentals available. Family-friendly with playgrounds and cafes throughout.' },
    { id: 6, name: 'Heritage Village', x: 270, y: 300, type: 'major', info: 'Reconstructed traditional Bedouin village showcasing pre-oil UAE life. Watch craftsmen making pottery, weaving, and metalwork. Traditional tents, souq, and museum. FREE entry. Open Sat-Thu 9am-5pm, Fri 3:30pm-9pm. Great for understanding Emirati culture and history. Beach access and photo opportunities.' },
    { id: 7, name: 'Marina Mall', x: 250, y: 260, type: 'regular', info: 'Large shopping mall with 400+ stores, Marina Eye observation wheel, ice rink, and diverse food court. International and local brands. Good for AC shopping break and lunch. Mall hours 10am-10pm (Thu-Sat until midnight). Marina Eye offers panoramic city views for 30 AED.' },
    { id: 8, name: 'Al Hosn Fort', x: 300, y: 320, type: 'major', info: 'Abu Dhabis oldest stone building (1795), former palace of ruling family. Now museum chronicling city transformation from fishing village to modern capital. Recently restored with interactive exhibits. Entry 20 AED. Open daily 9am-7pm. Cultural events and exhibitions held in courtyard. Allow 1 hour.' },
    { id: 9, name: 'Abu Dhabi Mall', x: 280, y: 330, type: 'regular', info: 'Starting point for Big Bus tours and shuttle to Grand Mosque. 200+ stores, hypermarket, electronics, fashion. Food court with international cuisines. Connected to hotels. Tours depart here for mosque at 11:30am and 2:30pm. Good for last-minute shopping and dining.' },
    { id: 10, name: 'Etihad Towers', x: 360, y: 290, type: 'regular', info: 'Five luxury tower complex with observation deck at 300 on 74th floor. Stunning 360-degree city views. Entry 75 AED includes complimentary beverage. Open daily 10am-6pm. High-end shopping, restaurants, and Conrad Hotel. Perfect for sunset views and photos.' },
    { id: 11, name: 'Saadiyat Island', x: 340, y: 220, type: 'major', info: 'Cultural district and beach destination. Home to Louvre Abu Dhabi, pristine beaches, luxury resorts, and golf courses. Future site of Guggenheim and Zayed National Museum. Beautiful natural beaches with turtle nesting sites. Mix of culture, nature, and luxury.' },
    { id: 12, name: 'Yas Island', x: 420, y: 380, type: 'major', info: 'Entertainment hub with Ferrari World (worlds fastest roller coaster), Yas Waterworld, Warner Bros World, Yas Marina F1 Circuit. Perfect for families and thrill-seekers. Separate tickets required for theme parks. Full day destination. Many hotels and restaurants.' }
  ];

  const highlights = [
    { title: 'Sheikh Zayed Grand Mosque', description: 'Worlds most beautiful mosque with 82 domes and 1000 marble columns. FREE entry with strict dress code. Dedicated shuttle from Abu Dhabi Mall. Guided English tours hourly.', stop: 'Mosque Shuttle (Green Route)', time: '2-3 hours', price: 'FREE' },
    { title: 'Louvre Abu Dhabi', description: 'Jean Nouvel masterpiece on Saadiyat Island. 700+ artworks spanning human civilization. Famous rain of light dome. Closed Mondays. Waterfront location.', stop: 'Stop 2 - Louvre', time: '2-3 hours', price: '63 AED' },
    { title: 'Presidential Palace', description: 'Qasr Al Watan - working palace open to public. Intricate Arabian design, grand library, governance exhibits. Tours every 30 minutes. Strict modest dress required.', stop: 'Stop 11 - Presidential Palace', time: '1.5-2 hours', price: '65 AED' },
    { title: 'Emirates Palace Hotel', description: 'Ultra-luxury hotel with gold interiors. Visit lobby, try 24k gold cappuccino (85 AED), afternoon tea. Perfect for experiencing Abu Dhabi opulence.', stop: 'Stop 10 - Emirates Palace', time: '1 hour', price: 'Free lobby' },
    { title: 'Heritage Village', description: 'Traditional Bedouin village reconstruction. Watch craftsmen, explore museum, learn pre-oil UAE life. FREE entry. Perfect for cultural understanding.', stop: 'Stop 6 - Heritage Village', time: '1-2 hours', price: 'FREE' },
    { title: 'Corniche Waterfront', description: '8km promenade with Blue Flag beaches, parks, cycling paths. Perfect for walks, jogs, relaxation. Free public beaches with facilities.', stop: 'Stops 3-4 - Corniche', time: '1-3 hours', price: 'FREE' }
  ];

  const currentStop = selectedStop ? stops.find(s => s.id === selectedStop) : null;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-teal-600 via-cyan-700 to-blue-800 p-6">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 bg-white text-teal-700 px-4 py-2 rounded-lg font-semibold mb-4 hover:bg-gray-100 transition-all">
          <ArrowLeft className="w-5 h-5" />
          Back to Cities
        </a>

        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Bus className="w-10 h-10 text-teal-600" />
            <h1 className="text-4xl font-bold text-teal-600">Abu Dhabi Big Bus Tour</h1>
          </div>
          <p className="text-xl text-gray-700">Hop-On Hop-Off Sightseeing • February 8-10, 2026</p>
        </div>

        <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-6 rounded-lg">
          <p className="text-orange-900">
            <strong>Big Bus Info:</strong> Red Route has 14 stops, buses every 60 minutes. 24hr ticket from 75 USD. Includes Grand Mosque shuttle. 48hr adds Louvre entry. 72hr adds Presidential Palace. Open-top with AC and audio guide in 8 languages.
          </p>
        </div>

        {currentStop && (
          <div className="bg-white border-2 border-teal-500 rounded-xl p-4 mb-6 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-teal-600 mb-2">{currentStop.name}</h3>
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
          <div className="lg:col-span-2 bg-gradient-to-b from-cyan-50 to-teal-100 rounded-2xl shadow-2xl p-8 relative">
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg text-sm z-10">
              <div className="flex items-center gap-2 mb-2"><div className="w-4 h-4 bg-teal-600 rounded-full border-2 border-teal-800"></div><span>Major Attraction</span></div>
              <div className="flex items-center gap-2 mb-2"><div className="w-4 h-4 bg-cyan-500 rounded-full border-2 border-cyan-700"></div><span>Bus Stop</span></div>
              {userLocation && (<div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-700"></div><span>Your Location</span></div>)}
            </div>

            <svg viewBox="0 0 600 600" className="w-full h-auto">
              <path d="M 50 280 Q 200 260 400 270 Q 500 275 580 290" fill="none" stroke="#67E8F9" strokeWidth="25" opacity="0.5"/>
              <text x="300" y="310" fill="#0891B2" fontSize="14" fontWeight="bold">Arabian Gulf</text>
              
              <ellipse cx="300" cy="300" rx="150" ry="120" fill="none" stroke="#0D9488" strokeWidth="5" strokeDasharray="10,5" opacity="0.8"/>
              <text x="300" y="200" fill="#0D9488" fontSize="14" fontWeight="bold" textAnchor="middle">Big Bus Red Route</text>
              
              <path d="M 180 350 L 180 380" stroke="#0D9488" strokeWidth="3"/>
              <text x="180" y="400" fill="#0D9488" fontSize="12" fontWeight="bold" textAnchor="middle">Mosque Shuttle</text>
              
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
                    <circle cx={stop.x} cy={stop.y} r={isSelected ? 12 : 8} fill={stop.type === 'major' ? '#0D9488' : '#06B6D4'} stroke={isSelected ? '#FCD34D' : '#115E59'} strokeWidth={isSelected ? 4 : 2} onClick={() => setSelectedStop(stop.id)} style={{ cursor: 'pointer' }}/>
                    <text x={stop.x} y={stop.y - 15} textAnchor="middle" fontSize="9" fontWeight="600" fill="#1F2937" style={{ pointerEvents: 'none' }}>{stop.name}</text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-4 text-sm text-gray-700 bg-white p-3 rounded-lg"><strong>Tip:</strong> Click any dot for details. Start from Abu Dhabi Mall (Stop 1). Buses every hour on Red Route!</div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4"><MapPin className="w-6 h-6 text-teal-600" /><h3 className="text-xl font-bold text-teal-600">Must-See Attractions</h3></div>
              <div className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg border-2 border-transparent hover:border-teal-500 transition-all">
                    <h4 className="font-semibold text-gray-800 mb-1">{highlight.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{highlight.description}</p>
                    <div className="flex justify-between items-center text-xs">
                      <p className="text-teal-600 font-semibold">{highlight.stop}</p>
                      <div className="text-right">
                        <p className="text-gray-500 italic">{highlight.time}</p>
                        <p className="font-semibold text-orange-600">{highlight.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4"><Info className="w-6 h-6 text-teal-600" /><h3 className="text-xl font-bold text-teal-600">Travel Tips</h3></div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="pb-2 border-b border-gray-200"><strong>Tickets:</strong> 24hr (75 USD), 48hr (+Louvre), 72hr (+Palace)</li>
                <li className="pb-2 border-b border-gray-200"><strong>Weather:</strong> 18-28C, warm and sunny in February</li>
                <li className="pb-2 border-b border-gray-200"><strong>Dress Code:</strong> Modest at mosque and palace - STRICT!</li>
                <li className="pb-2 border-b border-gray-200"><strong>Start Point:</strong> Abu Dhabi Mall recommended</li>
                <li className="pb-2 border-b border-gray-200"><strong>Currency:</strong> UAE Dirham (AED), 1 USD = 3.67 AED</li>
                <li className="pb-2 border-b border-gray-200"><strong>Language:</strong> Arabic, English widely spoken</li>
                <li><strong>App:</strong> Download Big Bus app for live tracking</li>
              </ul>
            </div>

            <div className="bg-teal-50 rounded-2xl shadow-xl p-6 border-2 border-teal-500">
              <h3 className="text-xl font-bold text-teal-800 mb-4">Big Bus Routes</h3>
              <div className="space-y-3 text-sm">
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-red-600">Red Route (City Tour)</p>
                  <p className="text-gray-600 text-xs mb-1">14 stops, 1hr 50min full loop</p>
                  <p className="text-gray-600 text-xs">Buses every 60 minutes, 10am-6pm</p>
                  <p className="text-gray-600 text-xs mt-1">All major attractions covered</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <p className="font-semibold text-green-600">Green Route (Mosque Shuttle)</p>
                  <p className="text-gray-600 text-xs mb-1">2 stops only - direct shuttle</p>
                  <p className="text-gray-600 text-xs">Abu Dhabi Mall ↔ Grand Mosque</p>
                  <p className="text-gray-600 text-xs mt-1">Departs 11:30am & 2:30pm each way</p>
                </div>
                <p className="text-xs text-gray-600 italic mt-2">Transfer between routes at Abu Dhabi Mall</p>
              </div>
            </div>

            <div className="bg-orange-50 rounded-2xl shadow-xl p-6 border-2 border-orange-400">
              <h3 className="text-lg font-bold text-orange-800 mb-3">Important Dress Codes</h3>
              <div className="text-xs space-y-2">
                <div className="bg-white p-2 rounded">
                  <p className="font-semibold text-orange-800">Sheikh Zayed Mosque:</p>
                  <p className="text-gray-700">Women: Long sleeves, long skirt/pants, headscarf (provided)</p>
                  <p className="text-gray-700">Men: Long pants, shirt (no shorts or sleeveless)</p>
                </div>
                <div className="bg-white p-2 rounded">
                  <p className="font-semibold text-orange-800">Presidential Palace:</p>
                  <p className="text-gray-700">Women: Modest dress, long sleeves</p>
                  <p className="text-gray-700">Men: Long pants only (NO SHORTS)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

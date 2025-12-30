'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Info, Hotel, ArrowLeft } from 'lucide-react';

export default function BelgradeTramMap() {
  const [selectedStop, setSelectedStop] = useState<number | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lon: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  React.useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude
          });
          setLocationError(null);
        },
        (error) => {
          setLocationError('Location access denied. Enable location to see your position on the map.');
          console.log('Location error:', error);
        }
      );
    } else {
      setLocationError('Location not supported on this device.');
    }
  }, []);

  const gpsToMapCoords = (lat: number, lon: number) => {
    const belgradeCenterLat = 44.8176;
    const belgradeCenterLon = 20.4569;
    const mapCenterX = 300;
    const mapCenterY = 350;
    const scaleX = 8000;
    const scaleY = 8000;
    const x = mapCenterX + (lon - belgradeCenterLon) * scaleX;
    const y = mapCenterY - (lat - belgradeCenterLat) * scaleY;
    return { x, y };
  };

  const userMapPosition = userLocation ? gpsToMapCoords(userLocation.lat, userLocation.lon) : null;

  const stops = [
    { id: 1, name: 'Hilton Hotel', x: 330, y: 500, type: 'hotel', info: 'Your starting point! The Hilton Belgrade is located at Slavija Square, one of the busiest roundabouts in Belgrade. Walk just 2 minutes south to reach the Trg Slavija tram stop where you can catch Tram 2L.' },
    { id: 2, name: 'Kalemegdan Fortress', x: 250, y: 180, type: 'major', info: 'This massive fortress dates back to the 1st century AD and sits at the strategic confluence of the Sava and Danube rivers. Explore medieval towers, Roman wells, the Military Museum, and stunning panoramic views. The fortress park is free to enter and includes the Belgrade Zoo. Allow 2-3 hours to explore fully.' },
    { id: 3, name: 'Knez Mihailova Street', x: 280, y: 220, type: 'major', info: 'Belgrade main pedestrian boulevard stretching 1km from Republic Square to Kalemegdan. This protected cultural monument features stunning 19th-century architecture, international brand stores, Serbian boutiques, cafes with outdoor seating, and street musicians. Perfect for shopping, people-watching, and soaking in the city atmosphere.' },
    { id: 4, name: 'Republic Square', x: 310, y: 250, type: 'major', info: 'The heart of Belgrade featuring the iconic Prince Mihailo Monument (1882). Home to the National Museum (housing 400,000 artifacts including Roman mosaics and Renaissance paintings) and the National Theatre (built 1869). This is Belgrade most popular meeting point and hosts frequent cultural events.' },
    { id: 5, name: 'Skadarlija', x: 390, y: 310, type: 'major', info: 'Belgrade bohemian quarter, often called the Montmartre of Belgrade. This cobblestone street dates to the 1800s and was the gathering place for writers, poets, and artists. Today it features traditional Serbian restaurants with live folk music, outdoor dining, and vintage street lamps. Try traditional dishes like cevapi, pljeskavica, and sarma. Reservations recommended for dinner.' },
    { id: 6, name: 'Vukov Spomenik', x: 400, y: 440, type: 'major', info: 'Cultural and educational district named after the monument to Vuk Karadzic, reformer of the Serbian language. Located near the National Library of Serbia, University of Belgrade Faculty of Law, and several museums. The area has a vibrant student atmosphere with affordable cafes and bookshops.' },
    { id: 7, name: 'Trg Slavija', x: 300, y: 480, type: 'major', info: 'Major traffic roundabout and transport hub named after the Slavic Congress held here in 1910. Features the Monument to Dimitrije Tucovic, a prominent socialist leader. This is your nearest tram stop from the Hilton Hotel - the perfect starting point for your Belgrade exploration.' },
    { id: 8, name: 'Belgrade Waterfront', x: 230, y: 450, type: 'major', info: 'A modern 3.5 billion euro development along the Sava River featuring contemporary architecture, luxury apartments, shopping mall (Galerija Belgrade), restaurants with river views, and a scenic promenade. Visit the striking glass Kula Belgrade tower and enjoy sunset walks along the river. Great contrast to Old Belgrade.' },
    { id: 9, name: 'St. Sava Temple', x: 350, y: 520, type: 'major', info: 'One of the largest Orthodox churches in the world! This stunning white marble cathedral with golden domes was built on the site where the Ottomans burned the relics of Saint Sava in 1594. Construction began in 1935 and the interior is still being decorated with magnificent mosaics. The main dome is 70m high. Free entry. Open 7am-7pm daily. Allow 1 hour to visit.' },
  ];

  const highlights = [
    { title: 'Kalemegdan Fortress', description: 'Ancient fortress dating to 1st century AD at the confluence of two rivers. Features medieval towers, Roman wells, Military Museum, and panoramic views. Home to Belgrade Zoo. Free entry, allow 2-3 hours.', stop: 'Kalemegdan Fortress', time: '2-3 hours' },
    { title: 'St. Sava Temple', description: 'One of the largest Orthodox churches in the world with stunning white marble and golden domes. Built where Saint Sava relics were burned in 1594. Main dome is 70m high with magnificent interior mosaics.', stop: 'St. Sava Temple', time: '1 hour' },
    { title: 'Knez Mihailova Street', description: 'Belgrade 1km pedestrian boulevard with 19th-century architecture. Protected cultural monument featuring international shops, Serbian boutiques, outdoor cafes, and street musicians.', stop: 'Knez Mihailova Street', time: '1-2 hours' },
    { title: 'Skadarlija District', description: 'The Montmartre of Belgrade - bohemian cobblestone quarter from the 1800s. Traditional Serbian restaurants with live folk music, vintage atmosphere. Try cevapi, pljeskavica, and sarma.', stop: 'Skadarlija', time: '2 hours (dinner)' },
    { title: 'Republic Square', description: 'Central meeting point featuring Prince Mihailo Monument (1882). Home to National Museum (400,000 artifacts) and National Theatre (1869). Frequent cultural events and performances.', stop: 'Republic Square', time: '30-60 minutes' },
    { title: 'Belgrade Waterfront', description: 'Modern 3.5 billion euro riverside development with contemporary architecture, Galerija Belgrade shopping mall, restaurants with river views, and scenic promenades. Beautiful at sunset.', stop: 'Belgrade Waterfront', time: '1-2 hours' }
  ];

  const currentStop = selectedStop ? stops.find(s => s.id === selectedStop) : null;

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6">
      <div className="max-w-7xl mx-auto">
        <a href="/" className="inline-flex items-center gap-2 bg-white text-purple-700 px-4 py-2 rounded-lg font-semibold mb-4 hover:bg-gray-100 transition-all">
          <ArrowLeft className="w-5 h-5" />
          Back to Cities
        </a>

        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Navigation className="w-10 h-10 text-red-600" />
            <h1 className="text-4xl font-bold text-red-600">Belgrade Tram 2L Tourist Route</h1>
          </div>
          <p className="text-xl text-gray-700">Your Journey from Hilton Hotel - February 2, 2026</p>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg">
          <p className="text-yellow-900">
            <strong>Important Update:</strong> Tram 2 is temporarily out of service. Use Tram 2L which follows a similar circular route. <strong>Good News:</strong> Public transport is FREE in Belgrade as of January 2025!
          </p>
        </div>

        {currentStop && (
          <div className="bg-white border-2 border-red-500 rounded-xl p-4 mb-6 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-red-600 mb-2">{currentStop.name}</h3>
                <p className="text-gray-700">{currentStop.info}</p>
              </div>
              <button onClick={() => setSelectedStop(null)} className="text-gray-500 hover:text-gray-700 text-2xl font-bold ml-4">×</button>
            </div>
          </div>
        )}

        {locationError && (
          <div className="bg-orange-100 border-l-4 border-orange-500 p-4 mb-6 rounded-lg">
            <p className="text-orange-900 text-sm"><strong>Location:</strong> {locationError}</p>
          </div>
        )}

        {userLocation && (
          <div className="bg-green-100 border-l-4 border-green-500 p-4 mb-6 rounded-lg">
            <p className="text-green-900 text-sm"><strong>Your location is shown on the map</strong> as a blue pulsing dot</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl shadow-2xl p-8 relative">
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg text-sm z-10">
              <div className="flex items-center gap-2 mb-2"><div className="w-4 h-4 bg-green-500 rounded-full border-2 border-green-700"></div><span>Your Hotel</span></div>
              <div className="flex items-center gap-2 mb-2"><div className="w-4 h-4 bg-red-600 rounded-full border-2 border-red-800"></div><span>Major Attraction</span></div>
              <div className="flex items-center gap-2 mb-2"><div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-orange-700"></div><span>Tram Stop</span></div>
              {userLocation && (<div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-blue-700"></div><span>Your Location</span></div>)}
            </div>

            <svg viewBox="0 0 600 600" className="w-full h-auto">
              <path d="M 50 150 Q 150 130 300 140 T 550 160" fill="none" stroke="#64B5F6" strokeWidth="25" opacity="0.6"/>
              <text x="280" y="135" fill="#1976D2" fontSize="14" fontWeight="bold">Sava River</text>
              <path d="M 300 50 Q 400 45 500 60 T 600 90" fill="none" stroke="#64B5F6" strokeWidth="20" opacity="0.6"/>
              <text x="450" y="45" fill="#1976D2" fontSize="12" fontWeight="bold">Danube</text>
              <ellipse cx="300" cy="350" rx="180" ry="200" fill="none" stroke="#E31E24" strokeWidth="4" strokeDasharray="10,5" opacity="0.8"/>
              <path d="M 420 350 L 440 350 L 435 345 M 440 350 L 435 355" stroke="#E31E24" strokeWidth="3" fill="none"/>
              <text x="445" y="355" fill="#E31E24" fontSize="12" fontWeight="bold">Tram Direction</text>
              
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
                    <circle cx={stop.x} cy={stop.y} r={isSelected ? 12 : (stop.type === 'hotel' ? 10 : 7)} fill={stop.type === 'hotel' ? '#4CAF50' : '#E31E24'} stroke={isSelected ? '#FCD34D' : (stop.type === 'hotel' ? '#2E7D32' : '#B71C1C')} strokeWidth={isSelected ? 4 : 2} onClick={() => setSelectedStop(stop.id)} style={{ cursor: 'pointer' }}/>
                    <text x={stop.x} y={stop.y - 18} textAnchor="middle" fontSize="11" fontWeight="600" fill="#333" style={{ pointerEvents: 'none' }}>{stop.name}</text>
                  </g>
                );
              })}
            </svg>

            <div className="mt-4 text-sm text-gray-700 bg-white p-3 rounded-lg"><strong>Tip:</strong> Click on any colored dot to see information about that stop!</div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4"><MapPin className="w-6 h-6 text-red-600" /><h3 className="text-xl font-bold text-red-600">Top Highlights</h3></div>
              <div className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg border-2 border-transparent hover:border-red-500 transition-all">
                    <h4 className="font-semibold text-gray-800 mb-1">{highlight.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{highlight.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-red-600 font-semibold">Stop: {highlight.stop}</p>
                      <p className="text-xs text-gray-500 italic">{highlight.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="flex items-center gap-2 mb-4"><Info className="w-6 h-6 text-red-600" /><h3 className="text-xl font-bold text-red-600">Travel Tips</h3></div>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="pb-2 border-b border-gray-200"><strong>Transport:</strong> ALL public transport is FREE!</li>
                <li className="pb-2 border-b border-gray-200"><strong>Weather:</strong> 0-8C - dress warmly</li>
                <li className="pb-2 border-b border-gray-200"><strong>Hours:</strong> Most attractions 10 AM - 5 PM</li>
                <li className="pb-2 border-b border-gray-200"><strong>Frequency:</strong> Trams every 10-15 minutes</li>
                <li className="pb-2 border-b border-gray-200"><strong>App:</strong> Download Moovit for tracking</li>
                <li className="pb-2 border-b border-gray-200"><strong>Lunch:</strong> Try Serbian food in Skadarlija</li>
                <li><strong>Duration:</strong> Full loop takes 30 minutes</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-2xl shadow-xl p-6 border-2 border-green-500">
              <div className="flex items-center gap-2 mb-3"><Hotel className="w-6 h-6 text-green-800" /><h3 className="text-xl font-bold text-green-800">From Your Hotel</h3></div>
              <p className="text-gray-700 leading-relaxed">Walk 2 minutes from Hilton to <strong>Trg Slavija</strong> tram stop. Board Tram 2L and enjoy the circular route around Belgrade historic center. Hop on and off at any stop - it is all free!</p>
            </div>

            <div className="bg-blue-50 rounded-2xl shadow-xl p-6 border-2 border-blue-500">
              <h3 className="text-xl font-bold text-blue-800 mb-4">Beyond Tram 2L</h3>
              <p className="text-sm text-gray-600 mb-3">Other major attractions worth visiting (requires different transport):</p>
              <div className="space-y-4">
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1">Nikola Tesla Museum</h4>
                  <p className="text-xs text-gray-700 mb-2">Original inventions and personal belongings of the famous Serbian-American inventor. Contains his ashes. Interactive demonstrations of his experiments.</p>
                  <p className="text-xs text-blue-600"><strong>Transport:</strong> Bus 31, 33 from Slavija or 15 min walk</p>
                  <p className="text-xs text-gray-500">Time: 1-2 hours • Entry: ~600 RSD</p>
                </div>
                <div className="bg-white p-3 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-1">Zemun District</h4>
                  <p className="text-xs text-gray-700 mb-2">Historic riverside town with Austro-Hungarian architecture. Climb Gardos Tower for panoramic views. Famous fish restaurants along the Danube waterfront.</p>
                  <p className="text-xs text-blue-600"><strong>Transport:</strong> Bus 15, 84 or Tram 7, 9 (30 min)</p>
                  <p className="text-xs text-gray-500">Time: 2-3 hours • Free (tower ~200 RSD)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Info, Hotel } from 'lucide-react';

export default function BelgradeTramMap() {
  const [hoveredStop, setHoveredStop] = useState<number | null>(null);

  const stops = [
    { id: 1, name: 'Hilton Hotel', x: 300, y: 480, type: 'hotel', info: 'Your starting point! Walk 2 minutes to Trg Slavija tram stop.' },
    { id: 2, name: 'Kalemegdan', x: 250, y: 180, type: 'major', info: 'Historic fortress with stunning river views, museums, and Belgrade Zoo.' },
    { id: 3, name: 'Knez Mihailova', x: 280, y: 220, type: 'major', info: 'Main pedestrian street - shopping, cafes, street performers.' },
    { id: 4, name: 'Kralja Petra', x: 310, y: 250, type: 'major', info: 'Near Republic Square and National Theatre.' },
    { id: 5, name: 'Skadarlija', x: 390, y: 310, type: 'major', info: 'Bohemian quarter - traditional restaurants and live music!' },
    { id: 6, name: 'Vukov Spomenik', x: 400, y: 440, type: 'major', info: 'Cultural area near National Library and university.' },
    { id: 7, name: 'Trg Slavija', x: 300, y: 480, type: 'major', info: 'Major square near your hotel! Perfect starting point.' },
    { id: 8, name: 'Savski Trg', x: 230, y: 450, type: 'major', info: 'Near Belgrade Waterfront - modern riverside development.' },
  ];

  const highlights = [
    {
      icon: '🏰',
      title: 'Kalemegdan Fortress',
      description: 'Medieval fortress at river confluence. Museums, zoo, stunning panoramic views of both rivers.',
      stop: 'Kalemegdan'
    },
    {
      icon: '🛍️',
      title: 'Knez Mihailova Street',
      description: 'Main pedestrian zone with 19th-century architecture, shops, cafes, and street performers.',
      stop: 'Kralja Petra'
    },
    {
      icon: '🎭',
      title: 'Skadarlija',
      description: 'Belgrade bohemian quarter - cobblestone streets, traditional restaurants, live music.',
      stop: 'Skadarlija pijaca'
    },
    {
      icon: '🌊',
      title: 'Belgrade Waterfront',
      description: 'Modern riverside development with shops, restaurants, and scenic promenades.',
      stop: 'Savski Trg'
    }
  ];

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
          <h1 className="text-4xl font-bold text-red-600 flex items-center gap-3 mb-2">
            <Navigation className="w-10 h-10" />
            Belgrade Tram 2L Tourist Route
          </h1>
          <p className="text-xl text-gray-700">Your Journey from Hilton Hotel - February 2, 2026</p>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-6 rounded-lg">
          <p className="text-yellow-900">
            <strong>Important Update:</strong> Tram 2 is temporarily out of service. Use Tram 2L which follows a similar circular route. 
            <strong className="ml-2">Good News:</strong> Public transport is FREE in Belgrade as of January 2025!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-gradient-to-b from-blue-100 to-blue-200 rounded-2xl shadow-2xl p-8 relative">
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg text-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-green-700"></div>
                <span>Your Hotel</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-4 h-4 bg-red-600 rounded-full border-2 border-red-800"></div>
                <span>Major Attraction</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-orange-500 rounded-full border-2 border-orange-700"></div>
                <span>Tram Stop</span>
              </div>
            </div>

            <svg viewBox="0 0 600 600" className="w-full h-auto">
              <path d="M 50 150 Q 150 130 300 140 T 550 160" fill="none" stroke="#64B5F6" strokeWidth="25" opacity="0.6"/>
              <text x="280" y="135" fill="#1976D2" fontSize="14" fontWeight="bold">Sava River</text>
              
              <path d="M 300 50 Q 400 45 500 60 T 600 90" fill="none" stroke="#64B5F6" strokeWidth="20" opacity="0.6"/>
              <text x="450" y="45" fill="#1976D2" fontSize="12" fontWeight="bold">Danube</text>
              
              <ellipse cx="300" cy="350" rx="180" ry="200" fill="none" stroke="#E31E24" strokeWidth="4" strokeDasharray="10,5" opacity="0.8"/>
              
              {stops.map(stop => (
                <g 
                  key={stop.id}
                  onMouseEnter={() => setHoveredStop(stop.id)}
                  onMouseLeave={() => setHoveredStop(null)}
                  className="cursor-pointer"
                >
                  <circle 
                    cx={stop.x} 
                    cy={stop.y} 
                    r={stop.type === 'hotel' ? 10 : 7}
                    fill={stop.type === 'hotel' ? '#4CAF50' : '#E31E24'}
                    stroke={stop.type === 'hotel' ? '#2E7D32' : '#B71C1C'}
                    strokeWidth="2"
                    className="transition-all duration-300"
                  />
                  <text 
                    x={stop.x} 
                    y={stop.y - 15} 
                    textAnchor="middle" 
                    fontSize="11" 
                    fontWeight="600"
                    fill="#333"
                  >
                    {stop.name}
                  </text>
                </g>
              ))}
              
              <path d="M 450 350 L 470 350 L 465 345 M 470 350 L 465 355" stroke="#E31E24" strokeWidth="3" fill="none"/>
              <text x="480" y="355" fill="#E31E24" fontSize="14" fontWeight="bold">→</text>
            </svg>

            {hoveredStop && (
              <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-xl border-2 border-red-500 max-w-xs">
                <h4 className="font-bold text-red-600 mb-1">
                  {stops.find(s => s.id === hoveredStop)?.name}
                </h4>
                <p className="text-sm text-gray-700">
                  {stops.find(s => s.id === hoveredStop)?.info}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Top Highlights
              </h3>
              <div className="space-y-3">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg border-2 border-transparent hover:border-red-500 transition-all">
                    <h4 className="font-semibold text-gray-800 mb-1 flex items-center gap-2">
                      <span className="text-xl">{highlight.icon}</span>
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">{highlight.description}</p>
                    <p className="text-xs text-red-600 font-semibold">Stop: {highlight.stop}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
                <Info className="w-6 h-6" />
                Travel Tips
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="pb-2 border-b border-gray-200"><strong>Transport:</strong> ALL public transport is FREE!</li>
                <li className="pb-2 border-b border-gray-200"><strong>Weather:</strong> 0-8°C - dress warmly</li>
                <li className="pb-2 border-b border-gray-200"><strong>Hours:</strong> Most attractions 10 AM - 5 PM</li>
                <li className="pb-2 border-b border-gray-200"><strong>Frequency:</strong> Trams every 10-15 minutes</li>
                <li className="pb-2 border-b border-gray-200"><strong>App:</strong> Download Moovit for tracking</li>
                <li className="pb-2 border-b border-gray-200"><strong>Lunch:</strong> Try Serbian food in Skadarlija</li>
                <li><strong>Duration:</strong> Full loop takes 30 minutes</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-2xl shadow-xl p-6 border-2 border-green-500">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center gap-2">
                <Hotel className="w-6 h-6" />
                From Your Hotel
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Walk 2 minutes from Hilton to <strong>Trg Slavija</strong> tram stop. 
                Board Tram 2L and enjoy the circular route around Belgrade historic center. 
                Hop on and off at any stop - it is all free!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

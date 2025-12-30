'use client';

import React from 'react';
import { Plane, MapPin, Calendar } from 'lucide-react';

export default function TravelGuideHome() {
  const cities = [
    {
      name: 'Belgrade',
      country: 'Serbia',
      dates: 'February 2, 2026',
      transport: 'Tram 2L',
      description: 'Historic Balkan capital with fortress, bohemian quarters, and free public transport.',
      image: '🏰',
      link: '/belgrade',
      color: 'from-red-600 to-red-800'
    },
    {
      name: 'Doha',
      country: 'Qatar',
      dates: 'February 5-7, 2026',
      transport: 'Metro Red Line',
      description: 'Ultra-modern city with world-class metro, stunning architecture, and cultural attractions.',
      image: '🕌',
      link: '/doha',
      color: 'from-purple-600 to-indigo-800'
    },
    {
      name: 'Abu Dhabi',
      country: 'UAE',
      dates: 'February 8-10, 2026',
      transport: 'Big Bus Hop-On Hop-Off',
      description: 'Luxurious capital with Grand Mosque, presidential palace, and world-class museums.',
      image: '🏛️',
      link: '/abu-dhabi',
      color: 'from-teal-600 to-cyan-800'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 pt-8">
          <div className="flex justify-center items-center gap-3 mb-4">
            <Plane className="w-12 h-12 text-white" />
            <h1 className="text-5xl font-bold text-white">
              Your Grand Tour 2026
            </h1>
          </div>
          <p className="text-2xl text-blue-200 mb-2">
            Interactive Travel Guides
          </p>
          <p className="text-lg text-blue-300">
            Belgrade • Doha • Abu Dhabi
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {cities.map((city, idx) => (
            <a
              key={idx}
              href={city.link}
              className="group bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
            >
              <div className={`bg-gradient-to-br ${city.color} p-6 text-white`}>
                <div className="text-6xl mb-3 text-center">{city.image}</div>
                <h2 className="text-3xl font-bold text-center mb-1">{city.name}</h2>
                <p className="text-center text-sm opacity-90">{city.country}</p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3 text-gray-700">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold">{city.dates}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-4 text-gray-700">
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="text-sm">{city.transport}</span>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {city.description}
                </p>
                
                <div className="text-center">
                  <span className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold group-hover:from-blue-700 group-hover:to-purple-700 transition-all">
                    Explore {city.name} →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            What is Included in Each Guide
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Interactive Maps</h4>
              <p className="text-sm text-gray-600">Click stops to see detailed info about each attraction</p>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">📍</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">GPS Tracking</h4>
              <p className="text-sm text-gray-600">See your real-time location on the map</p>
            </div>
            
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">🚇</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Transport Routes</h4>
              <p className="text-sm text-gray-600">Complete routes with all stops and connections</p>
            </div>
            
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-3xl">📝</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Travel Tips</h4>
              <p className="text-sm text-gray-600">Weather, timing, prices, and local advice</p>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-6 text-center">Your Journey</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="bg-white text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                1
              </div>
              <div>
                <p className="font-semibold">Belgrade, Serbia</p>
                <p className="text-sm text-blue-100">February 2 • Explore via Tram 2L</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-white text-purple-600 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                2
              </div>
              <div>
                <p className="font-semibold">Doha, Qatar</p>
                <p className="text-sm text-purple-100">February 5-7 • Metro Red Line adventure</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="bg-white text-teal-600 font-bold rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0">
                3
              </div>
              <div>
                <p className="font-semibold">Abu Dhabi, UAE</p>
                <p className="text-sm text-teal-100">February 8-10 • Big Bus hop-on hop-off tour</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

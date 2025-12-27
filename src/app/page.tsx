'use client';

import React, { useState } from 'react';
import { MapPin, Navigation, Info, Hotel } from 'lucide-react';

export default function BelgradeTramMap() {
  const [hoveredStop, setHoveredStop] = useState(null);

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
    
      
        {/* Header */}
        
          
            
            Belgrade Tram 2L Tourist Route
          
          Your Journey from Hilton Hotel • February 2, 2026
        

        {/* Alert */}
        
          
            ⚠️ Important Update: Tram 2 is temporarily out of service. Use Tram 2L which follows a similar circular route. 
            Good News: Public transport is FREE in Belgrade as of January 2025!
          
        

        {/* Main Content */}
        
          {/* Map */}
          
            
              
                
                Your Hotel
              
              
                
                Major Attraction
              
              
                
                Tram Stop
              
            

            
              {/* Rivers */}
              
              Sava River
              
              
              Danube
              
              {/* Tram Route */}
              
              
              {/* Stops */}
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
                    className="transition-all duration-300 hover:r-10"
                  />
                  
                    {stop.name}
                  
                
              ))}
              
              {/* Direction Arrow */}
              
              →
            

            {/* Hover Tooltip */}
            {hoveredStop && (
              
                
                  {stops.find(s => s.id === hoveredStop)?.name}
                
                
                  {stops.find(s => s.id === hoveredStop)?.info}
                
              
            )}
          

          {/* Info Panel */}
          
            {/* Highlights */}
            
              
                
                Top Highlights
              
              
                {highlights.map((highlight, idx) => (
                  
                    
                      {highlight.icon}
                      {highlight.title}
                    
                    {highlight.description}
                    🚊 Stop: {highlight.stop}
                  
                ))}
              
            

            {/* Travel Tips */}
            
              
                
                Travel Tips
              
              
                🆓 Transport: ALL public transport is FREE!
                ❄️ Weather: 0-8°C - dress warmly
                ⏰ Hours: Most attractions 10 AM - 5 PM
                🚊 Frequency: Trams every 10-15 minutes
                📱 App: Download Moovit for tracking
                🍽️ Lunch: Try Serbian food in Skadarlija
                🕐 Duration: Full loop takes 30 minutes
              
            

            {/* Hotel Info */}
            
              
                
                From Your Hotel
              
              
                Walk 2 minutes from Hilton to Trg Slavija tram stop. 
                Board Tram 2L and enjoy the circular route around Belgrade historic center. 
                Hop on and off at any stop - it is all free!
              
            
          
        
      
    
  );
}

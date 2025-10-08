import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPackage, FiExternalLink } = FiIcons;

const TrackTrace = () => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const carriers = [
    {
      id: 'dao',
      name: 'DAO',
      url: 'https://dao.as/find-din-pakke/?q=',
      logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQFovasKPImRmQ/company-logo_200_200/company-logo_200_200/0/1630541408819/dao365_logo?e=2147483647&v=beta&t=zbYxYalSlDGyobIIAGdjtQrWLWLkHFzN6YOJ3b_eLv4',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'gls',
      name: 'GLS',
      url: 'https://gls-group.eu/DK/da/find-pakke?match=',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKZiHl8zLHIkc6oFs7Ct6NHquQbXS7FwEBwA&s',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const handleTrack = (carrier) => {
    if (!trackingNumber.trim()) return;
    
    const url = `${carrier.url}${encodeURIComponent(trackingNumber)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <img 
              src="https://konsulentbixen.dk/cdn/shop/files/KonsulentBixen.png?height=628&pad_color=ffffff&v=1752602115&width=1200" 
              alt="Konsulentbixen"
              className="h-16 object-contain"
            />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Spor din pakke</h2>
            <p className="text-gray-600 text-lg">Indtast dit sporingsnummer og vælg fragtfirma</p>
          </div>

          {/* Tracking Number Input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sporingsnummer
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Indtast dit sporingsnummer"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
            />
            <p className="text-sm text-gray-600 mt-2">
              Du finder sporingsnummeret i den mail, du modtog da ordren blev afsendt. Har du ikke modtaget et sporingsnummer skyldes det formentlig, at din ordre ikke er afsendt endnu.
            </p>
          </div>

          {/* Carrier Selection */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-4">
              Vælg fragtfirma
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {carriers.map((carrier) => (
                <motion.button
                  key={carrier.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleTrack(carrier)}
                  disabled={!trackingNumber.trim()}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                    !trackingNumber.trim()
                      ? 'opacity-50 cursor-not-allowed border-gray-200 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <img 
                      src={carrier.logo} 
                      alt={carrier.name}
                      className="w-12 h-12 object-contain"
                    />
                    <SafeIcon icon={FiExternalLink} className="text-gray-400" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{carrier.name}</h3>
                    <p className="text-sm text-gray-600">
                      Klik for at spore via {carrier.name}
                    </p>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Help Text */}
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4">
              Ved klik åbnes fragtfirmaets sporingsside i et nyt vindue
            </p>
            <p className="text-sm text-gray-500">
              Har du problemer med at finde dit sporingsnummer? 
              <a href="mailto:support@konsulentbixen.dk" className="text-blue-600 hover:text-blue-700 ml-1">
                Kontakt os
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TrackTrace;
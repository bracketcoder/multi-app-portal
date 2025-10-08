import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from './common/SafeIcon';

const { FiCreditCard, FiShield, FiCheck, FiArrowRight, FiUsers, FiTrendingUp, FiAlertTriangle, FiStar, FiGlobe, FiLock, FiCalculator, FiSmartphone, FiWatch, FiDollarSign, FiExternalLink, FiInfo } = FiIcons;

function App() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const emergencyFeatures = [
    {
      icon: FiShield,
      title: "Beredskab til kriser",
      description: "Følger Danmarks Nationalbanks anbefalinger for robuste betalingsløsninger"
    },
    {
      icon: FiCreditCard,
      title: "Alternativ betalingsmetode",
      description: "Sikrer adgang til penge når Dankort eller MobilePay ikke virker"
    },
    {
      icon: FiSmartphone,
      title: "Mobil & smartwatch betaling",
      description: "Tilføj til Apple Pay, Google Pay eller Samsung Pay som backup betalingsmetode"
    },
    {
      icon: FiDollarSign,
      title: "Kontanthævning",
      description: "Hæv kontanter i alle hæveautomater - Nationalbanken anbefaler 250 kr. pr. person"
    }
  ];

  const paymentMethods = [
    {
      icon: FiCreditCard,
      title: "Fysisk kort",
      description: "Traditionel kortbetaling overalt"
    },
    {
      icon: FiSmartphone,
      title: "Mobil betaling",
      description: "Apple Pay, Google Pay, Samsung Pay"
    },
    {
      icon: FiWatch,
      title: "Smartwatch",
      description: "Betal direkte fra dit ur"
    },
    {
      icon: FiDollarSign,
      title: "Kontanthævning",
      description: "Alle hæveautomater i Danmark"
    }
  ];

  const benefits = [
    "Gratis at anskaffe og have",
    "Op til 45 dages rentefri kredit", 
    "Cashback på alle køb",
    "Intet årsgebyr",
    "Op til 100.000 kr. i kredit",
    "24/7 kundeservice",
    "Rejseforsikring inkluderet"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Berlingske Media Notice - Top */}
      <div className="bg-gray-800 text-white py-3 px-4 text-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-center">
          <SafeIcon icon={FiInfo} className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
          <p className="text-center">
            Dette er et kommercielt site udgivet af Berlingske Medias kommercielle afdeling. Berlingske Medias uafhængige redaktioner har intet at gøre med udarbejdelsen af indholdet.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div 
              className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6"
              variants={fadeIn}
            >
              <SafeIcon icon={FiAlertTriangle} className="mr-2 h-4 w-4" />
              Følger Danmarks Nationalbanks beredskabsanbefalinger
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
              variants={fadeIn}
            >
              Den nemme måde at følge
              <span className="text-red-600"> de seneste</span>
              <br />
              anbefalinger
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
              variants={fadeIn}
            >
              Danmarks Nationalbank anbefaler alternative betalingsmetoder og kontanter til kriser. 
              Bank Norwegian kreditkort sikrer dig adgang til penge på mobil, smartwatch og kontanthævning, 
              selv når andre systemer svigter.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              variants={fadeIn}
            >
              <a 
                href="https://swiy.co/Bank-Norwegian-anbefalinger"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Ansøg om kreditkort nu
                <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
              </a>
            </motion.div>

            <motion.div 
              className="mt-8 flex items-center justify-center space-x-6 text-sm text-gray-500"
              variants={fadeIn}
            >
              <div className="flex items-center">
                <SafeIcon icon={FiCheck} className="text-green-500 mr-1 h-4 w-4" />
                Gratis at anskaffe
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiCheck} className="text-green-500 mr-1 h-4 w-4" />
                Ingen binding
              </div>
              <div className="flex items-center">
                <SafeIcon icon={FiCheck} className="text-green-500 mr-1 h-4 w-4" />
                Svar på 2 minutter
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-100 rounded-full -translate-y-48 translate-x-48 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-100 rounded-full translate-y-32 -translate-x-32 opacity-20"></div>
      </section>

      {/* Nationalbank Warning Section */}
      <section className="bg-orange-50 border-y border-orange-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="mb-6">
              <SafeIcon icon={FiAlertTriangle} className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Danmarks Nationalbanks vigtige anbefaling
              </h2>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-white p-6 rounded-xl shadow-sm border border-orange-200 max-w-4xl mx-auto mb-6"
            >
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "Der kan opstå situationer, hvor en eller flere betalingsløsninger ikke virker som normalt. Det bør du forberede dig på."
              </blockquote>
              <cite className="text-sm text-gray-600 font-medium">
                - Danmarks Nationalbank, Beredskabsanbefalinger til borgere
              </cite>
            </motion.div>

            <motion.div 
              variants={fadeIn}
              className="bg-blue-50 p-6 rounded-xl border border-blue-200 max-w-4xl mx-auto"
            >
              <div className="flex items-center justify-center mb-3">
                <SafeIcon icon={FiDollarSign} className="h-8 w-8 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Kontantanbefaling</h3>
              </div>
              <p className="text-gray-700">
                <strong>Danmarks Nationalbank anbefaler:</strong> Hav mindst 250 kr. kontanter 
                pr. person i husstanden til nødsituationer. Med dit kreditkort kan du hæve 
                kontanter i alle danske hæveautomater.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Payment Methods Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Fire måder at betale på - én løsning
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dit kreditkort fungerer på alle platforme og sikrer dig maksimal fleksibilitet i enhver situation
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {paymentMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center p-6 rounded-xl bg-gradient-to-b from-gray-50 to-white hover:from-red-50 hover:to-white hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={method.icon} className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {method.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <SafeIcon icon={FiCheck} className="mr-2 h-4 w-4" />
              Alle betalingsmetoder inkluderet uden ekstra gebyr
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Features */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Derfor anbefaler eksperterne kreditkort
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Når Dankort, MobilePay eller bankernes systemer svigter, 
              sikrer et kreditkort dig fortsat adgang til dine penge på alle platforme
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            {emergencyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="text-center p-6 rounded-xl bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-red-100"
              >
                <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Mere end bare beredskab
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Bank Norwegian kreditkort giver dig ikke kun sikkerhed i nødsituationer, 
                men også daglige fordele der gør dit liv lettere.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3"
                    variants={fadeIn}
                    transition={{ delay: index * 0.1 }}
                  >
                    <SafeIcon icon={FiCheck} className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <a 
                  href="https://swiy.co/Bank-Norwegian-anbefalinger"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center transition-all duration-200 shadow-lg hover:shadow-xl inline-flex"
                >
                  Se alle fordele
                  <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn}
              className="relative"
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="https://www.norwegian.com/globalassets/ip/media/02_media/reward/200x100-logos/bank-norwegian-card-graphics-200x100.svg"
                  alt="Bank Norwegian Kreditkort"
                  className="w-full max-w-sm mx-auto"
                  loading="lazy"
                />
              </div>

              {/* Mobile payment icons */}
              <div className="absolute -top-4 -right-4 flex space-x-2">
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <SafeIcon icon={FiSmartphone} className="h-6 w-6 text-gray-700" />
                </div>
                <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <SafeIcon icon={FiWatch} className="h-6 w-6 text-gray-700" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Calculation Example */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.div variants={fadeIn} className="mb-8">
              <SafeIcon icon={FiCalculator} className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Regneeksempel
              </h2>
            </motion.div>
            
            <motion.div 
              variants={fadeIn}
              className="bg-white p-8 rounded-xl max-w-4xl mx-auto border border-gray-200 shadow-sm"
            >
              <div className="text-sm text-gray-700 leading-relaxed">
                <strong>Eksempel:</strong> Saml. kreditbeløb på 15.000 kr. Løbetid 1 år. 
                Variabel debitorrente 21,93 %, ÅOP 21,93 %, Saml. kreditomk. 1.673 kr., 
                Månedlig ydelse 1.390 kr. Saml. tilbagebetaling 16.673 kr. 
                Forudsætter, at fakturaen modtages digitalt.
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-red-600 to-red-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-6">
              Følg Nationalbankens betalingsanbefalinger
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl mb-8 opacity-90">
              Ansøg om dit Bank Norwegian kreditkort i dag og vær forberedt på morgendagen
            </motion.p>
            
            <motion.div variants={fadeIn} className="space-y-4 sm:space-y-0 sm:flex sm:justify-center">
              <a 
                href="https://swiy.co/Bank-Norwegian-anbefalinger"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-white text-red-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
              >
                Ansøg nu - helt gratis
                <SafeIcon icon={FiArrowRight} className="ml-2 h-5 w-5" />
              </a>
            </motion.div>

            <motion.div variants={fadeIn} className="mt-8 text-sm opacity-75">
              Svar på ansøgning på 2 minutter • Ingen binding • Gratis at have
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer with Nationalbank Reference and Berlingske Notice */}
      <footer className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center py-8"
          >
            <p className="text-sm text-gray-600 mb-4">
              <a 
                href="https://www.nationalbanken.dk/da/vores-arbejde/sikre-og-effektive-betalinger/robuste-betalinger/beredskabsanbefalinger-til-borgere"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                "Anbefalinger til borgere: Hav flere forskellige betalingsløsninger"
              </a>
              , Danmarks Nationalbank
            </p>
          </motion.div>
        </div>
        
        {/* Berlingske Media Notice - Bottom */}
        <div className="bg-gray-800 text-white py-3 px-4 text-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-center">
            <SafeIcon icon={FiInfo} className="mr-2 h-4 w-4 text-blue-400 flex-shrink-0" />
            <p className="text-center">
              Dette er et kommercielt site udgivet af Berlingske Medias kommercielle afdeling. Berlingske Medias uafhængige redaktioner har intet at gøre med udarbejdelsen af indholdet.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
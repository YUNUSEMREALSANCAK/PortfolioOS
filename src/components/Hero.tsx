import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-900/30 text-orange-300 text-sm font-medium mb-8">
            <span>🚀 New: Session recordings now available</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            How developers build
            <br />
            <span className="text-orange-400">successful products</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            PostHog is the only analytics platform that you can host yourself. 
            Get full control over your data while you build your product.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition-all hover:scale-105">
              Get started free
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center transition-all hover:scale-105">
              <Play className="mr-2 h-5 w-5" />
              Watch demo
            </button>
          </div>

          {/* Trust indicators */}
          <p className="text-sm text-gray-400 mb-8">
            Trusted by 50,000+ developers at companies like
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold text-gray-500">Airbnb</div>
            <div className="text-2xl font-bold text-gray-500">Hasura</div>
            <div className="text-2xl font-bold text-gray-500">Phantom</div>
            <div className="text-2xl font-bold text-gray-500">Staples</div>
            <div className="text-2xl font-bold text-gray-500">Y Combinator</div>
          </div>
        </div>

        {/* Hero image/dashboard mockup */}
        <div className="mt-16 relative">
          <div className="bg-gray-800 rounded-lg shadow-2xl border border-gray-700 overflow-hidden">
            <div className="bg-gray-700 px-4 py-3 border-b border-gray-600 flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              <div className="ml-4 text-sm text-gray-300">dashboard.posthog.com</div>
            </div>
            <div className="h-64 sm:h-96 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-gray-400 text-lg">Interactive Dashboard Preview</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
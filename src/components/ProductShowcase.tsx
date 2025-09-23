import React, { useState } from 'react';
import { BarChart3, Flag, Video, TestTube } from 'lucide-react';

const ProductShowcase = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      id: 0,
      name: 'Analytics',
      icon: <BarChart3 className="h-5 w-5" />,
      title: 'Powerful product analytics',
      description: 'Track every interaction, understand user journeys, and identify growth opportunities with comprehensive analytics that actually help you make decisions.',
    },
    {
      id: 1,
      name: 'Feature Flags',
      icon: <Flag className="h-5 w-5" />,
      title: 'Safe feature rollouts',
      description: 'Release features with confidence using progressive rollouts, user targeting, and instant kill switches for when things go wrong.',
    },
    {
      id: 2,
      name: 'Session Recording',
      icon: <Video className="h-5 w-5" />,
      title: 'See what users actually do',
      description: 'Watch real user sessions to understand friction points, debug issues faster, and optimize your user experience.',
    },
    {
      id: 3,
      name: 'Experiments',
      icon: <TestTube className="h-5 w-5" />,
      title: 'Data-driven decisions',
      description: 'Run sophisticated A/B tests and multivariate experiments to optimize your product and increase conversions.',
    },
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            One platform, endless insights
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stop juggling multiple tools. PostHog brings together analytics, 
            feature flags, session recording, and experimentation in one platform.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-4 text-sm font-medium whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {tabs[activeTab].title}
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  {tabs[activeTab].description}
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Real-time data processing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Custom event tracking</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">Advanced segmentation</span>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-gradient-to-br from-orange-100 to-blue-100 rounded-lg h-80 flex items-center justify-center">
                  <div className="text-gray-500 text-lg">
                    {tabs[activeTab].name} Interface Preview
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
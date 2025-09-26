import React from 'react';
import { BarChart3, Target, Users, Zap, Shield, Code } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: 'Product Analytics',
      description: 'Understand how users interact with your product. Track events, analyze funnels, and measure retention with our powerful analytics suite.',
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: 'Feature Flags',
      description: 'Deploy features safely with advanced targeting. Roll out to specific users or segments and monitor performance in real-time.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Session Recording',
      description: 'Watch exactly how users navigate your app. Debug issues faster and understand user behavior with session replays.',
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: 'A/B Testing',
      description: 'Run experiments to optimize your product. Test variants, measure impact, and make data-driven decisions with confidence.',
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Privacy First',
      description: 'Self-host or use our cloud. Full control over your data with GDPR compliance and transparent data practices.',
    },
    {
      icon: <Code className="h-8 w-8" />,
      title: 'Developer Friendly',
      description: 'Built by developers, for developers. Clean APIs, comprehensive SDKs, and seamless integration with your existing stack.',
    },
  ];

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything you need to build better products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From analytics to experimentation, PostHog provides all the tools you need 
            to understand your users and grow your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-xl bg-gray-800 hover:bg-gray-700 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-gray-600"
            >
              <div className="text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all hover:scale-105">
            Explore all features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
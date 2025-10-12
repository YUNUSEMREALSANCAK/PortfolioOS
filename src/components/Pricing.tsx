import React from 'react';
import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for side projects and getting started',
      features: [
        '1 million events/month',
        'Unlimited team members',
        'Community support',
        '1 year data retention',
        'Basic analytics',
      ],
      cta: 'Get started free',
      popular: false,
    },
    {
      name: 'Paid',
      price: '$0.00031',
      period: 'per event',
      description: 'Scale with transparent, usage-based pricing',
      features: [
        'Pay only for what you use',
        'Advanced analytics',
        'Feature flags included',
        'Session recording',
        'Priority support',
        'Custom data retention',
      ],
      cta: 'Start free trial',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations with specific needs',
      features: [
        'Volume discounts',
        'Dedicated support',
        'Custom integrations',
        'Advanced security',
        'SLA guarantees',
        'Training & onboarding',
      ],
      cta: 'Contact sales',
      popular: false,
    },
  ];

  return (
    <section className="py-24 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Start free, then pay only for what you use. No hidden fees, 
            no surprise bills, just honest pricing that scales with you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gray-900 rounded-2xl shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular
                  ? 'border-orange-500 scale-105'
                  : 'border-gray-700 hover:border-gray-600'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Most popular
                  </div>
                </div>
              )}

              <div className="p-8">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline mb-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-300 ml-1">
                    /{plan.period}
                  </span>
                </div>
                <p className="text-gray-300 mb-6">
                  {plan.description}
                </p>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all ${
                    plan.popular
                      ? 'bg-orange-500 hover:bg-orange-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {plan.cta}
                </button>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-gray-300 mb-4">
            All plans include our core analytics platform with no limits on team members.
          </p>
          <button className="text-orange-400 hover:text-orange-300 font-medium">
            Compare all features →
          </button>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
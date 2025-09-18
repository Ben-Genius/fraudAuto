import { Check, Star } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Basic Check',
      price: 'Free',
      description: 'Basic vehicle information',
      features: [
        'VIN decoding',
        'Basic vehicle specs',
        'Make, model, year',
        'Engine information',
        'Limited daily searches'
      ],
      buttonText: 'Get Started',
      buttonClass: 'btn-secondary'
    },
    {
      name: 'Single Report',
      price: 'GHS 50',
      description: 'Complete vehicle history report',
      features: [
        'Everything in Basic',
        'Theft status check',
        'DVLA registration data',
        'Ownership history',
        'Accident records',
        'Market value estimate',
        'Odometer verification',
        'Title brand check'
      ],
      buttonText: 'Buy Report',
      buttonClass: 'btn-primary',
      popular: true
    },
    {
      name: 'Premium Monthly',
      price: 'GHS 200/month',
      description: 'Unlimited reports for dealers',
      features: [
        'Everything in Single Report',
        'Unlimited reports',
        'Priority support',
        'Bulk VIN processing',
        'API access',
        'Custom branding',
        'Advanced analytics',
        'Export capabilities'
      ],
      buttonText: 'Start Trial',
      buttonClass: 'btn-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600">
            Choose the plan that fits your needs. All prices in Ghana Cedis (GHS)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md p-8 relative ${
                plan.popular ? 'ring-2 ring-blue-500 transform scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full ${plan.buttonClass} text-center py-3`}>
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 mb-4">
                We accept Mobile Money (MTN MoMo, Vodafone Cash, AirtelTigo Money), 
                bank transfers, and major credit/debit cards.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">
                How accurate is your data?
              </h3>
              <p className="text-gray-600 mb-4">
                Our data comes directly from official sources including DVLA and 
                Ghana Police Service. We update our databases regularly to ensure accuracy.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">
                Can I get a refund?
              </h3>
              <p className="text-gray-600">
                We offer a 100% money-back guarantee if we cannot provide the 
                requested vehicle information within 24 hours.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Do you cover all vehicles in Ghana?
              </h3>
              <p className="text-gray-600 mb-4">
                We cover all vehicles registered with DVLA. For imported vehicles, 
                we provide international data plus local registration information.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">
                Is my search history private?
              </h3>
              <p className="text-gray-600 mb-4">
                Yes, we take privacy seriously. Your search history is encrypted 
                and never shared with third parties.
              </p>

              <h3 className="font-semibold text-gray-900 mb-2">
                Do you offer bulk discounts?
              </h3>
              <p className="text-gray-600">
                Yes, we offer special pricing for car dealers, insurance companies, 
                and other businesses. Contact us for custom pricing.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Need a Custom Solution?
          </h2>
          <p className="text-gray-600 mb-6">
            Contact our team for enterprise pricing and custom integrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:sales@fraudauto.com"
              className="btn-primary"
            >
              Contact Sales
            </a>
            <a
              href="tel:+233123456789"
              className="btn-secondary"
            >
              Call +233 123 456 789
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

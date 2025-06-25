
import { Shield, CheckCircle, Users, Award, Phone, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollReveal, FadeInUp } from './ScrollAnimations';

const InsuranceSection = () => {
  const insurancePartners = [
    {
      id: 1,
      name: "HealthFirst Insurance",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      coverage: "Comprehensive Health Coverage",
      network: "50,000+ Hospitals",
      plans: ["Individual", "Family", "Corporate"],
      features: ["Cashless Treatment", "24/7 Support", "Worldwide Coverage"],
      rating: 4.8
    },
    {
      id: 2,
      name: "MediCare Plus",
      logo: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      coverage: "Premium Health Solutions",
      network: "40,000+ Healthcare Providers",
      plans: ["Basic", "Premium", "Elite"],
      features: ["Digital Health Cards", "Telemedicine", "Preventive Care"],
      rating: 4.7
    },
    {
      id: 3,
      name: "SecureHealth",
      logo: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      coverage: "Complete Family Protection",
      network: "35,000+ Medical Centers",
      plans: ["Essential", "Advanced", "Supreme"],
      features: ["Instant Claim Settlement", "Health Checkups", "Emergency Assistance"],
      rating: 4.6
    },
    {
      id: 4,
      name: "WellnessGuard",
      logo: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
      coverage: "Holistic Health Insurance",
      network: "45,000+ Healthcare Partners",
      plans: ["Starter", "Professional", "Platinum"],
      features: ["Mental Health Coverage", "Alternative Medicine", "Wellness Programs"],
      rating: 4.9
    }
  ];

  return (
    <section id="insurance" className="py-20 bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Insurance Partners
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We've partnered with leading insurance providers to ensure you get the best 
              healthcare coverage with seamless claim processing and comprehensive benefits.
            </p>
          </div>
        </ScrollReveal>

        {/* Insurance Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {insurancePartners.map((partner, index) => (
            <FadeInUp key={partner.id} delay={index * 0.1}>
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 bg-gray-100">
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">{partner.name}</h3>
                      <p className="text-cyan-600 font-semibold">{partner.coverage}</p>
                    </div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center text-gray-600">
                      <Users className="h-5 w-5 mr-3 text-blue-500" />
                      <span>{partner.network}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Award className="h-5 w-5 mr-3 text-green-500" />
                      <span>Rating: {partner.rating}/5.0</span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Available Plans:</h4>
                    <div className="flex flex-wrap gap-2">
                      {partner.plans.map((plan) => (
                        <span
                          key={plan}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {plan}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-800 mb-3">Key Features:</h4>
                    <div className="space-y-2">
                      {partner.features.map((feature) => (
                        <div key={feature} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <span className="text-gray-600 text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white">
                      View Plans
                    </Button>
                    <Button variant="outline" className="flex-1 border-blue-300 text-blue-600 hover:bg-blue-50">
                      Get Quote
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeInUp>
          ))}
        </div>

        {/* Insurance Benefits */}
        <ScrollReveal>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Why Choose Our Insurance Partners?
              </h3>
              <p className="text-gray-600">
                Experience hassle-free healthcare with our trusted insurance network
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Comprehensive Coverage</h4>
                <p className="text-gray-600 text-sm">
                  Complete protection for you and your family with extensive medical coverage
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">Cashless Treatment</h4>
                <p className="text-gray-600 text-sm">
                  Direct billing with hospitals for seamless treatment without upfront payments
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">24/7 Support</h4>
                <p className="text-gray-600 text-sm">
                  Round-the-clock customer support for claims and emergency assistance
                </p>
              </div>
            </div>

            <div className="text-center mt-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-8 py-4"
              >
                <Mail className="h-5 w-5 mr-2" />
                Contact Insurance Team
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default InsuranceSection;


import { Shield, Users, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const AboutSection = () => {
  const features = [
    {
      icon: Shield,
      title: '60+ Years of Excellence',
      description: 'Decades of trusted care, prioritizing your health and well-being'
    },
    {
      icon: Users,
      title: '1000+ Expert Medical Care',
      description: 'A team of professionals committed to your health and well-being'
    },
    {
      icon: Award,
      title: 'Advanced Medical Technology',
      description: 'Medical technology for accurate diagnosis and effective treatment'
    },
    {
      icon: Clock,
      title: '98% Happy Patients',
      description: 'We take pride in creating a positive experience for every patient'
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-cyan-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Why Choose Global Hospital?
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At Global Hospital, we blend expert medical care with compassion, offering personalized treatment 
                to ensure every patient feels supported and valued throughout their healing journey.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <CardContent className="p-6">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-3 w-12 h-12 mb-4">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <img
                src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Modern hospital building"
                className="w-full h-80 object-cover rounded-2xl shadow-2xl"
              />
            </div>
            {/* Floating Stats */}
            <div className="absolute -top-8 -right-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600">24/7</div>
                <div className="text-sm text-gray-600">Emergency Care</div>
              </div>
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-600">Specialists</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

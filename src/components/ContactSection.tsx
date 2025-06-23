
import { Phone, Mail, MapPin, Clock, Calendar, Stethoscope } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const quickActions = [
    {
      icon: Phone,
      title: 'Emergency Call',
      description: '24/7 Emergency Services',
      action: '+91 98765 43210',
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    },
    {
      icon: Stethoscope,
      title: 'Find Doctor',
      description: 'Search our specialist doctors',
      action: 'Search Now',
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      icon: Calendar,
      title: 'Make an Appointment',
      description: 'Book your consultation',
      action: 'Book Now',
      bgColor: 'bg-green-500',
      hoverColor: 'hover:bg-green-600'
    }
  ];

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: [
        'Emergency: +91 98765 43210',
        'Reception: +91 98765 43211',
        'Appointments: +91 98765 43212'
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      details: [
        'info@globalhospital.com',
        'appointments@globalhospital.com',
        'emergency@globalhospital.com'
      ]
    },
    {
      icon: MapPin,
      title: 'Address',
      details: [
        '123 Healthcare Avenue',
        'Medical District, Chennai',
        'Tamil Nadu 600001, India'
      ]
    },
    {
      icon: Clock,
      title: 'Working Hours',
      details: [
        'Emergency: 24/7',
        'OPD: 8:00 AM - 8:00 PM',
        'Pharmacy: 24/7'
      ]
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Your Health, Its Our Priority</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get in touch with us for immediate medical assistance or to schedule your appointment
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {quickActions.map((action, index) => (
            <Card 
              key={index} 
              className={`${action.bgColor} ${action.hoverColor} border-0 transition-all duration-300 transform hover:scale-105 cursor-pointer`}
            >
              <CardContent className="p-8 text-center text-white">
                <div className="bg-white/20 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <action.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                <p className="text-white/80 mb-4">{action.description}</p>
                <Button variant="secondary" className="bg-white text-gray-800 hover:bg-gray-100">
                  {action.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Information and Map */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-lg border-white/20">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-cyan-500 rounded-full p-3 flex-shrink-0">
                        <info.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 text-white">{info.title}</h4>
                        <div className="space-y-1">
                          {info.details.map((detail, idx) => (
                            <p key={idx} className="text-gray-300 text-sm">{detail}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-cyan-400">Find Us</h3>
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gray-200 h-80 flex items-center justify-center">
                  <div className="text-center text-gray-600">
                    <MapPin className="h-12 w-12 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Interactive Map</p>
                    <p className="text-sm">Google Maps will be embedded here</p>
                    <p className="text-xs mt-2">123 Healthcare Avenue, Chennai</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Insurance Partners */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold mb-8 text-cyan-400">Trusted by Leading Healthcare Partners</h3>
          <p className="text-gray-300 mb-8">Collaborating with trusted partners to deliver the best in healthcare services</p>
          
          {/* Partner Logos Placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center opacity-60">
            {['Cigna', 'Manulife', 'Prudential', 'Grapiku', 'BCA Life'].map((partner, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20">
                <div className="text-white font-semibold">{partner}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

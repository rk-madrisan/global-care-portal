
import { Heart, Brain, Bone, Baby, Eye, Pill, Stethoscope, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const SpecialtiesSection = () => {
  const specialties = [
    {
      icon: Heart,
      title: 'Cardiac Care',
      description: 'Heart health treatment',
      color: 'bg-red-100 text-red-600',
      hoverColor: 'hover:bg-red-500 hover:text-white'
    },
    {
      icon: Brain,
      title: 'Neuroscience',
      description: 'Brain and nerve care',
      color: 'bg-purple-100 text-purple-600',
      hoverColor: 'hover:bg-purple-500 hover:text-white'
    },
    {
      icon: Bone,
      title: 'Orthopedics',
      description: 'Bone and joint care',
      color: 'bg-blue-100 text-blue-600',
      hoverColor: 'hover:bg-blue-500 hover:text-white'
    },
    {
      icon: Baby,
      title: 'Pediatric Care',
      description: 'Child health services',
      color: 'bg-green-100 text-green-600',
      hoverColor: 'hover:bg-green-500 hover:text-white'
    },
    {
      icon: Eye,
      title: 'Dentistry',
      description: 'Dental Care Solutions',
      color: 'bg-cyan-100 text-cyan-600',
      hoverColor: 'hover:bg-cyan-500 hover:text-white'
    },
    {
      icon: Pill,
      title: 'Gastrosciences',
      description: 'Digestive health care',
      color: 'bg-orange-100 text-orange-600',
      hoverColor: 'hover:bg-orange-500 hover:text-white'
    },
    {
      icon: Stethoscope,
      title: 'Liver Care',
      description: 'Liver Health and Transplant Care',
      color: 'bg-teal-100 text-teal-600',
      hoverColor: 'hover:bg-teal-500 hover:text-white'
    },
    {
      icon: Activity,
      title: 'Gynaecology',
      description: 'Gynaecological Care Solutions',
      color: 'bg-pink-100 text-pink-600',
      hoverColor: 'hover:bg-pink-500 hover:text-white'
    }
  ];

  return (
    <section id="specializations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            An Ecosystem for Clinical Excellence
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover world-class healthcare at Global's specialized centres of medical innovation. Our 
            advanced facilities offer unmatched expertise in key specialties and super specialties, setting 
            new global standards in clinical excellence and patient care.
          </p>
        </div>

        {/* Specialties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {specialties.map((specialty, index) => (
            <Card
              key={index}
              className={`group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 ${specialty.hoverColor}`}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${specialty.color} group-hover:bg-white/20 transition-colors duration-300`}>
                  <specialty.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">
                  {specialty.title}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                  {specialty.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
            View All Specialties →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;


import { Heart, Brain, Bone, Baby, Eye, Pill, Stethoscope, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Heart, Brain, Bone, Baby, Eye, Pill, Stethoscope, Activity
};

const SpecialtiesSection = () => {
  const navigate = useNavigate();

  const { data: specialties } = useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('specialties')
        .select('*')
        .limit(8)
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const colorClasses = {
    red: 'bg-red-100 text-red-600 hover:bg-red-500 hover:text-white',
    purple: 'bg-purple-100 text-purple-600 hover:bg-purple-500 hover:text-white',
    blue: 'bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white',
    green: 'bg-green-100 text-green-600 hover:bg-green-500 hover:text-white',
    cyan: 'bg-cyan-100 text-cyan-600 hover:bg-cyan-500 hover:text-white',
    orange: 'bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white',
    teal: 'bg-teal-100 text-teal-600 hover:bg-teal-500 hover:text-white',
    pink: 'bg-pink-100 text-pink-600 hover:bg-pink-500 hover:text-white',
    yellow: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white',
    indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-500 hover:text-white',
    emerald: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white',
    violet: 'bg-violet-100 text-violet-600 hover:bg-violet-500 hover:text-white',
  };

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
          {specialties?.map((specialty, index) => {
            const IconComponent = iconMap[specialty.icon as keyof typeof iconMap] || Heart;
            const colorClass = colorClasses[specialty.color as keyof typeof colorClasses] || colorClasses.blue;

            return (
              <Card
                key={specialty.id}
                className={`group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 ${colorClass} animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/specialty/${specialty.id}`, { 
                  state: { specialtyName: specialty.name } 
                })}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-${specialty.color}-100 text-${specialty.color}-600 group-hover:bg-white/20 transition-colors duration-300`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">
                    {specialty.name}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                    {specialty.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/specialties')}
            className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            View All Specialties →
          </button>
        </div>
      </div>
    </section>
  );
};

export default SpecialtiesSection;


import { Calendar, Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const DoctorsSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: doctors } = useQuery({
    queryKey: ['doctors-featured'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email
          ),
          specialties:specialty_id (
            name
          )
        `)
        .limit(4)
        .order('rating', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const handleBookAppointment = (doctorId: string, doctorName: string, specialtyName: string) => {
    if (!user) {
      toast.error('Please login to book an appointment');
      navigate('/auth');
      return;
    }
    navigate('/book-appointment', { 
      state: { 
        doctorId, 
        doctorName,
        specialtyName 
      } 
    });
  };

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Meet Our Expert Doctors
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our team of experienced medical professionals is dedicated to providing 
            exceptional healthcare with compassion and expertise.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors?.map((doctor, index) => (
            <Card 
              key={doctor.id} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={doctor.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}
                  alt={doctor.profiles?.full_name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{doctor.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {doctor.profiles?.full_name}
                  </h3>
                  <p className="text-cyan-600 font-semibold mb-1">
                    {doctor.specialties?.name}
                  </p>
                  <p className="text-gray-600 text-sm">{doctor.qualifications}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{doctor.experience_years}+ Years Experience</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{doctor.availability || 'Available'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button 
                    className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-200"
                    onClick={() => handleBookAppointment(
                      doctor.id, 
                      doctor.profiles?.full_name || 'Doctor',
                      doctor.specialties?.name || 'Specialty'
                    )}
                  >
                    Book Appointment
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-200"
                  >
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white px-8 py-4 transform hover:scale-105 transition-all duration-200"
            onClick={() => navigate('/specialties')}
          >
            View All Doctors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;

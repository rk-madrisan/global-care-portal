
import { Calendar, Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { ScrollReveal, FadeInUp } from './ScrollAnimations';

const DoctorsSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: doctors, isLoading, error } = useQuery({
    queryKey: ['doctors-featured'],
    queryFn: async () => {
      console.log('Fetching doctors...');
      
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
      
      if (error) {
        console.error('Error fetching doctors:', error);
        throw error;
      }
      
      console.log('Doctors fetched successfully:', data);
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

  // Show loading state
  if (isLoading) {
    return (
      <section id="doctors" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading doctors...</p>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    console.error('DoctorsSection error:', error);
    return (
      <section id="doctors" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-red-600">Error loading doctors. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (!doctors || doctors.length === 0) {
    return (
      <section id="doctors" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Meet Our Expert Doctors
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                Our team of experienced medical professionals is dedicated to providing 
                exceptional healthcare with compassion and expertise.
              </p>
              <p className="text-gray-500">No doctors available at the moment.</p>
            </div>
          </ScrollReveal>
        </div>
      </section>
    );
  }

  return (
    <section id="doctors" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Expert Doctors
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our team of experienced medical professionals is dedicated to providing 
              exceptional healthcare with compassion and expertise.
            </p>
          </div>
        </ScrollReveal>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {doctors.map((doctor, index) => (
            <FadeInUp key={doctor.id} delay={index * 0.1}>
              <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="relative overflow-hidden">
                  <img
                    src={doctor.image_url || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}
                    alt={doctor.profiles?.full_name || 'Doctor'}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold">{doctor.rating || '4.5'}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {doctor.profiles?.full_name || 'Dr. Name'}
                    </h3>
                    <p className="text-cyan-600 font-semibold mb-1">
                      {doctor.specialties?.name || 'General Medicine'}
                    </p>
                    <p className="text-gray-600 text-sm">{doctor.qualifications || 'MBBS, MD'}</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{doctor.experience_years || 5}+ Years Experience</span>
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
            </FadeInUp>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal>
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
        </ScrollReveal>
      </div>
    </section>
  );
};

export default DoctorsSection;

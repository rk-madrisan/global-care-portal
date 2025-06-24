
import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Star, MapPin, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const SpecialtyDoctors = () => {
  const { specialtyId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const specialtyName = location.state?.specialtyName || 'Specialty';

  const { data: doctors, isLoading } = useQuery({
    queryKey: ['doctors', specialtyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('doctors')
        .select(`
          *,
          profiles:user_id (
            full_name,
            email,
            phone
          ),
          specialties:specialty_id (
            name
          )
        `)
        .eq('specialty_id', specialtyId);
      
      if (error) throw error;
      return data;
    },
  });

  const handleBookAppointment = (doctorId: string, doctorName: string) => {
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-hero text-white py-16">
        <div className="container mx-auto px-4">
          <Button
            onClick={() => navigate('/specialties')}
            variant="ghost"
            className="text-white hover:bg-white/20 mb-6 animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Specialties
          </Button>
          
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              {specialtyName} Doctors
            </h1>
            <p className="text-xl text-gray-300">
              Choose from our expert {specialtyName.toLowerCase()} specialists
            </p>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="container mx-auto px-4 py-16">
        {doctors && doctors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor, index) => (
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
                    <p className="text-cyan-600 font-semibold mb-1">{specialtyName}</p>
                    <p className="text-gray-600 text-sm">{doctor.qualifications}</p>
                  </div>

                  {doctor.bio && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{doctor.bio}</p>
                  )}

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{doctor.experience_years}+ Years Experience</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{doctor.availability || 'Available for consultation'}</span>
                    </div>
                    {doctor.consultation_fee && (
                      <div className="flex items-center text-gray-600 text-sm">
                        <span className="text-green-600 font-semibold">₹{doctor.consultation_fee}</span>
                        <span className="ml-1">consultation fee</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Button 
                      className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white transform hover:scale-105 transition-all duration-200"
                      onClick={() => handleBookAppointment(doctor.id, doctor.profiles?.full_name || 'Doctor')}
                    >
                      <Calendar className="h-4 w-4 mr-2" />
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
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No doctors found for {specialtyName}
            </h3>
            <p className="text-gray-500 mb-8">
              We're working on adding more specialists to this department.
            </p>
            <Button onClick={() => navigate('/specialties')}>
              Browse Other Specialties
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialtyDoctors;

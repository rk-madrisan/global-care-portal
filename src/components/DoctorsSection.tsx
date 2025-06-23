
import { Calendar, Star, MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const DoctorsSection = () => {
  const doctors = [
    {
      name: 'Dr. Rajesh Kumar',
      specialty: 'Cardiologist',
      experience: '15+ Years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availability: 'Mon-Fri: 9AM-5PM',
      qualifications: 'MBBS, MD Cardiology'
    },
    {
      name: 'Dr. Priya Sharma',
      specialty: 'Neurologist',
      experience: '12+ Years',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availability: 'Mon-Sat: 10AM-6PM',
      qualifications: 'MBBS, MD Neurology'
    },
    {
      name: 'Dr. Amit Patel',
      specialty: 'Orthopedic Surgeon',
      experience: '18+ Years',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availability: 'Tue-Sun: 8AM-4PM',
      qualifications: 'MBBS, MS Orthopedics'
    },
    {
      name: 'Dr. Sunita Reddy',
      specialty: 'Pediatrician',
      experience: '10+ Years',
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1594824388936-666e9c4b1db8?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80',
      availability: 'Mon-Fri: 9AM-6PM',
      qualifications: 'MBBS, MD Pediatrics'
    }
  ];

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
          {doctors.map((doctor, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-semibold">{doctor.rating}</span>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{doctor.name}</h3>
                  <p className="text-cyan-600 font-semibold mb-1">{doctor.specialty}</p>
                  <p className="text-gray-600 text-sm">{doctor.qualifications}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{doctor.experience} Experience</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{doctor.availability}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white">
                    Book Appointment
                  </Button>
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                    View Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-500 hover:text-white px-8 py-4">
            View All Doctors
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DoctorsSection;

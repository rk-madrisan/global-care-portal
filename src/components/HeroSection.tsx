
import { Calendar, Users, Award, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const stats = [
    { icon: Users, value: '1000+', label: 'Expert Medical Care' },
    { icon: Award, value: '60+', label: 'Years of Excellence' },
    { icon: Calendar, value: '98%', label: 'Happy Patients' },
    { icon: Clock, value: '40+', label: 'Years Trusted Pharmacy' }
  ];

  const handleBookAppointment = () => {
    if (user) {
      navigate('/specialties');
    } else {
      navigate('/auth');
    }
  };

  return (
    <section id="home" className="relative min-h-screen bg-gradient-hero text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Where Healing
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                  Feels Like Home
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-lg">
                Start your journey to better health. Find the right doctor and specialty below.
              </p>
            </div>

            {/* Search Box */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <select className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400">
                    <option value="">Select Specialty</option>
                    <option value="cardiology">Cardiology</option>
                    <option value="neurology">Neurology</option>
                    <option value="orthopedics">Orthopedics</option>
                  </select>
                </div>
                <Button 
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors transform hover:scale-105 duration-200"
                  onClick={() => navigate('/specialties')}
                >
                  Search
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-semibold transform hover:scale-105 transition-all duration-200"
              >
                Emergency Call
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-3xl p-8 backdrop-blur-sm border border-white/20">
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Doctor with patient"
                  className="w-full h-96 object-cover"
                />
              </div>
              {/* Floating Icons */}
              <div className="absolute -top-4 -right-4 bg-white/20 backdrop-blur-lg rounded-full p-4 animate-float">
                <div className="bg-cyan-500 rounded-full p-3">
                  <Users className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/20 backdrop-blur-lg rounded-full p-4 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-blue-500 rounded-full p-3">
                  <Award className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 animate-fade-in transform hover:scale-105"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

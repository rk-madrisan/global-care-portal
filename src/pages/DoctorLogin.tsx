
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart, Stethoscope, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

const DoctorLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Dummy doctor credentials
  const doctorCredentials = [
    { username: 'dr_smith', password: 'doctor123', name: 'Dr. Smith', specialty: 'Cardiology' },
    { username: 'dr_johnson', password: 'doctor123', name: 'Dr. Johnson', specialty: 'Neurology' },
    { username: 'dr_williams', password: 'doctor123', name: 'Dr. Williams', specialty: 'Orthopedics' },
    { username: 'dr_brown', password: 'doctor123', name: 'Dr. Brown', specialty: 'Pediatrics' }
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Check credentials
    const doctor = doctorCredentials.find(
      doc => doc.username === credentials.username && doc.password === credentials.password
    );

    if (doctor) {
      // Store doctor info in localStorage for demo purposes
      localStorage.setItem('doctorSession', JSON.stringify(doctor));
      toast.success(`Welcome, ${doctor.name}!`);
      navigate('/doctor-dashboard');
    } else {
      toast.error('Invalid credentials. Try: dr_smith / doctor123');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Button
          onClick={() => navigate('/')}
          variant="ghost"
          className="text-white hover:bg-white/20 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="bg-gradient-medical p-3 rounded-xl">
              <Stethoscope className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Doctor Portal</h1>
              <p className="text-cyan-300">Global Hospital</p>
            </div>
          </div>
        </div>

        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 animate-scale-in">
          <CardHeader>
            <CardTitle className="text-white text-center">Doctor Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Username (try: dr_smith)"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder-white/70"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  placeholder="Password (try: doctor123)"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="bg-white/20 border-white/30 text-white placeholder-white/70"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
                disabled={loading}
              >
                <Stethoscope className="h-4 w-4 mr-2" />
                {loading ? 'Signing In...' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-4 p-3 bg-white/10 rounded-lg">
              <p className="text-white/80 text-sm text-center">
                Demo Credentials:<br />
                Username: dr_smith | Password: doctor123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorLogin;

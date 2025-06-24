
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, Clock, ArrowLeft, User, Phone, Mail } from 'lucide-react';
import { toast } from 'sonner';

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  const { doctorId, doctorName, specialtyName } = location.state || {};

  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    notes: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profile) {
      toast.error('Please login to book an appointment');
      return;
    }

    setLoading(true);
    
    try {
      const { error } = await supabase
        .from('appointments')
        .insert({
          patient_id: profile.id,
          doctor_id: doctorId,
          appointment_date: appointmentData.date,
          appointment_time: appointmentData.time,
          notes: appointmentData.notes,
          status: 'pending'
        });

      if (error) throw error;

      toast.success('Appointment booked successfully!');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
          <CardContent className="p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">Please Login</h2>
            <p className="mb-6">You need to be logged in to book an appointment.</p>
            <Button onClick={() => navigate('/auth')}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="text-white hover:bg-white/20 mb-6 animate-fade-in"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 animate-scale-in">
            <CardHeader>
              <CardTitle className="text-white text-center">
                <Calendar className="h-6 w-6 mx-auto mb-2" />
                Book Appointment
              </CardTitle>
              <div className="text-center text-white/80">
                <p className="text-lg font-semibold">{doctorName}</p>
                <p className="text-cyan-300">{specialtyName}</p>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Patient Info */}
              <div className="bg-white/10 rounded-lg p-4 space-y-3">
                <h3 className="text-white font-semibold flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  Patient Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{profile?.full_name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    <span>{profile?.email}</span>
                  </div>
                </div>
              </div>

              {/* Appointment Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Appointment Date
                    </label>
                    <Input
                      type="date"
                      value={appointmentData.date}
                      onChange={(e) => setAppointmentData(prev => ({ ...prev, date: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>
                  <div>
                    <label className="text-white text-sm font-medium mb-2 block">
                      Appointment Time
                    </label>
                    <Input
                      type="time"
                      value={appointmentData.time}
                      onChange={(e) => setAppointmentData(prev =>({ ...prev, time: e.target.value }))}
                      className="bg-white/20 border-white/30 text-white"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Additional Notes (Optional)
                  </label>
                  <Textarea
                    value={appointmentData.notes}
                    onChange={(e) => setAppointmentData(prev => ({ ...prev, notes: e.target.value }))}
                    placeholder="Any specific symptoms or concerns..."
                    className="bg-white/20 border-white/30 text-white placeholder-white/70"
                    rows={4}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-3 transform hover:scale-105 transition-all duration-200"
                  disabled={loading}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  {loading ? 'Booking Appointment...' : 'Confirm Appointment'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;

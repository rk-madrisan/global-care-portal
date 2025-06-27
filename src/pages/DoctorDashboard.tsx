
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, User, FileText, LogOut, Plus, Upload, Download } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  contact: string;
  address: string;
  treatment: string;
}

const DoctorDashboard = () => {
  const navigate = useNavigate();
  const [doctorInfo, setDoctorInfo] = useState<any>(null);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [newPatient, setNewPatient] = useState({
    name: '', age: '', gender: '', bloodGroup: '', contact: '', address: '', treatment: ''
  });

  useEffect(() => {
    const doctorSession = localStorage.getItem('doctorSession');
    if (!doctorSession) {
      navigate('/doctor-login');
      return;
    }
    
    const doctor = JSON.parse(doctorSession);
    setDoctorInfo(doctor);
    fetchAppointments();
    loadPatients();
  }, [navigate]);

  const fetchAppointments = async () => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          profiles:patient_id (
            full_name,
            email
          )
        `)
        .order('appointment_date', { ascending: true });
      
      if (error) throw error;
      setAppointments(data || []);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const loadPatients = () => {
    const saved = localStorage.getItem('patients');
    if (saved) {
      setPatients(JSON.parse(saved));
    }
  };

  const savePatients = (updatedPatients: Patient[]) => {
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setPatients(updatedPatients);
  };

  const handleCreatePatient = () => {
    if (!newPatient.name || !newPatient.age) {
      toast.error('Name and age are required');
      return;
    }

    const patient: Patient = {
      id: Date.now().toString(),
      name: newPatient.name,
      age: parseInt(newPatient.age),
      gender: newPatient.gender,
      bloodGroup: newPatient.bloodGroup,
      contact: newPatient.contact,
      address: newPatient.address,
      treatment: newPatient.treatment
    };

    const updatedPatients = [...patients, patient];
    savePatients(updatedPatients);
    setNewPatient({ name: '', age: '', gender: '', bloodGroup: '', contact: '', address: '', treatment: '' });
    toast.success('Patient profile created successfully');
  };

  const handleUpdatePatient = (updatedPatient: Patient) => {
    const updatedPatients = patients.map(p => p.id === updatedPatient.id ? updatedPatient : p);
    savePatients(updatedPatients);
    setSelectedPatient(updatedPatient);
    toast.success('Patient updated successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('doctorSession');
    navigate('/doctor-login');
  };

  if (!doctorInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome, {doctorInfo.name}</h1>
            <p className="text-gray-600">{doctorInfo.specialty}</p>
          </div>
          <Button onClick={handleLogout} variant="ghost">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="appointments" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="patients">Patient Management</TabsTrigger>
            <TabsTrigger value="create-patient">Create Patient</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Appointment History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appointments.length > 0 ? (
                  <div className="space-y-4">
                    {appointments.map((appointment: any) => (
                      <div key={appointment.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{appointment.profiles?.full_name || 'Patient'}</h3>
                            <p className="text-sm text-gray-600">{appointment.profiles?.email}</p>
                            <p className="text-sm">Date: {appointment.appointment_date}</p>
                            <p className="text-sm">Time: {appointment.appointment_time}</p>
                            {appointment.notes && (
                              <p className="text-sm mt-2"><strong>Notes:</strong> {appointment.notes}</p>
                            )}
                          </div>
                          <span className={`px-2 py-1 rounded text-xs ${
                            appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            appointment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {appointment.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No appointments found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="patients" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Patient List
                </CardTitle>
              </CardHeader>
              <CardContent>
                {patients.length > 0 ? (
                  <div className="grid gap-4">
                    {patients.map((patient) => (
                      <div key={patient.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{patient.name}</h3>
                            <p className="text-sm text-gray-600">Age: {patient.age} | Gender: {patient.gender}</p>
                            <p className="text-sm text-gray-600">Blood Group: {patient.bloodGroup}</p>
                            <p className="text-sm text-gray-600">Contact: {patient.contact}</p>
                            {patient.treatment && (
                              <p className="text-sm mt-2"><strong>Treatment:</strong> {patient.treatment}</p>
                            )}
                          </div>
                          <Button 
                            size="sm" 
                            onClick={() => setSelectedPatient(patient)}
                            className="bg-cyan-500 hover:bg-cyan-600"
                          >
                            Update
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">No patients found</p>
                )}
              </CardContent>
            </Card>

            {selectedPatient && (
              <Card>
                <CardHeader>
                  <CardTitle>Update Patient: {selectedPatient.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Name"
                      value={selectedPatient.name}
                      onChange={(e) => setSelectedPatient({...selectedPatient, name: e.target.value})}
                    />
                    <Input
                      type="number"
                      placeholder="Age"
                      value={selectedPatient.age}
                      onChange={(e) => setSelectedPatient({...selectedPatient, age: parseInt(e.target.value)})}
                    />
                    <Select value={selectedPatient.gender} onValueChange={(value) => setSelectedPatient({...selectedPatient, gender: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Blood Group"
                      value={selectedPatient.bloodGroup}
                      onChange={(e) => setSelectedPatient({...selectedPatient, bloodGroup: e.target.value})}
                    />
                    <Input
                      placeholder="Contact Number"
                      value={selectedPatient.contact}
                      onChange={(e) => setSelectedPatient({...selectedPatient, contact: e.target.value})}
                    />
                    <Input
                      placeholder="Address"
                      value={selectedPatient.address}
                      onChange={(e) => setSelectedPatient({...selectedPatient, address: e.target.value})}
                    />
                  </div>
                  <Textarea
                    placeholder="Ongoing Treatment Details"
                    value={selectedPatient.treatment}
                    onChange={(e) => setSelectedPatient({...selectedPatient, treatment: e.target.value})}
                    className="mt-4"
                    rows={3}
                  />
                  <div className="flex space-x-2 mt-4">
                    <Button onClick={() => handleUpdatePatient(selectedPatient)}>
                      Update Patient
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="create-patient" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Create New Patient Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Patient Name *"
                    value={newPatient.name}
                    onChange={(e) => setNewPatient({...newPatient, name: e.target.value})}
                  />
                  <Input
                    type="number"
                    placeholder="Age *"
                    value={newPatient.age}
                    onChange={(e) => setNewPatient({...newPatient, age: e.target.value})}
                  />
                  <Select value={newPatient.gender} onValueChange={(value) => setNewPatient({...newPatient, gender: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Blood Group"
                    value={newPatient.bloodGroup}
                    onChange={(e) => setNewPatient({...newPatient, bloodGroup: e.target.value})}
                  />
                  <Input
                    placeholder="Family Contact Number"
                    value={newPatient.contact}
                    onChange={(e) => setNewPatient({...newPatient, contact: e.target.value})}
                  />
                  <Input
                    placeholder="Address"
                    value={newPatient.address}
                    onChange={(e) => setNewPatient({...newPatient, address: e.target.value})}
                  />
                </div>
                <Textarea
                  placeholder="Ongoing Treatment Details"
                  value={newPatient.treatment}
                  onChange={(e) => setNewPatient({...newPatient, treatment: e.target.value})}
                  className="mt-4"
                  rows={3}
                />
                <Button onClick={handleCreatePatient} className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Patient Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;

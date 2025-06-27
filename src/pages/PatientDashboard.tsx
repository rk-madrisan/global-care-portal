
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Download, Save, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { generatePatientReportPDF } from '@/utils/patientReportGenerator';

interface PatientProfile {
  id: string;
  patient_id: string;
  name: string;
  age: number;
  gender: string;
  blood_group: string;
  family_contact: string;
  address: string;
  ongoing_treatment: string;
  user_id: string;
}

interface Prescription {
  id: string;
  patient_id: string;
  doctor_name: string;
  prescription_text: string;
  document_url?: string;
  created_at: string;
}

const PatientDashboard = () => {
  const { user, profile } = useAuth();
  const [patientProfile, setPatientProfile] = useState<PatientProfile | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    patient_id: '',
    name: '',
    age: '',
    gender: '',
    blood_group: '',
    family_contact: '',
    address: '',
    ongoing_treatment: ''
  });

  useEffect(() => {
    if (user) {
      fetchPatientData();
    }
  }, [user]);

  const fetchPatientData = async () => {
    try {
      // Use raw SQL query for patient profiles since it might not be in TypeScript types yet
      const { data: profileData, error: profileError } = await supabase
        .from('patient_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (profileData) {
        setPatientProfile(profileData as PatientProfile);
        setFormData({
          patient_id: profileData.patient_id,
          name: profileData.name,
          age: profileData.age.toString(),
          gender: profileData.gender,
          blood_group: profileData.blood_group,
          family_contact: profileData.family_contact,
          address: profileData.address,
          ongoing_treatment: profileData.ongoing_treatment
        });

        // Fetch prescriptions
        const { data: prescriptionsData, error: prescriptionsError } = await supabase
          .from('prescriptions')
          .select('*')
          .eq('patient_id', profileData.id)
          .order('created_at', { ascending: false });

        if (prescriptionsError) throw prescriptionsError;
        setPrescriptions(prescriptionsData as Prescription[] || []);
      }
    } catch (error: any) {
      toast.error('Error fetching patient data: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      const profileData = {
        patient_id: formData.patient_id,
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
        blood_group: formData.blood_group,
        family_contact: formData.family_contact,
        address: formData.address,
        ongoing_treatment: formData.ongoing_treatment,
        user_id: user.id
      };

      if (patientProfile) {
        // Update existing profile
        const { error } = await supabase
          .from('patient_profiles')
          .update(profileData)
          .eq('id', patientProfile.id);

        if (error) throw error;
      } else {
        // Create new profile
        const { data, error } = await supabase
          .from('patient_profiles')
          .insert(profileData)
          .select()
          .single();

        if (error) throw error;
        setPatientProfile(data as PatientProfile);
      }

      toast.success('Profile saved successfully!');
      setEditing(false);
      fetchPatientData();
    } catch (error: any) {
      toast.error('Error saving profile: ' + error.message);
    }
  };

  const downloadTreatmentReport = () => {
    if (!patientProfile) return;

    const reportData = {
      patientName: patientProfile.name,
      patientId: patientProfile.patient_id,
      age: patientProfile.age,
      gender: patientProfile.gender,
      bloodGroup: patientProfile.blood_group,
      address: patientProfile.address,
      ongoingTreatment: patientProfile.ongoing_treatment,
      prescriptions: prescriptions
    };

    generatePatientReportPDF(reportData);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center text-white mb-8">
            <h1 className="text-3xl font-bold mb-2">Patient Dashboard</h1>
            <p className="text-cyan-300">Welcome, {profile?.full_name || 'Patient'}</p>
          </div>

          {/* Patient Profile Card */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-6 w-6 mr-2" />
                  Patient Profile
                </div>
                <div className="space-x-2">
                  {!editing ? (
                    <Button
                      onClick={() => setEditing(true)}
                      variant="outline"
                      className="text-white border-white/30 hover:bg-white/20"
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={handleSaveProfile}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button
                        onClick={() => setEditing(false)}
                        variant="outline"
                        className="text-white border-white/30 hover:bg-white/20"
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Patient ID</label>
                  <Input
                    value={formData.patient_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, patient_id: e.target.value }))}
                    disabled={!editing}
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="Enter Patient ID"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Name</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    disabled={!editing}
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="Enter Full Name"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Age</label>
                  <Input
                    type="number"
                    value={formData.age}
                    onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                    disabled={!editing}
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="Enter Age"
                  />
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Gender</label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                    disabled={!editing}
                  >
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select Gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Blood Group</label>
                  <Select
                    value={formData.blood_group}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, blood_group: value }))}
                    disabled={!editing}
                  >
                    <SelectTrigger className="bg-white/20 border-white/30 text-white">
                      <SelectValue placeholder="Select Blood Group" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A+">A+</SelectItem>
                      <SelectItem value="A-">A-</SelectItem>
                      <SelectItem value="B+">B+</SelectItem>
                      <SelectItem value="B-">B-</SelectItem>
                      <SelectItem value="AB+">AB+</SelectItem>
                      <SelectItem value="AB-">AB-</SelectItem>
                      <SelectItem value="O+">O+</SelectItem>
                      <SelectItem value="O-">O-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">Family Contact Number</label>
                  <Input
                    value={formData.family_contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, family_contact: e.target.value }))}
                    disabled={!editing}
                    className="bg-white/20 border-white/30 text-white"
                    placeholder="Enter Family Contact Number"
                  />
                </div>
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Address</label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  disabled={!editing}
                  className="bg-white/20 border-white/30 text-white"
                  placeholder="Enter Complete Address"
                  rows={3}
                />
              </div>
              <div>
                <label className="text-white text-sm font-medium mb-2 block">Ongoing Treatment Details</label>
                <Textarea
                  value={formData.ongoing_treatment}
                  onChange={(e) => setFormData(prev => ({ ...prev, ongoing_treatment: e.target.value }))}
                  disabled={!editing}
                  className="bg-white/20 border-white/30 text-white"
                  placeholder="Enter Ongoing Treatment Details"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Prescriptions and Treatment History */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="h-6 w-6 mr-2" />
                  Prescriptions & Treatment History
                </div>
                <Button
                  onClick={downloadTreatmentReport}
                  className="bg-blue-500 hover:bg-blue-600"
                  disabled={!patientProfile}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Report
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {prescriptions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-white">Date</TableHead>
                      <TableHead className="text-white">Doctor</TableHead>
                      <TableHead className="text-white">Prescription</TableHead>
                      <TableHead className="text-white">Document</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescriptions.map((prescription) => (
                      <TableRow key={prescription.id}>
                        <TableCell className="text-white/80">
                          {new Date(prescription.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-white/80">
                          {prescription.doctor_name}
                        </TableCell>
                        <TableCell className="text-white/80">
                          {prescription.prescription_text}
                        </TableCell>
                        <TableCell className="text-white/80">
                          {prescription.document_url ? (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-white border-white/30 hover:bg-white/20"
                              onClick={() => window.open(prescription.document_url, '_blank')}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                          ) : (
                            'No document'
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center text-white/80 py-8">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No prescriptions found</p>
                  <p className="text-sm">Your prescriptions will appear here once doctors add them</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface PatientFormData {
  patient_id: string;
  name: string;
  age: string;
  gender: string;
  blood_group: string;
  family_contact: string;
  address: string;
  ongoing_treatment: string;
}

interface PatientProfileFormProps {
  onClose: () => void;
  onSuccess: () => void;
  doctorName: string;
}

const PatientProfileForm: React.FC<PatientProfileFormProps> = ({ onClose, onSuccess, doctorName }) => {
  const [formData, setFormData] = useState<PatientFormData>({
    patient_id: `P${Date.now()}`,
    name: '',
    age: '',
    gender: '',
    blood_group: '',
    family_contact: '',
    address: '',
    ongoing_treatment: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('patient_profiles')
        .insert({
          patient_id: formData.patient_id,
          name: formData.name,
          age: parseInt(formData.age),
          gender: formData.gender,
          blood_group: formData.blood_group,
          family_contact: formData.family_contact,
          address: formData.address,
          ongoing_treatment: formData.ongoing_treatment,
          created_by_doctor: doctorName
        });

      if (error) throw error;

      toast.success('Patient profile created successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error('Error creating patient profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          <div className="flex items-center">
            <User className="h-6 w-6 mr-2" />
            Create New Patient Profile
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Patient ID</label>
              <Input
                value={formData.patient_id}
                onChange={(e) => setFormData(prev => ({ ...prev, patient_id: e.target.value }))}
                className="bg-white/20 border-white/30 text-white"
                required
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Full Name</label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="bg-white/20 border-white/30 text-white"
                required
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Age</label>
              <Input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                className="bg-white/20 border-white/30 text-white"
                required
              />
            </div>
            <div>
              <label className="text-white text-sm font-medium mb-2 block">Gender</label>
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
                required
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
                required
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
                className="bg-white/20 border-white/30 text-white"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Address</label>
            <Textarea
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              className="bg-white/20 border-white/30 text-white"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="text-white text-sm font-medium mb-2 block">Ongoing Treatment Details</label>
            <Textarea
              value={formData.ongoing_treatment}
              onChange={(e) => setFormData(prev => ({ ...prev, ongoing_treatment: e.target.value }))}
              className="bg-white/20 border-white/30 text-white"
              rows={4}
            />
          </div>
          <div className="flex gap-4">
            <Button
              type="submit"
              className="flex-1 bg-green-500 hover:bg-green-600"
              disabled={loading}
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Creating...' : 'Create Patient Profile'}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="text-white border-white/30 hover:bg-white/20"
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientProfileForm;


import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart, Brain, Bone, Baby, Eye, Pill, Stethoscope, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap = {
  Heart, Brain, Bone, Baby, Eye, Pill, Stethoscope, Activity
};

const Specialties = () => {
  const navigate = useNavigate();

  const { data: specialties, isLoading } = useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('specialties')
        .select('*')
        .order('name');
      
      if (error) throw error;
      return data;
    },
  });

  const handleSpecialtyClick = (specialtyId: string, specialtyName: string) => {
    navigate(`/specialty/${specialtyId}`, { state: { specialtyName } });
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
            onClick={() => navigate('/')}
            variant="ghost"
            className="text-white hover:bg-white/20 mb-6 animate-fade-in"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Our Medical Specialties
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Comprehensive healthcare services across multiple specializations with world-class expertise
            </p>
          </div>
        </div>
      </div>

      {/* Specialties Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specialties?.map((specialty, index) => {
            const IconComponent = iconMap[specialty.icon as keyof typeof iconMap] || Heart;
            const colorClasses = {
              red: 'bg-red-100 text-red-600 hover:bg-red-500 hover:text-white',
              purple: 'bg-purple-100 text-purple-600 hover:bg-purple-500 hover:text-white',
              blue: 'bg-blue-100 text-blue-600 hover:bg-blue-500 hover:text-white',
              green: 'bg-green-100 text-green-600 hover:bg-green-500 hover:text-white',
              cyan: 'bg-cyan-100 text-cyan-600 hover:bg-cyan-500 hover:text-white',
              orange: 'bg-orange-100 text-orange-600 hover:bg-orange-500 hover:text-white',
              teal: 'bg-teal-100 text-teal-600 hover:bg-teal-500 hover:text-white',
              pink: 'bg-pink-100 text-pink-600 hover:bg-pink-500 hover:text-white',
              yellow: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-500 hover:text-white',
              indigo: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-500 hover:text-white',
              emerald: 'bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white',
              violet: 'bg-violet-100 text-violet-600 hover:bg-violet-500 hover:text-white',
            };

            return (
              <Card
                key={specialty.id}
                className={`group cursor-pointer transform hover:scale-105 transition-all duration-300 hover:shadow-xl border-0 animate-fade-in ${colorClasses[specialty.color as keyof typeof colorClasses] || colorClasses.blue}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => handleSpecialtyClick(specialty.id, specialty.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-${specialty.color}-100 text-${specialty.color}-600 group-hover:bg-white/20 transition-colors duration-300`}>
                    <IconComponent className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-white transition-colors duration-300">
                    {specialty.name}
                  </h3>
                  <p className="text-gray-600 group-hover:text-white/90 transition-colors duration-300">
                    {specialty.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Specialties;

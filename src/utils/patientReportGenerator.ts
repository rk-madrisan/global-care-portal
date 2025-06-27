
import jsPDF from 'jspdf';

export interface PatientReportData {
  patientName: string;
  patientId: string;
  age: number;
  gender: string;
  bloodGroup: string;
  address: string;
  ongoingTreatment: string;
  prescriptions: Array<{
    id: string;
    doctor_name: string;
    prescription_text: string;
    created_at: string;
  }>;
}

export const generatePatientReportPDF = (reportData: PatientReportData) => {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(20);
  doc.setTextColor(6, 182, 212); // Cyan color
  doc.text('Global Hospital', 20, 30);
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text('Multispecialty Healthcare', 20, 40);
  
  // Title
  doc.setFontSize(16);
  doc.text('Patient Treatment Report', 20, 60);
  
  // Patient Information
  doc.setFontSize(12);
  let yPosition = 80;
  
  doc.setFontSize(14);
  doc.text('Patient Information', 20, yPosition);
  yPosition += 15;
  
  doc.setFontSize(12);
  doc.text(`Patient ID: ${reportData.patientId}`, 20, yPosition);
  yPosition += 10;
  
  doc.text(`Name: ${reportData.patientName}`, 20, yPosition);
  yPosition += 10;
  
  doc.text(`Age: ${reportData.age} years`, 20, yPosition);
  yPosition += 10;
  
  doc.text(`Gender: ${reportData.gender}`, 20, yPosition);
  yPosition += 10;
  
  doc.text(`Blood Group: ${reportData.bloodGroup}`, 20, yPosition);
  yPosition += 15;
  
  doc.text('Address:', 20, yPosition);
  yPosition += 5;
  const splitAddress = doc.splitTextToSize(reportData.address, 170);
  doc.text(splitAddress, 20, yPosition);
  yPosition += splitAddress.length * 5 + 10;
  
  // Ongoing Treatment
  doc.setFontSize(14);
  doc.text('Ongoing Treatment', 20, yPosition);
  yPosition += 15;
  
  doc.setFontSize(12);
  const splitTreatment = doc.splitTextToSize(reportData.ongoingTreatment || 'No ongoing treatment recorded', 170);
  doc.text(splitTreatment, 20, yPosition);
  yPosition += splitTreatment.length * 5 + 15;
  
  // Prescriptions
  if (reportData.prescriptions.length > 0) {
    doc.setFontSize(14);
    doc.text('Prescription History', 20, yPosition);
    yPosition += 15;
    
    reportData.prescriptions.forEach((prescription, index) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFontSize(12);
      doc.text(`${index + 1}. Date: ${new Date(prescription.created_at).toLocaleDateString()}`, 25, yPosition);
      yPosition += 8;
      
      doc.text(`   Doctor: ${prescription.doctor_name}`, 25, yPosition);
      yPosition += 8;
      
      doc.text('   Prescription:', 25, yPosition);
      yPosition += 5;
      
      const splitPrescription = doc.splitTextToSize(prescription.prescription_text, 160);
      doc.text(splitPrescription, 30, yPosition);
      yPosition += splitPrescription.length * 5 + 10;
    });
  }
  
  // Footer
  yPosition += 20;
  if (yPosition > 250) {
    doc.addPage();
    yPosition = 30;
  }
  
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text('This report is generated electronically and is valid without signature.', 20, yPosition);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 20, yPosition + 10);
  
  // Download the PDF
  doc.save(`patient-report-${reportData.patientId}.pdf`);
};

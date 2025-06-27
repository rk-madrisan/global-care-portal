
import jsPDF from 'jspdf';

export interface BookingDetails {
  patientName: string;
  patientEmail: string;
  doctorName: string;
  specialtyName: string;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  bookingId: string;
}

export const generateBookingPDF = (bookingDetails: BookingDetails) => {
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
  doc.text('Appointment Confirmation', 20, 60);
  
  // Booking details
  doc.setFontSize(12);
  let yPosition = 80;
  
  doc.text(`Booking ID: ${bookingDetails.bookingId}`, 20, yPosition);
  yPosition += 15;
  
  doc.text(`Patient Name: ${bookingDetails.patientName}`, 20, yPosition);
  yPosition += 10;
  
  doc.text(`Email: ${bookingDetails.patientEmail}`, 20, yPosition);
  yPosition += 15;
  
  doc.text(`Doctor: ${bookingDetails.doctorName}`, 20, yPosition);
  yPosition += 10;
  
  doc.text(`Specialty: ${bookingDetails.specialtyName}`, 20, yPosition);
  yPosition += 15;
  
  doc.text(`Date: ${new Date(bookingDetails.appointmentDate).toLocaleDateString()}`, 20, yPosition);
  yPosition += 10;
  
  doc.text(`Time: ${bookingDetails.appointmentTime}`, 20, yPosition);
  yPosition += 15;
  
  if (bookingDetails.notes) {
    doc.text('Notes:', 20, yPosition);
    yPosition += 10;
    const splitNotes = doc.splitTextToSize(bookingDetails.notes, 170);
    doc.text(splitNotes, 20, yPosition);
    yPosition += splitNotes.length * 5;
  }
  
  // Footer
  yPosition += 20;
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text('Please arrive 15 minutes before your appointment time.', 20, yPosition);
  doc.text('For any changes or cancellations, please contact us at least 24 hours in advance.', 20, yPosition + 10);
  
  // Download the PDF
  doc.save(`appointment-confirmation-${bookingDetails.bookingId}.pdf`);
};

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export async function generateTicketPDF(ticketElement: HTMLElement) {
  try {
    const canvas = await html2canvas(ticketElement, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgData = canvas.toDataURL('image/png');

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('bilet-eveniment.pdf');

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
}

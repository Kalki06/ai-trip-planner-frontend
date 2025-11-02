import { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { ItineraryDisplay } from '../components/ItineraryDisplay';
import { PrintableItinerary } from '../components/PrintableItinerary';
import { Button } from '../components/ui/Button';
import { ArrowLeft, Download, Share2, FileText } from 'lucide-react';

export const ViewTrip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const trip = location.state?.trip;
  const printRef = useRef();

  // React-to-print hook
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: trip?.itinerary?.tripTitle || 'Trip Itinerary',
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
        .page-break-before {
          page-break-before: always;
        }
      }
    `
  });

  // Browser print fallback
  const handleBrowserPrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: trip.itinerary?.tripTitle || 'My Trip',
      text: `Check out my ${trip.days}-day trip to ${trip.destination}!`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        console.log('✅ Shared successfully');
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Copy to clipboard as fallback
          navigator.clipboard.writeText(window.location.href);
          alert('Link copied to clipboard! 📋');
        }
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard! 📋 Share it with friends!');
      } catch (err) {
        console.error('Failed to copy:', err);
        alert('Unable to copy link. Please copy manually: ' + window.location.href);
      }
    }
  };

  const handleDownloadPDF = () => {
    // Trigger the print dialog which allows saving as PDF
    handlePrint();
    
    // Show instructions
    setTimeout(() => {
      if (!window.matchMedia('print').matches) {
        alert('💡 Tip: In the print dialog, select "Save as PDF" as the destination to download your itinerary!');
      }
    }, 500);
  };

  if (!trip) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h2>
          <p className="text-gray-600 mb-6">This trip may have been deleted or the link is invalid.</p>
          <Button onClick={() => navigate('/my-trips')}>
            Back to My Trips
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Main View - Visible on Screen */}
      <div className="min-h-screen bg-gray-50 py-8 print:hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Action Bar */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6 sticky top-4 z-10">
            <div className="flex flex-wrap gap-3 justify-between items-center">
              <Button
                onClick={() => navigate('/my-trips')}
                variant="secondary"
                className="flex items-center gap-2"
              >
                <ArrowLeft size={18} />
                Back to My Trips
              </Button>

              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleBrowserPrint}
                  className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                >
                  <FileText size={18} />
                  <span className="hidden sm:inline">Quick Print</span>
                  <span className="sm:hidden">Print</span>
                </Button>
                
                <Button
                  onClick={handleDownloadPDF}
                  className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                >
                  <Download size={18} />
                  <span className="hidden sm:inline">Download PDF</span>
                  <span className="sm:hidden">PDF</span>
                </Button>
                
                <Button
                  onClick={handleShare}
                  className="bg-purple-600 hover:bg-purple-700 flex items-center gap-2"
                >
                  <Share2 size={18} />
                  <span className="hidden sm:inline">Share Trip</span>
                  <span className="sm:hidden">Share</span>
                </Button>
              </div>
            </div>

            {/* Info Banner */}
            <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                💡 <strong>Tip:</strong> Click "Download PDF" to save this itinerary. You can also print it or share the link with travel companions!
              </p>
            </div>
          </div>

          {/* Trip Itinerary - Screen Version */}
          <ItineraryDisplay itinerary={trip.itinerary} />
        </div>
      </div>

      {/* Hidden Printable Version - For PDF Export */}
      <div className="hidden">
        <PrintableItinerary ref={printRef} itinerary={trip.itinerary} />
      </div>
    </>
  );
};
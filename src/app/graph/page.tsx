'use client'
import GraphReadBox from '@/components/box/GraphReadBox';
import SummaryCard from '@/components/card/SummaryCard';
import AgeDropDown from '@/components/dropdown/AgeDropDown';
import LineGraph from '@/components/graph/LineGraph'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React, {Component, Suspense, useState, useRef} from 'react';
import { Download, Share2, Loader2, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import SummaryCardForDownload from '@/components/card/SummaryCardForDownload';

const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export default function page() {
  const { data: session, status } = useSession();
  const [showDownloadComponent, setShowDownloadComponent] = useState(false);
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);
  const [pointData, setPointData] = useState<any>(null);
  const [graphData, setGraphData] = useState<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const summaryCardRef = useRef<HTMLDivElement>(null);

  if (status === 'unauthenticated'){
    redirect('/');
  }

  const handlePointData = (data: any) => {
    console.log('Data from Point: ', data);
    setPointData(data);
  }

  const handleGraphData = (data: any) => {  
    // console.log('Data from graph: ', data);
    setGraphData(data);
    // console.log(graphData);
  }

  const downloadImage = async () => {
    try {
      setIsDownloading(true);
      
      if (!summaryCardRef.current) {
        throw new Error('Summary card element not found');
      }

      const canvas = await html2canvas(summaryCardRef.current, {
        scale: 2, // Better balance between quality and performance
        logging: false,
        useCORS: true,
        backgroundColor: null,
      });

      const image = canvas.toDataURL('image/png', 1.0);
      const link = document.createElement('a');
      link.download = `starcansay-${Date.now()}.png`;
      link.href = image;
      link.click();
    } catch (error) {
      console.error('Failed to download image:', error);
      // You might want to add a toast notification here
    } finally {
      setIsDownloading(false);
    }
  };

  const shareToInstagram = async () => {
    try {
      setIsSharing(true);
      
      if (!summaryCardRef.current) {
        throw new Error('Summary card element not found');
      }

      const canvas = await html2canvas(summaryCardRef.current, {
        scale: 2,
        logging: false,
        useCORS: true,
        backgroundColor: null,
      });

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          resolve(blob!);
        }, 'image/png', 1.0);
      });

      // Create file from blob
      const file = new File([blob], 'starcansay.png', { type: 'image/png' });

      // Check if Web Share API is supported
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: 'My Starcansay Graph',
          text: 'Check out my life graph from Starcansay!'
        });
      } else {
        // Fallback for browsers that don't support sharing files
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'starcansay.png';
        link.click();
        URL.revokeObjectURL(blobUrl);
        console.warn('Web Share API not supported');
      }
    } catch (error) {
      console.error('Failed to share image:', error);
      // You might want to add a toast notification here
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className='w-full'>
      <div className='flex flex-col h-fit bg-starcansayblue justify-center font-body md:flex-row w-full md:h-screen'>
        <div className='mt-28 flex flex-col text-white lg:mr-20 md:mr-10'>
          <p className='text-7xl text-center md:text-left'>ชีวิตนะมานิ <br/> ในวัย 34 ปี</p>
          <br/>
          <p className='text-2xl text-center md:text-left'>เกิดวันที่ 20 ก.ย. 2540 <br/>เวลาเกิด 13.00 <br/>สถานที่เกิด เชียงใหม่</p>
        </div>
        <div className='flex flex-col justify-center mx-5 mt-5 md:mt-28 mb-10 max-h-full aspect-[1080/1920]'>
          <div ref={summaryCardRef}>
            <SummaryCard handleGraphData={graphData}/>
          </div>
          <div className='flex justify-center gap-1 mt-4'>
            <button 
              onClick={downloadImage}
              disabled={isDownloading}
              className="disabled:opacity-50"
              title="Download image"
            >
              {isDownloading ? (
                <Loader2 className='text-white animate-spin' />
              ) : (
                <Download className='text-white'/>
              )}
            </button>
            <button
              onClick={shareToInstagram}
              disabled={isSharing}
              className="disabled:opacity-50 relative group"
              title={isMobile() ? "Share to Instagram" : "Share (works best on mobile)"}
            >
              {isSharing ? (
                <Loader2 className='text-white animate-spin' />
              ) : (
                <>
                  <Share2 className='text-white'/>
                  {!isMobile() && (
                    <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Works best on mobile
                    </span>
                  )}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <main className='flex flex-col w-full font-body'>
        {/* Header with Title and Dropdown */}
        <div className='flex items-center mt-5 justify-between'>
          <h2 className='text-2xl md:ml-60'>
            นี่คือกราฟชีวิตของคุณนะมามิ!
          </h2>
          <div className='md:mr-60'>
            <AgeDropDown handlePointData={pointData || '25'} onPointData={handlePointData} />
          </div>
        </div>

        {/* Graph and ReadBox Section */}
          <section className='flex flex-col items-center mt-10 w-full'>
            {/* Line Graph */}
            <div className='w-full'>
              <LineGraph onPointData={handlePointData} onGraphData={handleGraphData} handlePointData={pointData} />
            </div>

            {/* Graph ReadBox */}
            <div className='mb-5 w-full mx-5'>
              <GraphReadBox handlePointData={pointData} handleGraphData={graphData} />
            </div>

            {/* Graph Guide Section */}
            <div className='w-full md:w-3/4'>
              <p className='ml-5'>วิธีอ่านกราฟ</p>
            </div>
          </section>
      </main>
    </div>
  )
}

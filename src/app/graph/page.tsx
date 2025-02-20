'use client'
import GraphReadBox from '@/components/box/GraphReadBox';
import SummaryCard from '@/components/card/ReflectMoonCard';
import AgeDropDown from '@/components/dropdown/AgeDropDown';
import LineGraph from '@/components/graph/LineGraph'
import { redirect } from 'next/navigation';
import React, {Component, Suspense, useState, useRef, useEffect} from 'react';
import { Download, Share2, Loader2, AlertCircle } from 'lucide-react';
import html2canvas from 'html2canvas';
import SummaryCardForDownload from '@/components/card/SummaryCardForDownload';
import ReflectMoonCard from '@/components/card/ReflectMoonCard';
import NewMoonCard from '@/components/card/summary-card';
import Navbar from '@/components/ui/Navbar';
import { createClient } from '@/utils/supabase/client';
import type { Session, User } from '@supabase/supabase-js'

const isMobile = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export default function page() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [showDownloadComponent, setShowDownloadComponent] = useState(false);
  const [cardRef, setCardRef] = useState<HTMLDivElement | null>(null);
  const [pointData, setPointData] = useState<number | null>(null);
  const [graphData, setGraphData] = useState<number[] | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const summaryCardRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState<string | null>(null);
  const [isLoadingSession, setIsLoadingSession] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log(session)
      if (!session) {
        redirect('/')
      }
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handlePointData = (data: number) => {
    setPointData(data);
  }

  const handleGraphData = (data: number[]) => {  
    setGraphData(data);
  }

  const getUserData = async (userId: string) => {
    const response = await fetch(`/api/users/${userId}/userData`, {
      method: 'GET',
    });
    const result = await response.json();
    return result;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      const { name, birthdate, birthTime, birthplace } = await getUserData(encodeURIComponent(session?.user?.email || ''));
      const userData = { name, birthdate, birthTime, birthplace };
      setName(userData.name);
      setBirthdate(userData.birthdate);
      setBirthTime(userData.birthTime);
      setBirthplace(userData.birthplace);
    };
    fetchUserData();
  }, [session?.user?.email]);

  const downloadImage = async () => {
    try {
      setIsDownloading(true);
      
      if (!summaryCardRef.current) {
        throw new Error('Summary card element not found');
      }

      // Pre-load images before capturing
      const images = summaryCardRef.current.getElementsByTagName('img');
      await Promise.all(Array.from(images).map(img => { 
        return new Promise((resolve, reject) => {
          const newImg = new Image();
          newImg.crossOrigin = 'anonymous'; // Enable CORS
          newImg.onload = () => resolve(true);
          newImg.onerror = reject;
          newImg.src = img.src;
        });
      }));

      const canvas = await html2canvas(summaryCardRef.current, {
        scale: 2, // Better balance between quality and performance
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        onclone: (document, element) => {
          // Ensure all images in cloned element have crossOrigin set
          const clonedImages = element.getElementsByTagName('img');
          for (const img of clonedImages) {
            img.crossOrigin = 'anonymous';
          }
        }
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
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to create blob from canvas'));
          }
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
      <div className='flex flex-col h-fit bg-starcansayblue justify-center items-center font-body md:flex-row md:items-start w-full md:min-h-fit'>
        <div className='mt-20 md:mt-28 flex flex-col text-white lg:mr-20 md:mr-10 items-center md:items-start'>
          <img src="https://storage.cloud.google.com/starcansay/img/sticker%20starcansay%20web-29%203.png" alt="starcansay sticker" width='253' height='179' className='md:-ml-11'/>
          <p className='text-7xl -ml-2 mt-5 font-starcansay text-starcansaypink text-center md:text-left'>ชีวิต {name} <br/> ในวัย 34 ปี</p>
          <br/>
          <p className='text-2xl text-center md:text-left font-thai'>เกิดวันที่ 20 ก.ย. 2540 <br/>เวลาเกิด 13.00 <br/>สถานที่เกิด เชียงใหม่</p>
        </div>
        <div className='flex flex-col justify-center mx-5 mt-5 md:mt-20 mb-10 max-h-full w-[387px]'>
          <div ref={summaryCardRef}>
            <NewMoonCard handleGraphData={graphData}/>
          </div>
          <div className='flex justify-center gap-1 mt-4'>
            <button 
                onClick={downloadImage}
                disabled={isDownloading}
                className="disabled:opacity-50"
                title="Download image"
                type="button"
              >
              {isDownloading ? (
                <Loader2 className='text-white animate-spin' />
              ) : (
                <Download className='text-white'/>
              )}
            </button>
            <button
              type="button"
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
      <main className='flex flex-col items-center font-body'>
        {/* Header with Title and Dropdown */}
        <div className='flex items-center mt-10 justify-center md:justify-between w-3/4'>
          <p className='md:ml-5  text-starcansayblue'>
            <span className='text-5xl font-starcansay'>
              นี่คือกราฟ 100 ปี ของคุณ !
            </span>
            <br/>
            <span className='text-2xl font-thai'>
              สามารถขยับเพื่อดูว่าแต่ละช่วงเป็นยังไงได้เลย
            </span>
          </p>
        </div>

        {/* Graph and ReadBox Section */}
          <section className='flex flex-col items-center mt-10 w-full'>
            <div className='relative w-full'>
              <LineGraph 
                onPointData={handlePointData} 
                onGraphData={handleGraphData} 
                handlePointData={pointData} 
                username={session?.user?.email || ''}
                onLoadingChange={setIsLoading}
              />
              {!isLoading && (
                <div className='absolute top-4 right-[15%]'>
                  <AgeDropDown handlePointData={pointData || 25} onPointData={handlePointData}/>
                </div>
              )}
            </div>

            {/* Graph ReadBox */}
            <div className='mb-5 w-full mx-5'>
              <GraphReadBox handlePointData={pointData || '25'} handleGraphData={graphData} />
            </div>
          </section>
      </main>
    </div>
  )
}

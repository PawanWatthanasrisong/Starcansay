'use client'
import { useState, type RefObject, useEffect } from 'react'
import { Download, Share2, Loader2 } from 'lucide-react'
import { downloadImage, shareToInstagram } from '@/utils/imageShare'
import { isMobile } from '@/utils/isMobile'

interface ShareButtonsProps {
  summaryCardRef: RefObject<HTMLDivElement>
  isDataLoading: boolean
  hasData: boolean
}

export default function ShareButtons({ 
  summaryCardRef, 
  isDataLoading, 
  hasData 
}: ShareButtonsProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [isMobileDevice, setIsMobileDevice] = useState(false)

  useEffect(() => {
    setIsMobileDevice(isMobile())
  }, [])

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      await downloadImage(summaryCardRef.current)
    } catch (error) {
      console.error('Failed to download image:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleShare = async () => {
    try {
      await shareToInstagram(summaryCardRef.current)
    } catch (error) {
      console.error('Failed to share image:', error)
    }
  }

  return (
    <div className='flex justify-center gap-1 mt-4'>
      <button
        onClick={handleDownload}
        disabled={isDownloading || isDataLoading || !hasData}
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
        onClick={handleShare}
        disabled={ isDataLoading || !hasData}
        className="disabled:opacity-50 relative group"
        title={isMobileDevice ? "Share to Instagram" : "Share (works best on mobile)"}
      >
          <>
            <Share2 className='text-white'/>
            {!isMobileDevice && (
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Works best on mobile
              </span>
            )}
          </>
      </button>
    </div>
  )
} 
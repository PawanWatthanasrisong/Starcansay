import * as htmlToImage from 'html-to-image'

const captureElement = async (element: HTMLElement): Promise<string> => {
  // First ensure all images are loaded
  const images = Array.from(element.getElementsByTagName('img'))
  
  // Create a promise for each image to load
  const imageLoadPromises = images.map(img => {
    if (img.complete) {
      return Promise.resolve()
    }
    return new Promise<void>((resolve, reject) => {
      img.addEventListener('load', () => resolve())
      img.addEventListener('error', () => reject())
      // Add a timeout to prevent infinite waiting
      setTimeout(() => resolve(), 5000)
    })
  })

  // Wait for all images to load
  await Promise.all(imageLoadPromises)

  // Convert Next.js Image components to regular img elements for capture
  for (const img of images) {
    if (img.srcset) {
      // Get the highest resolution image from srcset
      const srcset = img.srcset.split(',')
      const lastSrc = srcset[srcset.length - 1].trim().split(' ')[0]
      img.src = lastSrc
      img.srcset = ''
    }
  }

  // Add a small delay to ensure all images are rendered
  await new Promise<void>(resolve => setTimeout(resolve, 100))

  // Capture the element
  return await htmlToImage.toPng(element, {
    quality: 1.0,
    backgroundColor: undefined,
    pixelRatio: 2,
    skipAutoScale: true,
    fontEmbedCSS: undefined, // This will include all fonts
    filter: (node) => {
      // Skip script tags but keep everything else
      return node.tagName !== 'SCRIPT'
    }
  })
}

export async function downloadImage(element: HTMLElement | null) {
  if (!element) {
    throw new Error('Element not found')
  }

  try {
    const dataUrl = await captureElement(element)
    const filename = `starcansay-${Date.now()}.png`

    // For Safari, we need to use a different approach
    if (navigator.userAgent.includes('Safari') && !navigator.userAgent.includes('Chrome')) {
      const iframe = document.createElement('iframe')
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
      
      const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document
      if (iframeDoc) {
        const link = iframeDoc.createElement('a')
        link.href = dataUrl
        link.download = filename
        iframeDoc.body.appendChild(link)
        link.click()
        iframeDoc.body.removeChild(link)
      }
      
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 1000)
    } else {
      const link = document.createElement('a')
      link.download = filename
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  } catch (error) {
    console.error('Error downloading image:', error)
    throw error
  }
}

export async function shareToInstagram(element: HTMLElement | null) {
  if (!element) {
    throw new Error('Element not found')
  }

  try {
    const dataUrl = await captureElement(element)
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    const filename = `starcansay-${Date.now()}.png`
    const file = new File([blob], filename, { type: 'image/png' })

    // Check if Web Share API is supported
    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: 'My Starcansay Graph',
          text: 'Check out my life graph from Starcansay!'
        })
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          return // User cancelled the share
        }
        throw error
      }
    } else {
      // Fallback to download if sharing is not supported
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(blobUrl)
    }
  } catch (error) {
    console.error('Error sharing image:', error)
    throw error
  }
}
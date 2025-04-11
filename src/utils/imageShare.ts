import * as htmlToImage from 'html-to-image'

const captureElement = async (element: HTMLElement): Promise<string> => {
  // First ensure all images are loaded
  const images = Array.from(element.getElementsByTagName('img'))
  await Promise.all(images.map(img => {
    if (img.complete) {
      return Promise.resolve()
    }
    return new Promise((resolve, reject) => {
      img.addEventListener('load', resolve)
      img.addEventListener('error', reject)
    })
  }))

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
    
    const link = document.createElement('a')
    link.download = `starcansay-${Date.now()}.png`
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Error generating image:', error)
    throw error
  }
}

export async function shareToInstagram(element: HTMLElement | null) {
  if (!element) {
    throw new Error('Element not found')
  }

  try {
    const dataUrl = await captureElement(element)
    
    // Convert data URL to blob
    const response = await fetch(dataUrl)
    const blob = await response.blob()
    
    // Create file from blob
    const file = new File([blob], 'starcansay.png', { type: 'image/png' })

    // Check if Web Share API is supported
    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: 'My Starcansay Graph',
        text: 'Check out my life graph from Starcansay!'
      })
    } else {
      // Fallback for browsers that don't support sharing files
      const blobUrl = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = blobUrl
      link.download = 'starcansay.png'
      link.click()
      URL.revokeObjectURL(blobUrl)
      console.warn('Web Share API not supported')
    }
  } catch (error) {
    console.error('Error generating image for sharing:', error)
    throw error
  }
} 
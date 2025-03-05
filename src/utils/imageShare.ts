import html2canvas from 'html2canvas'

export const isMobile = () => {
  if (typeof window === 'undefined') return false
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
}

export async function downloadImage(element: HTMLElement | null) {
  if (!element) {
    throw new Error('Element not found')
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
    backgroundColor: null,
  })

  const image = canvas.toDataURL('image/png', 1.0)
  const link = document.createElement('a')
  link.download = `starcansay-${Date.now()}.png`
  link.href = image
  link.click()
}

export async function shareToInstagram(element: HTMLElement | null) {
  if (!element) {
    throw new Error('Element not found')
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    logging: false,
    useCORS: true,
    backgroundColor: null,
  })

  // Convert canvas to blob
  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob)
      } else {
        reject(new Error('Failed to create blob'))
      }
    }, 'image/png', 1.0)
  })

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
} 
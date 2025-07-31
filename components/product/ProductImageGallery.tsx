import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { Color } from '@/types'
import { FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi'

interface ProductImageGalleryProps {
  colors: Color[]
  selectedColorName: string
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  colors,
  selectedColorName,
}) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const thumbnailsContainerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const velocity = useRef(0)
  const animationFrame = useRef<number | null>(null)

  const selectedColor = useMemo(
    () => colors.find(c => c.name === selectedColorName) || colors[0],
    [colors, selectedColorName]
  )

  const currentMediaList = useMemo(
    () => selectedColor?.media || [],
    [selectedColor]
  )

  useEffect(() => {
    setCurrentMediaIndex(0)
  }, [currentMediaList])

  const goToSlide = (slideIndex: number) => {
    setCurrentMediaIndex(slideIndex)
  }

  const nextSlide = () => {
    const isLastSlide = currentMediaIndex === currentMediaList.length - 1
    const newIndex = isLastSlide ? 0 : currentMediaIndex + 1
    goToSlide(newIndex)
  }

  const prevSlide = () => {
    const isFirstSlide = currentMediaIndex === 0
    const newIndex = isFirstSlide
      ? currentMediaList.length - 1
      : currentMediaIndex - 1
    goToSlide(newIndex)
  }

  if (currentMediaList.length === 0) {
    return <div className='w-full aspect-[0.82] bg-gray-100' />
  }

  const currentMedia = currentMediaList[currentMediaIndex]

  const cancelMomentumTracking = () => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current)
  }

  const momentumLoop = () => {
    if (!thumbnailsContainerRef.current) return
    thumbnailsContainerRef.current.scrollLeft += velocity.current
    velocity.current *= 0.95
    if (Math.abs(velocity.current) > 0.5) {
      animationFrame.current = requestAnimationFrame(momentumLoop)
    }
  }

  const beginMomentumTracking = () => {
    cancelMomentumTracking()
    animationFrame.current = requestAnimationFrame(momentumLoop)
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!thumbnailsContainerRef.current) return
    isDragging.current = false
    setIsDown(true)
    setStartX(e.pageX - thumbnailsContainerRef.current.offsetLeft)
    setScrollLeft(thumbnailsContainerRef.current.scrollLeft)
    cancelMomentumTracking()
  }

  const handleMouseLeave = () => {
    setIsDown(false)
  }

  const handleMouseUp = () => {
    setIsDown(false)
    beginMomentumTracking()
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDown || !thumbnailsContainerRef.current) return
    e.preventDefault()
    isDragging.current = true
    const x = e.pageX - thumbnailsContainerRef.current.offsetLeft
    const walk = x - startX
    const prevScrollLeft = thumbnailsContainerRef.current.scrollLeft
    thumbnailsContainerRef.current.scrollLeft = scrollLeft - walk
    velocity.current =
      thumbnailsContainerRef.current.scrollLeft - prevScrollLeft
  }

  return (
    <div className='w-full'>
      <div className='relative w-full aspect-[0.82] overflow-hidden group'>
        {currentMedia.type === 'video' ? (
          <video
            key={currentMedia.url}
            src={currentMedia.url}
            autoPlay
            muted
            loop
            playsInline
            className='w-full h-full object-cover'
          />
        ) : (
          <Image
            src={currentMedia.url}
            alt={`${selectedColor.name} product image ${currentMediaIndex + 1}`}
            className='w-full h-full object-cover'
            layout='fill'
            priority={true}
          />
        )}

        <button
          onClick={prevSlide}
          className='absolute top-1/2 left-4 -translate-y-1/2 bg-white/50 rounded-full p-2 text-gray-800 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 z-10'
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className='absolute top-1/2 right-4 -translate-y-1/2 bg-white/50 rounded-full p-2 text-gray-800 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100 z-10'
        >
          <FiChevronRight size={24} />
        </button>

        <div className='absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10'>
          {currentMediaList.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-2 h-2 rounded-full ${currentMediaIndex === slideIndex ? 'bg-white ring-1 ring-gray-700' : 'bg-gray-400/50'}`}
            ></button>
          ))}
        </div>
      </div>

      <div
        ref={thumbnailsContainerRef}
        className='flex flex-nowrap overflow-x-auto pb-2 scrollbar-hide cursor-grab active:cursor-grabbing'
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {currentMediaList.map((media, index) => (
          <div
            key={index}
            className={`relative flex-shrink-0 w-1/4 aspect-[0.82] transition-opacity duration-300 ${currentMediaIndex === index ? 'opacity-100' : 'opacity-60'} hover:opacity-100`}
            onClick={() => {
              if (!isDragging.current) {
                goToSlide(index)
              }
            }}
          >
            <Image
              src={media.type === 'image' ? media.url : media.thumbnailUrl!}
              alt={`Thumbnail ${index + 1}`}
              className='w-full h-full object-cover pointer-events-none'
              layout='fill'
            />
            {media.type === 'video' && (
              <div className='absolute bottom-1 right-1 bg-white/80 rounded-full p-0.5'>
                <FiPlay className='w-4 h-4 text-black' />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductImageGallery

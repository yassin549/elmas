import { useState, useEffect, useRef, useMemo } from 'react'
import Image from 'next/image'
import { Color } from '@/types'
import { FiChevronLeft, FiChevronRight, FiPlay } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'

interface ProductImageGalleryProps {
  colors: Color[]
  selectedColorName: string
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  colors,
  selectedColorName,
}) => {
  const [[currentMediaIndex, direction], setCurrentMediaState] = useState([
    0, 0,
  ])
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
    setCurrentMediaState([0, 0])
  }, [currentMediaList])

  const goToSlide = (slideIndex: number) => {
    const newDirection = slideIndex > currentMediaIndex ? 1 : -1
    setCurrentMediaState([slideIndex, newDirection])
  }

  const nextSlide = () => {
    setCurrentMediaState(prevState => [
      prevState[0] === currentMediaList.length - 1 ? 0 : prevState[0] + 1,
      1,
    ])
  }

  const prevSlide = () => {
    setCurrentMediaState(prevState => [
      prevState[0] === 0 ? currentMediaList.length - 1 : prevState[0] - 1,
      -1,
    ])
  }

  if (currentMediaList.length === 0) {
    return <div className='w-full aspect-[0.82] bg-gray-100' />
  }

  const currentMedia = currentMediaList[currentMediaIndex]

  const swipeConfidenceThreshold = 10000
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
    }),
  }

  const paginate = (newDirection: number) => {
    if (newDirection > 0) {
      nextSlide()
    } else {
      prevSlide()
    }
  }

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
      <div className='relative w-full aspect-square md:aspect-[0.82] overflow-hidden group'>
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentMediaIndex}
            custom={direction}
            variants={variants}
            initial='enter'
            animate='center'
            exit='exit'
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag='x'
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) * velocity.x

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1)
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1)
              }
            }}
            className='absolute w-full h-full'
          >
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
                alt={`${selectedColorName} product image ${currentMediaIndex + 1}`}
                layout='fill'
                className='object-cover'
                priority={currentMediaIndex === 0}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevSlide}
          className='absolute top-1/2 left-2 md:left-4 -translate-y-1/2 bg-white/50 rounded-full p-1 md:p-2 text-gray-800 hover:bg-white transition-opacity opacity-70 md:opacity-0 md:group-hover:opacity-100 z-10'
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextSlide}
          className='absolute top-1/2 right-2 md:right-4 -translate-y-1/2 bg-white/50 rounded-full p-1 md:p-2 text-gray-800 hover:bg-white transition-opacity opacity-70 md:opacity-0 md:group-hover:opacity-100 z-10'
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
            className={`relative flex-shrink-0 w-1/3 md:w-1/4 aspect-square md:aspect-[0.82] transition-opacity duration-300 ${currentMediaIndex === index ? 'opacity-100' : 'opacity-60'} hover:opacity-100`}
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

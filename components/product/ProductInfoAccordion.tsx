import React, { useState } from 'react'
import { FiMinus, FiPlus } from 'react-icons/fi'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isOpen?: boolean
}

const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  children,
  isOpen: defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className='border-b border-gray-200 py-3 md:py-4'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='w-full flex justify-between items-center text-left'
      >
        <span className='text-xs md:text-sm uppercase font-medium tracking-wide md:tracking-wider'>
          {title}
        </span>
        {isOpen ? (
          <FiMinus className='w-4 h-4' />
        ) : (
          <FiPlus className='w-4 h-4' />
        )}
      </button>
      {isOpen && (
        <div className='pt-3 md:pt-4 text-sm text-gray-700 font-light leading-relaxed'>
          {children}
        </div>
      )}
    </div>
  )
}

const ProductInfoAccordion: React.FC = () => {
  return (
    <div className='w-full mt-6 md:mt-10 font-light'>
      <AccordionItem title='Details' isOpen={true}>
        <p>
          The Iveena Set is a must-have for your weekend wardrobe. Featuring a
          knitted crop top with a straight neckline and a matching mini skirt.
          We love this styled with sneakers for a casual look or heels for a
          night out with the girls!
        </p>
      </AccordionItem>
      <AccordionItem title='Model'>
        <p>
          Model is 160cm and wears a size XS. We recommend sizing down for a
          tighter fit.
        </p>
      </AccordionItem>
      <AccordionItem title='Size and Fit'>
        <p>
          Details:
          <br />- Mini length skirt
          <br />- Knitted material
          <br />- Elasticated waistband
          <br />- 65% Cotton 35% Polyester
        </p>
      </AccordionItem>
      <AccordionItem title='Returns'>
        <p>
          We offer returns for store credit within 21 days of receiving your
          order. Please see our full returns policy for more details.
        </p>
      </AccordionItem>
      <AccordionItem title='Delivery'>
        <p>
          We offer standard and express shipping options. Please see our
          shipping page for estimated delivery times.
        </p>
      </AccordionItem>
    </div>
  )
}

export default ProductInfoAccordion

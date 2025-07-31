const AboutPage = () => {
  return (
    <div className='container mx-auto px-4 py-12 md:py-20 text-gray-800 dark:text-gray-200'>
      <div className='max-w-3xl mx-auto'>
        <h1 className='text-4xl md:text-5xl font-bold text-center text-shadow-neon-cyan mb-6'>
          About Us
        </h1>
        <p className='text-xl text-center text-gray-600 dark:text-gray-400 mb-12'>
          Enjoy Uniqueness Every Day.
        </p>

        <p className='text-lg leading-relaxed mb-8'>
          At ELMAS, we believe in thoughtful purchases that celebrate
          authenticity. Born in Barcelona and embraced in Tunisia, we blend
          Mediterranean elegance with mindful fashion choices.
        </p>

        <div className='space-y-10'>
          <div>
            <h2 className='text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 mb-4'>
              Our Philosophy
            </h2>
            <p className='text-lg leading-relaxed'>
              We are committed to a sustainable, elegant, and conscious way of
              dressing. Our collections are made exclusively from 100% genuine
              linen, carefully designed to last, adapt to all seasons, and
              highlight your personal style — without chasing fleeting trends.
            </p>
          </div>

          <div>
            <h2 className='text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 mb-4'>
              Heritage & Vision
            </h2>
            <p className='text-lg leading-relaxed mb-4'>
              Since 1991, ELMAS has been a linen expert, cultivating a unique
              savoir-faire rooted in responsibility, refinement, and timeless
              quality. We don’t just create clothing — we build a vision:
            </p>
            <blockquote className='border-l-4 border-indigo-500 pl-4 italic text-gray-600 dark:text-gray-400'>
              To become the #1 reference in eco-friendly linen fashion, merging
              craftsmanship with sustainability.
            </blockquote>
          </div>

          <div>
            <h2 className='text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 mb-4'>
              What Makes Us Different
            </h2>
            <ul className='list-disc list-inside space-y-2 text-lg'>
              <li>Authentic linen pieces designed between Spain and Tunisia</li>
              <li>A fusion of Spanish elegance and Tunisian sophistication</li>
              <li>
                A commitment to ecological practices, without compromising on
                aesthetic
              </li>
            </ul>
          </div>

          <div>
            <h2 className='text-2xl font-semibold border-b border-gray-300 dark:border-gray-700 pb-2 mb-4'>
              Returns & Exchanges
            </h2>
            <p className='text-lg leading-relaxed mb-4'>
              We want you to feel fully satisfied with your order. If something
              isn’t quite right:
            </p>
            <ul className='list-disc list-inside space-y-2 text-lg'>
              <li>
                You have 3 days after receiving your item to request an exchange
              </li>
              <li>Items must be unworn and unwashed</li>
              <li>Original packaging is recommended (if available)</li>
              <li>
                Return shipping costs are the buyer’s responsibility, unless the
                issue was on our end
              </li>
            </ul>
          </div>
        </div>

        <div className='text-center mt-16'>
          <p className='text-lg font-semibold'>Thank you for trusting us.</p>
          <p className='text-xl italic mt-2'>
            Invest in the essential. Invest in ELMAS.
          </p>
          <p className='text-md text-gray-500 mt-4'>
            The refinement of authentic linen — between Spain and Tunisia.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage

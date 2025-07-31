import React from 'react'

interface Breadcrumb {
  name: string
  href: string
}

interface BreadcrumbsProps {
  crumbs: Breadcrumb[]
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav aria-label='Breadcrumb'>
      <ol className='flex items-center space-x-2 text-xs uppercase tracking-wider text-gray-500'>
        {crumbs.map((crumb, index) => (
          <li key={crumb.name} className='flex items-center'>
            <a href={crumb.href} className='hover:text-gray-800'>
              {crumb.name}
            </a>
            {index < crumbs.length - 1 && <span className='mx-2'>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumbs

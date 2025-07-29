import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { FiPlus, FiTrash2, FiUploadCloud } from 'react-icons/fi'
import toast from 'react-hot-toast'

// Define the validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  price: yup
    .number()
    .typeError('Price must be a number')
    .positive('Price must be positive')
    .required('Price is required'),
  quantity: yup
    .number()
    .typeError('Stock must be a number')
    .integer('Stock must be an integer')
    .min(0, 'Stock cannot be negative')
    .required('Stock is required'),
  images: yup
    .array()
    .of(yup.string().url('Must be a valid URL').required('Image URL is required'))
    .min(1, 'At least one image is required')
    .required(),
})

// Define the form data structure based on the schema
export type ProductFormData = Omit<yup.InferType<typeof schema>, 'images'> & {
  images: string[]
}

interface ProductFormProps {
  onSubmit: (data: ProductFormData) => void
  defaultValues?: Partial<ProductFormData>
  isSubmitting: boolean
}

const ProductForm: React.FC<ProductFormProps> = ({
  onSubmit,
  defaultValues,
  isSubmitting,
}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProductFormData>({
    resolver: yupResolver(schema),
    defaultValues: defaultValues || { images: [] },
  })

  const [isUploading, setIsUploading] = useState(false)
  const images = watch('images')

  const inputClass =
    'w-full bg-transparent border-b border-gray-300 py-2 px-1 text-gray-800 focus:outline-none focus:border-black transition-colors dark:text-white dark:border-gray-600 dark:focus:border-white'
  const errorClass = 'text-red-600 text-xs mt-1'
  const labelClass = 'text-xs text-gray-500 uppercase tracking-wider'

  return (
    <div className='bg-gray-50 dark:bg-gray-900 p-8 rounded-lg shadow-md font-sans'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <h2 className='text-xl font-semibold text-gray-800 dark:text-white border-b pb-4 mb-6'>
          Product Details
        </h2>

        {/* Name, Description, Category */}
        <div className='space-y-6'>
          <div>
            <label htmlFor='name' className={labelClass}>
              Name
            </label>
            <input id='name' {...register('name')} className={inputClass} />
            {errors.name && <p className={errorClass}>{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor='description' className={labelClass}>
              Description
            </label>
            <textarea
              id='description'
              {...register('description')}
              className={`${inputClass} h-24`}
            ></textarea>
            {errors.description && <p className={errorClass}>{errors.description.message}</p>}
          </div>
          <div>
            <label htmlFor='category' className={labelClass}>
              Category
            </label>
            <input id='category' {...register('category')} className={inputClass} />
            {errors.category && <p className={errorClass}>{errors.category.message}</p>}
          </div>
        </div>

        {/* Price and Stock */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div>
            <label htmlFor='price' className={labelClass}>
              Price
            </label>
            <input id='price' type='number' step='0.01' {...register('price')} className={inputClass} />
            {errors.price && <p className={errorClass}>{errors.price.message}</p>}
          </div>
          <div>
            <label htmlFor='quantity' className={labelClass}>
              Stock
            </label>
            <input id='quantity' type='number' {...register('quantity')} className={inputClass} />
            {errors.quantity && <p className={errorClass}>{errors.quantity.message}</p>}
          </div>
        </div>

                {/* Image Upload */}
        <div>
          <label className={labelClass}>Images</label>
          <div className='mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4'>
            {images.map((image, index) => (
              <div key={index} className='relative group aspect-square'>
                <img
                  src={image}
                  alt={`Product image ${index + 1}`}
                  className='w-full h-full object-cover rounded-lg shadow-md'
                />
                <button
                  type='button'
                  onClick={() => {
                    const updatedImages = images.filter((_, i) => i !== index)
                    setValue('images', updatedImages, { shouldValidate: true })
                  }}
                  className='absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-700'
                >
                  <FiTrash2 size={14} />
                </button>
              </div>
            ))}
            <label
              htmlFor='image-upload'
              className='flex flex-col items-center justify-center aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
            >
              {isUploading ? (
                <div className='text-xs text-center'>Uploading...</div>
              ) : (
                <>
                  <FiUploadCloud className='w-8 h-8 text-gray-400' />
                  <span className='mt-2 text-xs text-center text-gray-500'>Add Image</span>
                </>
              )}
              <input
                id='image-upload'
                type='file'
                accept='image/*'
                className='hidden'
                onChange={async (e) => {
                  if (e.target.files && e.target.files[0]) {
                    const file = e.target.files[0]
                    const formData = new FormData()
                    formData.append('file', file)
                    setIsUploading(true)
                    try {
                      const response = await fetch('/api/upload', {
                        method: 'POST',
                        body: formData,
                      })
                      if (!response.ok) {
                        throw new Error('Upload failed')
                      }
                      const data = await response.json()
                      setValue('images', [...images, data.filePath], { shouldValidate: true })
                      toast.success('Image uploaded successfully!')
                    } catch (error) {
                      toast.error('Image upload failed.')
                    } finally {
                      setIsUploading(false)
                    }
                  }
                }}
              />
            </label>
          </div>
          {errors.images && <p className={errorClass}>{errors.images.message}</p>}
        </div>

        {/* Submit Button */}
        <div className='flex justify-end pt-4'>
          <button
            type='submit'
            disabled={isSubmitting}
            className='w-full sm:w-auto bg-black text-white py-3 px-8 text-sm font-medium tracking-widest uppercase hover:bg-gray-800 disabled:bg-gray-400 transition-colors duration-300'
          >
            {isSubmitting ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default ProductForm

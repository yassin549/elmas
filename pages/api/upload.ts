import { NextApiRequest, NextApiResponse } from 'next'
import formidable, { Fields, Files, Part } from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: {
    bodyParser: false,
  },
}

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

// Ensure the upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

const uploadHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const form = formidable({
    uploadDir,
    keepExtensions: true,
    filename: (name: string, ext: string, part: Part) => {
      return `${Date.now()}-${part.originalFilename}`
    },
  })

  form.parse(req, (err: Error, fields: Fields, files: Files) => {
    if (err) {
      return res
        .status(500)
        .json({ message: 'File upload failed', error: err.message })
    }

    const file = files.file
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded.' })
    }

    const uploadedFile = Array.isArray(file) ? file[0] : file
    const filePath = `/uploads/${uploadedFile.newFilename}`

    res.status(200).json({ message: 'File uploaded successfully', filePath })
  })
}

export default uploadHandler

import { useState, useEffect } from 'react'
import axiosInstance from '../api/axiosInstance'

export default function useContent(page) {
  const [content, setContent] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axiosInstance.get(`/content/${page}`)
        setContent(res.data.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [page])

  return { content, loading }
}
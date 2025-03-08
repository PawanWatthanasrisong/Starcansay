'use client'
import { useState, useEffect, useCallback } from 'react'
import type { UserData } from '@/types/user'

export function useUserData(userId: string | undefined) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isUserDataLoading, setIsUserDataLoading] = useState(false)

  const getUserData = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/users/${encodeURIComponent(id)}/userData`, {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
  }, [])

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return
      
      setIsUserDataLoading(true)
      try {
        const data = await getUserData(userId)
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsUserDataLoading(false)
      }
    }

    fetchUserData()
  }, [userId, getUserData])

  return { userData, isUserDataLoading }
} 
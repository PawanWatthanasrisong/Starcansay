'use client'
import { useState, useEffect, useCallback } from 'react'
import type { UserData } from '@/types/user'

export function useUserData(userEmail?: string) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isUserDataLoading, setIsUserDataLoading] = useState(false)

  const getUserData = useCallback(async () => {
    try {
      const response = await fetch(userEmail ? `/api/users/${encodeURIComponent(userEmail)}/userData` : '/api/profile', {
        method: 'GET',
      })
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      const data = await response.json()
      return userEmail ? data : data.userData
    } catch (error) {
      console.error('Error fetching user data:', error)
      return null
    }
  }, [userEmail])

  useEffect(() => {
    const fetchUserData = async () => {
      setIsUserDataLoading(true)
      try {
        const data = await getUserData()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setIsUserDataLoading(false)
      }
    }

    fetchUserData()
  }, [getUserData])

  return { userData, isUserDataLoading }
} 
'use client'
import { useState, useEffect, useCallback } from 'react'
import type { UserData } from '@/types/user'

export function useUserData(userEmail?: string) {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isUserDataLoading, setIsUserDataLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getUserData = useCallback(async () => {
    try {
      const response = await fetch(userEmail ? `/api/users/${encodeURIComponent(userEmail)}/userData` : '/api/profile', {
        method: 'GET',
      })
      
      if (response.status === 401) {
        setError('Unauthorized access');
        return null;
      }
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`)
      }
      
      const data = await response.json()
      return userEmail ? data : data.userData
    } catch (error) {
      console.error('Error fetching user data:', error)
      setError(error instanceof Error ? error.message : 'Failed to fetch user data');
      return null
    }
  }, [userEmail])

  useEffect(() => {
    const fetchUserData = async () => {
      setIsUserDataLoading(true)
      setError(null)
      try {
        const data = await getUserData()
        setUserData(data)
      } catch (error) {
        console.error('Error fetching user data:', error)
        setError(error instanceof Error ? error.message : 'Failed to fetch user data');
      } finally {
        setIsUserDataLoading(false)
      }
    }

    fetchUserData()
  }, [getUserData])

  return { userData, isUserDataLoading, error }
} 
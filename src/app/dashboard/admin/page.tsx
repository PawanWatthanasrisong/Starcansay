'use client'
import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { redirect, useRouter } from "next/navigation"
import { Loader2, Eye } from "lucide-react"
import { useToast } from "@/components/hooks/use-toast"
import { checkAdmin } from '@/lib/auth'

interface SheetData {
  id: string
  email: string
  lastUpdated: string
  status: 'pending' | 'success' | 'error' | 'done'
}

export default function AdminPage() {
  const router = useRouter();
  const [sheets, setSheets] = useState<SheetData[]>([])
  const [isCheckingAdmin, setIsCheckingAdmin] = useState(true)
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
  const { toast } = useToast()

  const fetchSheets = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/sheets')
      const data = await response.json()
      setSheets(data)
    } catch (error) {
    console.error('Failed to fetch sheets:', error)
      toast({
        title: "Error",
        description: "Failed to fetch sheets data",
        variant: "destructive",
      })
    }
  }, [toast])

  useEffect(() => {
    const fetchSession = async () => {
      setIsCheckingAdmin(true)
      const isAdmin = await checkAdmin();
      if (!isAdmin) {
        redirect('/graph');
      }
      setIsCheckingAdmin(false)
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetchSheets();
    };
    fetchData();
  }, [fetchSheets]);

  const updateSheet = async (sheetEmail: string) => {
    setLoading(prev => ({ ...prev, [sheetEmail]: true }))
    try {
      const response = await fetch('/api/admin/update-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sheetEmail }),
      })

      if (!response.ok) {
        throw new Error('Failed to update sheet')
      }

      setSheets(prevSheets => 
        prevSheets.map(sheet => 
          sheet.email === sheetEmail ? { ...sheet, status: 'done' } : sheet
        )
      );

      toast({
        title: "Success",
        variant: "default",
        description: "Sheet data updated successfully",
      })
      
    } catch (error) {
      console.error('Failed to update sheet:', error)
      toast({
        title: "Error",
        description: "Failed to update sheet data",
        variant: "destructive",
      })
      setSheets(prevSheets => 
        prevSheets.map(sheet => 
          sheet.email === sheetEmail ? { ...sheet, status: 'error' } : sheet
        )
      );
    } finally {
      setLoading(prev => ({ ...prev, [sheetEmail]: false }))
    }
  }

  if (isCheckingAdmin) {
    return <div className="container mx-auto p-6 mt-10">Checking permissions...</div>
  }

  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold font-thai">Admin Dashboard</h1>
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-thai">Sheet ID (Email)</th>
                  <th className="text-left p-3 font-thai">Last Updated</th>
                  <th className="text-left p-3 font-thai">Update Data</th>
                  <th className="text-left p-3 font-thai">Preview Graph</th>
                </tr>
              </thead>
              <tbody>
                {sheets.map((sheet) => (
                  <tr key={sheet.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-thai">{sheet.email}</td>
                    <td className="p-3 font-thai">{new Date(sheet.lastUpdated).toLocaleString()}</td>
                    <td className="p-3">
                      <Button
                        onClick={() => updateSheet(sheet.email)}
                        disabled={loading[sheet.id]}
                        variant="outline"
                        className="font-thai text-starcansayblue border-starcansayblue hover:bg-starcansayblue hover:text-white"
                      >
                        {loading[sheet.id] ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          'Update Data'
                        )}
                      </Button>
                    </td>
                    <td className="p-3">
                      <Button 
                        variant="outline" 
                        className="flex items-center text-starcansayblue border-starcansayblue hover:bg-starcansayblue hover:text-white"
                        onClick={() => {
                          router.push(`/graph/${encodeURIComponent(sheet.email)}`)
                        }}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Preview
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}
'use client'
import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { redirect } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/hooks/use-toast"
import { createClient } from '@/utils/supabase/client';
import type { Session } from '@supabase/supabase-js'

interface SheetData {
  id: string
  email: string
  lastUpdated: string
  status: 'pending' | 'success' | 'error' | 'done'
}

export default function AdminPage() {
  const [sheets, setSheets] = useState<SheetData[]>([])
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({})
  const [user, setUser] = useState<Session | null>(null);
  const { toast } = useToast()
  const supabase = createClient();

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
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || session.user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        redirect('/graph');
      }
      setUser(session);
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]); // Added supabase.auth as a dependency

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
        description: "Sheet data updated successfully",
      })
      
      await fetchSheets()
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

  return (
    <div className="container mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold mb-6 font-thai">Admin Dashboard</h1>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 font-thai">Sheet ID (Email)</th>
                  <th className="text-left p-3 font-thai">Last Updated</th>
                  <th className="text-left p-3 font-thai">Status</th>
                  <th className="text-left p-3 font-thai">Update Data</th>
                </tr>
              </thead>
              <tbody>
                {sheets.map((sheet) => (
                  <tr key={sheet.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-thai">{sheet.email}</td>
                    <td className="p-3 font-thai">{new Date(sheet.lastUpdated).toLocaleString()}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        sheet.status === 'success' ? 'bg-green-100 text-green-800' :
                        sheet.status === 'error' ? 'bg-red-100 text-red-800' :
                        sheet.status === 'done' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sheet.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <Button
                        onClick={() => updateSheet(sheet.email)}
                        disabled={loading[sheet.id]}
                        className="font-thai"
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

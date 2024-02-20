'use client'
import { useCallback, useEffect, useState } from 'react'

import { Database } from '../database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'


interface Score {
 score: number,
 created_at: string
 // add note later
}

export default function AccountForm({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)

  const [ scores, setScores ] = useState([] as Score[])
  const user = session?.user

  const getUserScores = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('mood_score')
        .select('*')
     


      if (error && status !== 406) {
        throw error
      }

      if (data) {
       setScores(data)
         console.log(data)
      } 
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)

    }
  }, [user, supabase])

  useEffect(() => {
    getUserScores()
  }, [user, getUserScores])

  

  return (
    <div className="">
      <div className="text-xl">My Scores: {scores.length} </div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>Score</th>
            <th>Date</th>
        
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          { scores?.map((item) => 
           <tr key={item.created_at}>
             <td className="text-lg text-extrabold">{item.score}</td>
            <td>{new Date(item.created_at).toLocaleString()}</td>
          
            <td></td>
          </tr>
        )}
          
        </tbody>
      </table>


    </div>
  )
}

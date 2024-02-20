'use client'
import { useCallback, useEffect, useState } from 'react'

import { Database } from '../database.types'
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function AddScore({ session }: { session: Session | null }) {
  const supabase = createClientComponentClient<Database>()
  const [loading, setLoading] = useState(true)
  const [fullname, setFullname] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)
  const [website, setWebsite] = useState<string | null>(null)

  const [score, setScore] = useState<number | null>(null)
  const user = session?.user

  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setFullname(data.full_name)
        setUsername(data.username)
        setWebsite(data.website)
        // setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      console.log(error)
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

 

  async function addScore({
    score
    // username,
    // website,
    // avatar_url,
  }: {
    score: number | null
    // username: string | null
    // fullname: string | null
    // website: string | null
    // avatar_url: string | null
  }) {
    try {
      setLoading(true)

      let { error } = await supabase.from('mood_score').upsert({
        created_by: user?.id as string,
        score:score,
        // username,
        // website,
        // avatar_url,
        created_at: new Date().toISOString(),
      })
      if (error) throw error
      alert(`Score Saved: ${score}`)
    } catch (error) {
      alert('Error updating the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-widget">
<h1>CURRENT SCORE: {score}</h1>
      <div className="flex flex-row space-x-2 text-4xl "> 
        <button
          id="score-1"
          value={1}
          onClick={(e) => setScore(1)}
        >1
      </button>
              <button
          id="score-2"
          value={2}
          onClick={(e) => setScore(2)}
        >2
      </button>
              <button
          id="score-3"
          value={3}
          onClick={(e) => setScore(3)}
        >3
      </button>
              <button
          id="score-4"
          value={4}
          onClick={(e) => setScore(4)}
        >4
      </button>
              <button
          id="score-5"
          value={5}
          onClick={(e) => setScore(5)}
        >5
      </button>
              <button
          id="score-6"
          value={6}
          onClick={(e) => setScore(6)}
        >6
      </button>
              <button
          id="score-7"
          value={7}
          onClick={(e) => setScore(7)}
        >7
      </button>
              <button
          id="score-8"
          value={8}
          onClick={(e) => setScore(8)}
        >8
      </button>
              <button
          id="score-9"
          value={9}
          onClick={(e) => setScore(9)}
        >9
      </button>
              <button
          id="score-10"
          value={10}
          onClick={(e) => setScore(10)}
        >10
      </button>
     </div>

{/*
      <div>
        <label htmlFor="score">Score</label>
        <input
          id="score"
          type="int"
          value={score || ''}
          onChange={(e) => setScore(e.target.value)}
        />
      </div>*/}

      <div>
 
          <button
          className="button primary block"
          onClick={() => addScore({score})}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'ADD SCORE'}
        </button>
      </div>

    </div>
  )
}

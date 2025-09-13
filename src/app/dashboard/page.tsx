'use client'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
const supabase = createClient(supabaseUrl, supabaseAnonKey)
import { useEffect, useState } from 'react'

// ...existing code...
interface Producto {
  id: number
  nombre: string
  // agrega otras propiedades según tu tabla
}

export default function Home() {
  const [data, setData] = useState<Producto[]>([])

  useEffect(() => {
    const fetchData = async () => {
      let { data: productos, error } = await supabase
        .from('products')
        .select('*')

      if (error) console.error(error)
      else setData(productos ?? [])
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Lista de productos</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

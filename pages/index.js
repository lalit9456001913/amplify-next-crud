import { useEffect } from 'react'
import { getAuth } from '../services/identity.service'
import { useRouter } from 'next/navigation'

export default function Index() {
  const auth=getAuth();
  const router=useRouter();
  useEffect(()=>{
    if(auth?.token){
      router.push('/dashboard')
    }else{
      router.push('/login')
    }
  },[])
  return (
    <></>
  )
}

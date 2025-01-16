'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    async function redirectToNewChat() {
      router.replace('/chat/ ');
    }
    redirectToNewChat();
  }, [router]);

  return <div>Redirecting to a new chat...</div>;
}

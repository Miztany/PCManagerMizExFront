import { headers } from 'next/headers';
import { redirect } from 'next/navigation';


export default function Home() {

  const userAgent = headers().get('user-agent');
  const isMobile = /mobile/i.test(userAgent);

  if (isMobile) redirect('/mobile');
  return redirect('/desktop');
  }

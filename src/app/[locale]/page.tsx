import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

export default async function Home(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;

  const session = await getServerSession(authOptions);

  if (!session) {
    // Redirect unauthenticated users to sign-in
    redirect(`/${params.locale}/signin`);
  } else {
    // Redirect authenticated users to dashboard
    redirect('/dashboard');
  }
  return null;
}

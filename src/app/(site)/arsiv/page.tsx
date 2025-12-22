import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Arşiv | Mazhar Dergisi',
  description: 'Mazhar Dergisi sayı arşivi.',
};

export default function ArsivPage() {
  // Redirect to the existing sayilar (issues) page
  redirect('/sayilar');
}

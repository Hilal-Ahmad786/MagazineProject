import { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Yazar Başvurusu | Mazhar Dergisi',
  description: 'Mazhar Dergisi yazar başvuru formu.',
};

export default function YazarBasvurusuPage() {
  // Redirect to the existing yazar-ol page
  redirect('/yazar-ol');
}

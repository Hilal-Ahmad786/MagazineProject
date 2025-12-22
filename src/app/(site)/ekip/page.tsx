import { TeamList } from '@/components/team/TeamList';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ekip | Mazhar Dergisi',
    description: 'Mazhar Dergisi ekibi ve yazarları.',
};

export default function TeamPage() {
    return (
        <main className="min-h-screen pt-32 pb-20 bg-neutral-950">
            <div className="container mx-auto px-6 text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tight">
                    DERGİMİZ <span className="text-amber-500">KÜNYE</span>
                </h1>
                <p className="text-lg text-neutral-400 max-w-2xl mx-auto">
                    Mazhar Dergisi&apos;nin hazırlanmasında emeği geçen ekip arkadaşlarımız ve yazarlarımız.
                </p>
            </div>

            <TeamList />
        </main>
    );
}

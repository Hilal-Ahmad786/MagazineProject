import Link from 'next/link';
import { getAllAuthors } from '@/lib/data/authors';
import { Author } from '@/types';

// Data from the image
const KUNYE = {
    Sekreterya: ['Furkan Ahmet Aydın'],
    Operasyon: ['Mehmet Oktay Yetiş'],
    Tasarım: ['Eren Salih Aksu'],
    'Sosyal Medya': ['Eren Salih Aksu', 'Furkan Ahmet Aydın'],
    Tashih: ['Mehmet Oktay Yetiş'],
};

const YAZARLAR = [
    'Ahmet Talha Çamcı',
    'Eren Salih Aksu',
    'Furkan Ahmet Aydın',
    'Muhammed Kürşat Çolak',
    'Mücahit Pehlivan',
    'Mehmet Oktay Yetiş',
    'Seyyid Ali Ayaz',
];

export async function TeamList() {
    const allAuthors = await getAllAuthors();

    // Helper to find author by name
    const findAuthor = (name: string) => allAuthors.find(a => a.name === name);

    const renderPerson = (name: string) => {
        const author = findAuthor(name);
        return (
            <div key={name} className="flex flex-col items-center gap-3 group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-amber-500 transition-colors bg-neutral-800">
                    <img
                        src={author?.avatar || '/images/avatars/default.png'}
                        alt={name}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-center">
                    <h4 className="font-bold text-white group-hover:text-amber-500 transition-colors">
                        {author ? (
                            <Link href={`/yazarlar/${author.slug}`}>{name}</Link>
                        ) : (
                            name
                        )}
                    </h4>
                </div>
            </div>
        );
    };

    return (
        <section className="py-20 space-y-20">

            {/* Management / Core Team */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto px-6">
                {Object.entries(KUNYE).map(([role, names]) => (
                    <div key={role} className="flex flex-col items-center space-y-6">
                        <h3 className="text-xl font-bold text-amber-500 uppercase tracking-widest border-b border-amber-500/30 pb-2 mb-4">
                            {role}
                        </h3>
                        <div className="flex flex-col gap-8">
                            {names.map(name => renderPerson(name))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Horizontal Divider */}
            <div className="max-w-4xl mx-auto w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Writers Section */}
            <div className="max-w-6xl mx-auto px-6">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 uppercase tracking-widest text-white">
                    Yazarlarımız
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {YAZARLAR.map(name => renderPerson(name))}
                </div>
            </div>
        </section>
    );
}

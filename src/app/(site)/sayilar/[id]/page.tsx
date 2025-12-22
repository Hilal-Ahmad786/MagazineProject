import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Download, BookOpen, Calendar, FileText, Users } from 'lucide-react';
import { getAllIssues } from '@/lib/data/issues';
import { getAllArticles } from '@/lib/data/articles';
import { TableOfContents } from '@/components/issues/TableOfContents';
import { IssueCard } from '@/components/issues/IssueCard';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { ShareButtons } from '@/components/share/ShareButtons';

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const issues = await getAllIssues();
  const issue = issues.find((i) => i.id === params.id || i.number.toString() === params.id);

  if (!issue) {
    return {
      title: 'Sayı Bulunamadı | Mazhar Dergisi',
    };
  }

  return {
    title: `${issue.title} | Sayı ${issue.number} | Mazhar Dergisi`,
    description: issue.editorsNote || `Mazhar Dergisi ${issue.number}. sayı - ${issue.theme}`,
    openGraph: {
      title: `${issue.title} | Sayı ${issue.number}`,
      description: issue.editorsNote || `Mazhar Dergisi ${issue.number}. sayı`,
      images: [issue.coverImage],
    },
  };
}

export async function generateStaticParams() {
  try {
    const issues = await getAllIssues();
    return issues.map((issue) => ({
      id: issue.id,
    }));
  } catch (error) {
    console.warn('Failed to generate static params for issues:', error);
    return [];
  }
}

export default async function IssueDetailPage({ params }: Props) {
  const issues = await getAllIssues();
  const articles = await getAllArticles();

  const issue = issues.find((i) => i.id === params.id || i.number.toString() === params.id);

  if (!issue) {
    notFound();
  }

  // Get articles for this issue
  const issueArticles = articles.filter((article) => article.issueId === issue.id);

  // Get other issues for "Diğer Sayılar" section
  const otherIssues = issues
    .filter((i) => i.id !== issue.id)
    .sort((a, b) => b.number - a.number)
    .slice(0, 3);

  const breadcrumbItems = [
    { label: 'Ana Sayfa', href: '/' },
    { label: 'Sayılar', href: '/sayilar' },
    { label: `Sayı ${issue.number}`, href: `/sayilar/${issue.id}` },
  ];

  const formattedDate = new Date(issue.date).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
  });

  return (
    <main className="min-h-screen bg-neutral-950">
      {/* Breadcrumb */}
      <div className="border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4">
          <Breadcrumb items={breadcrumbItems} />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Cover Image */}
            <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 lg:sticky lg:top-24">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-2xl" />
              <Image
                src={issue.coverImage}
                alt={`Sayı ${issue.number} Kapak`}
                fill
                className="object-cover rounded-2xl shadow-2xl"
                priority
              />
              {issue.featured && (
                <div className="absolute top-4 left-4 bg-yellow-500 text-neutral-900 px-3 py-1 rounded-full text-sm font-bold">
                  Güncel Sayı
                </div>
              )}
            </div>

            {/* Issue Info */}
            <div className="space-y-8">
              {/* Back Link */}
              <Link
                href="/sayilar"
                className="inline-flex items-center gap-2 text-neutral-400 hover:text-yellow-500 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Tüm Sayılar</span>
              </Link>

              {/* Issue Number & Theme */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-yellow-500 font-bold text-lg">
                    Sayı {issue.number}
                  </span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-400 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formattedDate}
                  </span>
                </div>

                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                  {issue.title}
                </h1>

                {issue.theme && (
                  <p className="text-xl text-neutral-400">
                    Tema: <span className="text-yellow-500">{issue.theme}</span>
                  </p>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 text-neutral-400">
                  <FileText className="w-5 h-5 text-yellow-500" />
                  <span>{issueArticles.length} Yazı</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Users className="w-5 h-5 text-yellow-500" />
                  <span>
                    {new Set(issueArticles.map((a) => a.author?.id).filter(Boolean)).size} Yazar
                  </span>
                </div>
              </div>

              {/* Editor's Note */}
              {issue.editorsNote && (
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-3">
                    Editörün Notu
                  </h3>
                  <p className="text-neutral-300 leading-relaxed">
                    {issue.editorsNote}
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {issue.pdfUrl && (
                  <>
                    <Link
                      href={`/oku/${issue.id}`}
                      className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-900 font-bold px-6 py-3 rounded-lg transition-colors"
                    >
                      <BookOpen className="w-5 h-5" />
                      Çevrimiçi Oku
                    </Link>
                    <a
                      href={issue.pdfUrl}
                      download
                      className="inline-flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 text-white font-bold px-6 py-3 rounded-lg transition-colors border border-neutral-700"
                    >
                      <Download className="w-5 h-5" />
                      PDF İndir
                    </a>
                  </>
                )}
              </div>

              {/* Share */}
              <div className="pt-4 border-t border-neutral-800">
                <p className="text-sm text-neutral-500 mb-3">Bu sayıyı paylaş</p>
                <ShareButtons
                  url={`/sayilar/${issue.id}`}
                  title={`${issue.title} - Sayı ${issue.number}`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      {issueArticles.length > 0 && (
        <section className="py-16 bg-neutral-900/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-white mb-8">
              İçindekiler
            </h2>
            <TableOfContents articles={issueArticles} issueNumber={issue.number} />
          </div>
        </section>
      )}

      {/* Other Issues */}
      {otherIssues.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">
                Diğer Sayılar
              </h2>
              <Link
                href="/sayilar"
                className="text-yellow-500 hover:text-yellow-400 transition-colors"
              >
                Tümünü Gör →
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherIssues.map((otherIssue) => (
                <IssueCard key={otherIssue.id} issue={otherIssue} variant="compact" />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

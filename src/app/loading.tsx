export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-yellow-400 font-bold uppercase tracking-widest text-sm">
          Yükleniyor...
        </p>
      </div>
    </div>
  )
}

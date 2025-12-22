import { Category } from '@/types'
import { cn } from '@/lib/utils/cn'

interface ArticleFiltersProps {
  categories: Category[]
  selectedCategory: string | null
  onCategoryChange: (categoryId: string | null) => void
}

export function ArticleFilters({ categories, selectedCategory, onCategoryChange }: ArticleFiltersProps) {
  return (
    <div className="mb-12">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onCategoryChange(null)}
          className={cn(
            'px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300',
            selectedCategory === null
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
          )}
        >
          Tümü
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              'px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-all duration-300',
              selectedCategory === category.id
                ? 'bg-yellow-400 text-black'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  )
}

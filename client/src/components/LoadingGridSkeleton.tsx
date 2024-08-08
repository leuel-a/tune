import MusicCardSkeleton from './MusicCardSkeleton'

export default function LoadingGridSkeleton() {
  return Array.from({ length: 12 }).map((_, index) => <MusicCardSkeleton key={index} />)
}

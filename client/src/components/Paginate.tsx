import Button from '../components/Button'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'
import { PaginateContainer } from './styles/Paginate.styled'
import { Flex } from './styles/ui/Flex.styled'
import { theme } from '../main'

interface PaginateProps {
  page: number
  limit: number
  total: number
  next: () => void
  previous: () => void
}

export default function Paginate({ page, limit, total, next, previous }: PaginateProps) {
  const lastPage = Math.ceil(total / limit)

  return (
    <PaginateContainer>
      <Flex gap={10}>
        {page !== 1 && (
          <Button onClick={previous} bgColor={theme.colors.secondary}>
            <FaChevronLeft />
          </Button>
        )}
        {page !== lastPage && (
          <Button disabled={page === lastPage} onClick={next} bgColor={theme.colors.secondary}>
            <FaChevronRight />
          </Button>
        )}
      </Flex>
    </PaginateContainer>
  )
}

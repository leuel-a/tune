import styled from 'styled-components'

export const GenreList = styled.ul`
  display: flex;
  gap: 10px;
  list-style: none;
  padding: 0;
  margin: 0;
`

export const GenreListItem = styled.li<{ $selected?: boolean }>`
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  /* color: ${({ theme }) => theme.colors.secondary}; */
  padding: 5px 10px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  border-radius: 5px;
  transition: background-color 0.3s;
  background-color: ${({ $selected, theme }) => ($selected ? theme.colors.secondary : '')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }
`

import styled from 'styled-components'

export const TableContainer = styled.div`
  overflow-x: scroll;
  overflow-y: scroll;
  height: 90%;
  padding: 0.5rem 0;
`

export const Table = styled.table`
  table {
    height: 100%;
    width: 100%;
  }

  th,
  td {
    padding: 0.5rem 0.5rem;
  }

  th {
    text-align: start;
  }

  tr th:last-child,
  tr td:last-child {
    text-align: center;
  }

  tr:nth-of-type(2n) {
    background-color: hsl(206 19% 41% / .2);
    /* background-color: ${({ theme }) => theme.colors.secondary}; */
    /* background: hsl(206 55% 11% / 1);  */
  }
`

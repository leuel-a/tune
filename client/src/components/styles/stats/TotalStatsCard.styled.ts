import styled from "styled-components";

export const TotalStatsContainer = styled.div`
  display: grid;
  margin-top: 30px;
  grid-template-columns: 75% 25%;
  grid-template-rows: repeat(4, 40px);

  h4 {
    font-weight: 500;
  }

  p {
    font-weight: 500;
    font-size: 1.1rem;
  }
`
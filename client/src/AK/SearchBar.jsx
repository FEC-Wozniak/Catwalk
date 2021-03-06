import React from 'react';
import styled from 'styled-components';

const SearchInput = styled.input`
width: 90%;
margin: auto;
height: 50px;
font-size: 20px;
}
`

const SearchBar = ({handleSearch}) => {
  return (
    <SearchInput placeholder="Have a question? Search for answers" onChange={handleSearch}></SearchInput>
  )
}

export default SearchBar
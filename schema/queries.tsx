import { gql } from '@apollo/client';

export const GET_BOOKS = gql`
query MyQuery {
  book_book {
    authorId
    id
    name
    publishingDate
    author {
      name
    }
  }
  book_book_aggregate {
    aggregate {
      count
    }
  }
}

`;
export const GET_AUTHORS = gql`query MyQuery {
  author_author {
    Age
    created_at
    dateOfBirth
    hometown
    id
    name
    hasPublishedBooks
    getAllBookIdFromAuthorId
  }
}
`;
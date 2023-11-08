import { gql, useQuery } from '@apollo/client';

const GetFaqs = gql`
  query GetFaqs {
    faqs {
      id
      question
      answer
    }
  }
`;

export function useGetAllFaqs() {
  return useQuery(GetFaqs);
}
export default useGetAllFaqs;

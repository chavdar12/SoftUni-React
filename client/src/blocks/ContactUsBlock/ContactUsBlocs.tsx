import { useGetAllFaqs } from '#hooks';

export function ContactUsBlocs() {
  const { data, error, loading } = useGetAllFaqs();

  return (
    <div>
      {data?.faqs.map((faq: any) => {
        return (
          <div key={faq.id}>
            <h1>{faq.question}</h1>
            <p>{faq.answer}</p>
          </div>
        );
      })}
    </div>
  );
}
export default ContactUsBlocs;

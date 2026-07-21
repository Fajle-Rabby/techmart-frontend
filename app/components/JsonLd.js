/**
 * JSON-LD Schema কম্পোনেন্ট
 * Google Rich Results এর জন্য structured data যোগ করে
 */
export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

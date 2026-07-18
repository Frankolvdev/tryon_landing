type JsonLdValue = Record<string, unknown> | Record<string, unknown>[];

type StructuredDataProps = {
  data: JsonLdValue;
};

export function StructuredData({ data }: StructuredDataProps) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}

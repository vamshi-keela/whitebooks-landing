import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  schema: object;
}

/** Injects a JSON-LD <script> block into <head> via react-helmet-async. */
export function StructuredData({ schema }: StructuredDataProps) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema, null, 0)}
      </script>
    </Helmet>
  );
}

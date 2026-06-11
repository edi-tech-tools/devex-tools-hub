import { useEffect } from 'react';
import { organizationSchema } from '@/lib/schema';

interface JsonLdProps {
  siteName?: string;
  siteUrl?: string;
  description?: string;
}

export default function JsonLd({
  siteName = 'Isle Works DevEx',
  siteUrl = 'https://devex-tools.net',
  description = 'Developer tool reviews and comparisons curated by the Isle Works engineering team in Stuttgart.',
}: JsonLdProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(
      organizationSchema(siteName, siteUrl, description)
    );
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [siteName, siteUrl, description]);

  return null;
}

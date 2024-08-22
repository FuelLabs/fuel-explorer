import Script from 'next/script';

export function SafaryScript() {
  if (!process.env.NEXT_PUBLIC_SAFARY_ID) return null;
  return (
    <Script
      data-product-id={process.env.NEXT_PUBLIC_SAFARY_ID}
      data-name="safary-sdk"
      async
      src="/thirdparty/safary.js"
    />
  );
}

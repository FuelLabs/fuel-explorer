export function SafaryScript() {
  if (!import.meta.env.VITE_SAFARY_ID) return null;
  return (
    <script
      data-product-id={import.meta.env.VITE_SAFARY_ID}
      data-name="safary-sdk"
      async
      src="/thirdparty/safary.js"
    />
  );
}

export const useRouter = () => ({
  push: (href: string) => {
    // Mock push function
    console.log(`Mock push to ${href}`);
  },
  replace: (href: string) => {
    // Mock replace function
    console.log(`Mock replace to ${href}`);
  },
  back: () => {
    // Mock back function
    console.log('Mock back');
  },
  forward: () => {
    // Mock forward function
    console.log('Mock forward');
  },
});

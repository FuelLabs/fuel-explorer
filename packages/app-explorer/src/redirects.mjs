export const redirects = [
  {
    source: '/tx/:id',
    destination: '/tx/:id/simple',
    permanent: false,
  },
  {
    source: '/block/:id',
    destination: '/block/:id/simple',
    permanent: false,
  },
  {
    source: '/contract/:id',
    destination: '/contract/:id/assets',
    permanent: false,
  },
  {
    source: '/account/:id',
    destination: '/account/:id/assets',
    permanent: false,
  },
];

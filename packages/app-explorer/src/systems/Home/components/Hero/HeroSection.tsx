import { useLocation } from 'react-router-dom';
import Hero from '~/systems/Home/components/Hero/Hero';

export default function HeroSection() {
  const { pathname } = useLocation();
  const isHomePage = pathname === '/';

  if (!isHomePage) {
    return null;
  }

  return <Hero />;
}

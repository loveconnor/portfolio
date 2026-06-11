/* eslint-disable react/jsx-props-no-spreading */
import Hero from '@src/pages/about/components/hero/Hero';
import Overview from '@src/pages/about/components/overview/Overview';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import CustomHead from '@src/components/dom/CustomHead';
import SeoContent from '@src/pages/components/seo/Index';

const seo = {
  title: 'About Connor Love | Creative Developer & Frontend Engineer',
  description: 'Learn about Connor Love, a Columbus-based creative developer building fast websites, web applications, and product interfaces for local and remote teams worldwide.',
  keywords: [
    'Connor Love',
    'About Connor Love',
    'Creative Developer',
    'Creative Development',
    'Frontend Engineer',
    'Remote Frontend Developer',
    'Website Development',
    'Product Interface Development',
    'React Developer',
    'Next.js Developer',
    'Columbus Ohio',
    'Worldwide Web Developer',
  ],
};
function Page() {
  return (
    <>
      <CustomHead {...seo} pageType="about" />

      <Hero />
      <Overview />
      <Services />
      <Process />
      <SeoContent variant="about" />
    </>
  );
}

export default Page;

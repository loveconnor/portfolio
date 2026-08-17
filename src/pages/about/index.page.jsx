/* eslint-disable react/jsx-props-no-spreading */
import Hero from '@src/pages/about/components/hero/Hero';
import Overview from '@src/pages/about/components/overview/Overview';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import CustomHead from '@src/components/dom/CustomHead';
import SeoContent from '@src/pages/components/seo/Index';

const seo = {
  title: 'About Connor Love | Ohio Web Developer & Frontend Engineer',
  description: 'Learn about Connor Love, a Columbus-based Ohio web developer building fast websites, web applications, and product interfaces for local Ohio and remote teams.',
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

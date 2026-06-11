/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Quote from '@src/pages/components/quote/Index';
import Projects from '@src/pages/components/projects/Index';
import Clients from '@src/pages/components/clients/Index';
import CustomHead from '@src/components/dom/CustomHead';
import SeoContent from '@src/pages/components/seo/Index';

const seo = {
  title: 'Creative Developer for Websites & Product Interfaces | Connor Love',
  description: 'Connor Love is a Columbus, Ohio creative developer building custom websites, web apps, interactive interfaces, and AI product experiences for clients worldwide.',
  keywords: [
    'Connor Love',
    'Creative Developer',
    'Creative Developer Columbus Ohio',
    'Remote Creative Developer',
    'Global Creative Developer',
    'Creative Development',
    'Frontend Developer',
    'Frontend Engineer',
    'React Developer',
    'Next.js Developer',
    'Product Interface Developer',
    'AI Product Interfaces',
    'Website Development Columbus Ohio',
    'Web Applications',
    'Interactive Websites',
    'Freelance Frontend Developer',
    'Columbus Ohio',
    'Worldwide Web Developer',
  ],
};

function Page() {
  return (
    <>
      <CustomHead {...seo} pageType="home" />
      <Home />
      <About />
      <Clients />
      <SeoContent />
      <Quote />
      <Projects />
    </>
  );
}

export default Page;

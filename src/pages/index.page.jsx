/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Quote from '@src/pages/components/quote/Index';
import Projects from '@src/pages/components/projects/Index';
import Clients from '@src/pages/components/clients/Index';
import CustomHead from '@src/components/dom/CustomHead';
import SeoContent from '@src/pages/components/seo/Index';

const seo = {
  title: 'Ohio Web Developer for Websites & Web Apps | Connor Love',
  description: 'Connor Love is a Columbus, Ohio web developer building custom websites, web apps, interactive interfaces, and AI product experiences for businesses across Ohio and remote teams.',
  keywords: [
    'Connor Love',
    'Web Developer',
    'Web Developer Ohio',
    'Ohio Web Developer',
    'Web Developer Columbus Ohio',
    'Web Developers Columbus Ohio',
    'Web Development Ohio',
    'Ohio Web Development',
    'Website Developer Ohio',
    'Website Design and Development Ohio',
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
    'Website Development Ohio',
    'Web Applications',
    'Interactive Websites',
    'Freelance Frontend Developer',
    'Freelance Web Developer Ohio',
    'Columbus Ohio',
    'Cleveland Ohio Web Developer',
    'Cincinnati Ohio Web Developer',
    'Dayton Ohio Web Developer',
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

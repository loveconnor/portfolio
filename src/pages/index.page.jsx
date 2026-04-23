/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Quote from '@src/pages/components/quote/Index';
import Projects from '@src/pages/components/projects/Index';
import Clients from '@src/pages/components/clients/Index';
import CustomHead from '@src/components/dom/CustomHead';
import SeoContent from '@src/pages/components/seo/Index';

const seo = {
  title: 'Creative Developer in Columbus, Ohio | Connor Love',
  description:
    'Connor Love is a creative developer in Columbus, Ohio building custom websites, web apps, and interactive digital experiences for brands and clients across Columbus, Ohio, and Northeast Ohio.',
  keywords: [
    'Connor Love',
    'Portfolio',
    'Creative Developer',
    'Creative Developer Columbus Ohio',
    'Creative Developer Ohio',
    'Creative Development',
    'Frontend Developer',
    'Frontend Engineer',
    'Web Development',
    'Website Development',
    'Website Development Columbus Ohio',
    'Website Developer Columbus Ohio',
    'React Developer',
    'Developer',
    'Web Applications',
    'Responsive Design',
    'Progressive Web Apps',
    'Freelance Developer',
    'Modern Web Development',
    'Cross-Platform Development',
    'Ohio Web Developer',
    'Columbus Ohio',
    'Columbus Ohio Developer',
    'Columbus Creative Developer',
    'Ohio',
    'Northeast Ohio',
    'Northeast Ohio Developer',
    'JavaScript',
    'Typescript',
    'Next.js',
    'React',
    'React Native',
    'Electron js',
    'HTML',
    'CSS',
  ],
};

function Page() {
  return (
    <>
      <CustomHead {...seo} />
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

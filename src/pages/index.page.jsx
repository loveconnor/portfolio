/* eslint-disable react/jsx-props-no-spreading */
import Home from '@src/pages/components/home/Index';
import About from '@src/pages/components/about/Index';
import Quote from '@src/pages/components/quote/Index';
import Projects from '@src/pages/components/projects/Index';
import Clients from '@src/pages/components/clients/Index';
import CustomHead from '@src/components/dom/CustomHead';
import SeoContent from '@src/pages/components/seo/Index';

const seo = {
  title: 'Connor Love | Freelance Web Developer in Columbus, OH',
  description: 'Connor Love is a freelance web developer in Columbus, Ohio, designing and building custom websites, web apps, and interactive product experiences.',
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

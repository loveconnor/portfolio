/* eslint-disable react/jsx-props-no-spreading */
import Hero from '@src/pages/about/components/hero/Hero';
import Overview from '@src/pages/about/components/overview/Overview';
import Services from '@src/pages/about/components/services/Services';
import Process from '@src/pages/about/components/process/Process';
import CustomHead from '@src/components/dom/CustomHead';

const seo = {
  title: 'Connor Love - About',
  description: 'Learn about Connor Love, a creative developer from Columbus, Ohio, focused on creative development, website development, and polished digital experiences across Ohio and Northeast Ohio.',
  keywords: [
    'Connor Love',
    'About Connor Love',
    'About me',
    'Creative Developer',
    'Creative Development',
    'Frontend Developer Journey',
    'Web Developer Story',
    'Professional Web Development',
    'Website Development',
    'Frontend Development Expertise',
    'Web Design Skills',
    'Web Development Services',
    'Web Design Expertise',
    'Developer Profile',
    'Quality Web Solutions',
    'Columbus Ohio',
    'Ohio',
    'Northeast Ohio',
    'Ohio State',
  ],
};
function Page() {
  return (
    <>
      <CustomHead {...seo} />

      <Hero />
      <Overview />
      <Services />
      <Process />
    </>
  );
}

export default Page;

import Hero from '@/components/hero/Hero';
import ContentSlider from '@/components/hero/ContentSlider';
import Services from '@/components/services/Services';
import TeamShowcase from '@/components/team/TeamShowcase';
import WhyChooseUs from '@/components/services/WhyChooseUs';

export default function Home() {
  return (
    <>
      <Hero />
      <ContentSlider />
      <Services />
      <TeamShowcase />
      <WhyChooseUs />
    </>
  );
}

import HeroSection from '../components/home/HeroSection';
import DestinationCards from '../components/home/DestinationCards';
import FeaturedDestinations from '../components/home/FeaturedDestinations';
import TrendingPlaces from '../components/home/TrendingPlaces';
import CategoriesGrid from '../components/home/CategoriesGrid';
import Stats from '../components/home/Stats';
import BlogPreview from '../components/home/BlogPreview';
import EventsSection from '../components/home/EventsSection';

export default function Home() {
  return (
    <>
      <HeroSection />
      <DestinationCards />
      <Stats />
      <FeaturedDestinations />
      <CategoriesGrid />
      <TrendingPlaces />
      <BlogPreview />
      <EventsSection />
    </>
  );
}

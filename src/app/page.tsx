import Hero from '@/components/Hero'
import FeaturedBooks from '@/components/FeaturedBooks'
import RecentReviews from '@/components/RecentReviews'
import CallToAction from '@/components/CallToAction'

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedBooks />
      <RecentReviews />
      <CallToAction />
    </div>
  )
}

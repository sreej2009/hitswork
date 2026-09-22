import { useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/navigation/Navbar'
import { Footer } from './components/navigation/Footer'
import { CommandSearch } from './components/navigation/CommandSearch'
import { Home } from './pages/Home/Home'
import { Explore } from './pages/Explore/Explore'
import { ComingSoon } from './pages/ComingSoon'
import { useDeviceCapability } from './hooks/useDeviceCapability'
import { useSmoothScroll } from './hooks/useSmoothScroll'

function App() {
  const [searchOpen, setSearchOpen] = useState(false)
  const { reducedMotion } = useDeviceCapability()
  const location = useLocation()
  useSmoothScroll(!reducedMotion)

  return (
    <div className="min-h-screen bg-void">
      <Navbar onSearchOpen={() => setSearchOpen(true)} />
      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />

      <main key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route
            path="/courses/:slug"
            element={<ComingSoon title="Course details are on their way" description="The full immersive course page — curriculum, instructor, reviews — is coming next." />}
          />
          <Route
            path="/learn/:courseId"
            element={<ComingSoon title="The course player is in the studio" description="A focused, professional learning environment for video, notes and progress." />}
          />
          <Route
            path="/learning-paths"
            element={<ComingSoon title="Full learning path library" description="Browse every guided path Hitswork offers, beyond the featured few on the homepage." />}
          />
          <Route
            path="/learning-paths/:slug"
            element={<ComingSoon title="Path details are on their way" description="A full milestone-by-milestone breakdown of this learning path is coming soon." />}
          />
          <Route
            path="/projects"
            element={<ComingSoon title="The Projects universe is being built" description="Real briefs, real constraints — a dedicated space to build your portfolio." />}
          />
          <Route
            path="/projects/:slug"
            element={<ComingSoon title="Project details are on their way" description="Difficulty, technologies, and progress tracking for this project are coming soon." />}
          />
          <Route
            path="/dashboard"
            element={<ComingSoon title="Your Learning Command Center" description="Progress, streaks, skill maps and recommendations — your dashboard is coming next." />}
          />
          <Route
            path="/certificates"
            element={<ComingSoon title="Certificates are almost ready" description="A premium certificate experience with public verification is coming soon." />}
          />
          <Route
            path="/certificates/:id"
            element={<ComingSoon title="Certificate view coming soon" description="View, download and share your certificate once this page is live." />}
          />
          <Route
            path="/verify/:certificateId"
            element={<ComingSoon title="Certificate verification coming soon" description="Public certificate verification will live at this address." />}
          />
          <Route
            path="/instructor"
            element={<ComingSoon title="Instructor Studio is in development" description="Course creation, analytics and revenue tools for Hitswork instructors." />}
          />
          <Route
            path="/admin"
            element={<ComingSoon title="Admin console coming soon" description="Platform-wide management tools, built on the same design system." />}
          />
          <Route
            path="*"
            element={<ComingSoon title="This page doesn't exist yet" description="Let's get you back to something that does." />}
          />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App

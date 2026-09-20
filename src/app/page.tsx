"use client";

import { ThemeProvider } from "@/components/ThemeProvider";
import { I18nProvider } from "@/components/I18nProvider";
import { MotionConfig, motion, useScroll, useSpring } from "framer-motion";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import AppCatalog from "@/components/AppCatalog";
import FAQ from "@/components/FAQ";
import News from "@/components/News";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden className="scroll-progress" style={{ scaleX }} />;
}

export default function Home() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <MotionConfig reducedMotion="user">
          <div className="min-h-screen">
            <ScrollProgress />
            <Header />
            <main id="main">
              <Hero />
              <AppCatalog />
              <FAQ />
              <News />
              <About />
              <Newsletter />
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        </MotionConfig>
      </I18nProvider>
    </ThemeProvider>
  );
}

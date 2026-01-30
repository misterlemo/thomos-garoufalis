import { useEffect } from 'react';
import { LanguageProvider } from './LanguageContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './Footer';
import './index.css';

function App() {
  useEffect(() => {
    document.documentElement.lang = 'el';
  }, []);

  return (
    <LanguageProvider>
      <div className="app">
        <Navigation />
        <main>
          <Home />
          <Services />
          <WhyChooseUs />
          <Team />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;

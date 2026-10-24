import { LanguageProvider } from './LanguageContext';
import { useReveal } from './hooks';
import Header from './components/Header';
import Hero from './components/Hero';
import Practice from './components/Practice';
import Approach from './components/Approach';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

const Site = () => {
  useReveal();
  return (
    <>
      <a href="#practice" className="skip-link">
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <Practice />
        <Approach />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

const App = () => (
  <LanguageProvider>
    <Site />
  </LanguageProvider>
);

export default App;

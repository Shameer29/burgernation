import ScrollStage from "./components/Hero/ScrollStage";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import MenuSection from "./components/Menu/MenuSection";
import OrderFab from "./components/Fab/OrderFab";

function GooDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
            result="goo"
          />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

function App() {
  return (
    <div id="top" className="relative bg-char-900">
      <GooDefs />
      <div className="grain" />
      <Navbar />
      <main>
        <ScrollStage />
        <MenuSection />
      </main>
      <Footer />
      <OrderFab />
    </div>
  );
}

export default App;

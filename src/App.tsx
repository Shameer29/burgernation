import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ScrollStage from "./components/Hero/ScrollStage";
import AboutSection from "./components/Home/AboutSection";
import SignatureItems from "./components/Home/SignatureItems";
import AwardSection from "./components/Home/AwardSection";
import ProcessStrip from "./components/Home/ProcessStrip";
import Testimonials from "./components/Home/Testimonials";
import HomeCTA from "./components/Home/HomeCTA";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import MenuSection from "./components/Menu/MenuSection";
import OrderFab from "./components/Fab/OrderFab";
import { InvestmentTiers } from "./components/Franchise/InvestmentTiers";
import { SisterBrandSection } from "./components/Franchise/SisterBrandSection";
import { DiscoveryProcess } from "./components/Franchise/DiscoveryProcess";
import { LeadershipSection } from "./components/Franchise/LeadershipSection";
import { SocialProof } from "./components/Franchise/SocialProof";
import { FranchiseFAQ } from "./components/Franchise/FranchiseFAQ";
import { FranchiseModal } from "./components/Franchise/FranchiseModal";

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
  const [activeTab, setActiveTab] = useState<string>("home");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedTierForModal, setSelectedTierForModal] = useState<string>("high-street");

  const handleOpenModal = (tierId?: string) => {
    if (tierId) setSelectedTierForModal(tierId);
    setIsModalOpen(true);
  };

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="top" className="relative bg-char-900 min-h-screen text-off font-sans selection:bg-crush selection:text-black">
      <GooDefs />
      <div className="grain" />

      <Navbar
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        onOpenFranchiseModal={() => handleOpenModal()}
      />

      {/* Page Content — only the active tab renders */}
      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <ScrollStage />
              <AboutSection />
              <SignatureItems onViewMenu={() => handleTabChange("menu")} />
              <AwardSection />
              <ProcessStrip />
              <Testimonials />
              <HomeCTA onViewFranchise={() => handleTabChange("franchise-tiers")} />
            </motion.div>
          )}

          {activeTab === "menu" && (
            <motion.div
              key="menu"
              className="py-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <MenuSection />
            </motion.div>
          )}

          {activeTab === "franchise-tiers" && (
            <motion.div
              key="franchise-tiers"
              className="py-8 space-y-16"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <InvestmentTiers onOpenModal={handleOpenModal} />
              <SisterBrandSection onOpenModal={() => handleOpenModal()} />
              <DiscoveryProcess onOpenModal={() => handleOpenModal()} />
              <LeadershipSection />
            </motion.div>
          )}

          {activeTab === "reviews-social" && (
            <motion.div
              key="reviews-social"
              className="py-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <SocialProof />
            </motion.div>
          )}

          {activeTab === "faq" && (
            <motion.div
              key="faq"
              className="py-8"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <FranchiseFAQ />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer
        onSelectTab={handleTabChange}
        onOpenModal={() => handleOpenModal()}
      />

      <OrderFab />

      <FranchiseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTierId={selectedTierForModal}
      />
    </div>
  );
}

export default App;

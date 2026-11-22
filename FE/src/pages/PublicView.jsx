import React, { useState } from 'react';
import { useData } from '../context/DataContext';

import { CosmicNebula } from '../components/background/CosmicNebula';
import { StardustSparkles } from '../components/background/StardustSparkles';
import { HeaderActionRow } from '../components/header/HeaderActionRow';
import { HaloAvatar } from '../components/profile/HaloAvatar';
import { CreatorInfo } from '../components/profile/CreatorInfo';
import { LinkList } from '../components/links/LinkList';
import { ProductShowcase } from '../components/showcase/ProductShowcase';
import { ProductDetailModal } from '../components/showcase/ProductDetailModal';
import { AboutCard } from '../components/story/AboutCard';
import { Footer } from '../components/footer/Footer';
import { Toast } from '../components/common/Toast';

export const PublicView = ({ isPreview = false }) => {
  const { profile, links, products } = useData();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);

  // Filter only enabled links
  const activeLinks = links.filter((l) => l.enabled !== false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profile.name} • Link in Bio`,
          text: `Khám phá thế giới nghệ thuật thủ công của ${profile.name} ✨`,
          url: window.location.href,
        });
      } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      } catch (err) {
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      }
    }
  };

  const handleHeroClick = () => {
    const el = document.getElementById(isPreview ? 'preview-featured-products' : 'featured-products');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`bg-[#05050b] font-sans text-slate-100 flex flex-col items-center relative overflow-x-hidden selection:bg-[#ff4d6d]/40 selection:text-white ${isPreview ? 'w-full h-full min-h-0' : 'min-h-screen'}`}>
      {/* Background Nebulas & Sparkles */}
      <CosmicNebula />
      <StardustSparkles />

      {/* Mobile Shell Container */}
      <div className={`w-full max-w-[420px] flex flex-col relative z-10 px-5 pt-safe pb-8 ${isPreview ? 'min-h-full' : 'min-h-screen'}`}>
        {/* Header Actions */}
        <HeaderActionRow onShare={handleShare} />

        {/* Profile Hero Section */}
        <section className="flex flex-col items-center text-center mt-1 mb-6">
          <HaloAvatar 
            avatarSrc={profile.avatar} 
            altText={`${profile.name} Avatar`} 
          />
          <CreatorInfo
            name={profile.name}
            handle={profile.handle}
            field={profile.field}
            bio={profile.bio}
          />
        </section>

        {/* Links Stack */}
        <LinkList 
          links={activeLinks} 
          onHeroClick={handleHeroClick} 
        />

        {/* Featured Products */}
        <div id={isPreview ? 'preview-featured-products' : 'featured-products'}>
          <ProductShowcase
            products={products}
            onSelectProduct={(prod) => setSelectedProduct(prod)}
          />
        </div>

        {/* "Một chút về mình" Story */}
        <AboutCard story={profile.aboutStory} />

        {/* Footer */}
        <Footer 
          platformBadge={profile.platformBadge} 
          copyright={profile.copyright} 
        />
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        contactPhone={profile.contactPhone}
        contactZalo={profile.contactZalo}
      />

      {/* Copy Toast */}
      <Toast show={showToast} message="Đã sao chép liên kết trang! ✨" />
    </div>
  );
};

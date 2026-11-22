import React from 'react';
import { PillCapsule } from './PillCapsule';

/**
 * Links Capsule Stack List
 */
export const LinkList = ({ links, onHeroClick }) => {
  return (
    <main className="w-full flex flex-col gap-3" aria-label="Danh sách liên kết chính">
      {links.map((link) => (
        <PillCapsule 
          key={link.id} 
          link={link} 
          onHeroClick={link.isHero ? onHeroClick : undefined} 
        />
      ))}
    </main>
  );
};

import React from 'react';

/**
 * Creator Profile Information (Name, Handle, Domain, and Bio)
 */
export const CreatorInfo = ({ name, handle, field, bio }) => {
  return (
    <div className="flex flex-col items-center">
      {/* Creator Name */}
      <h1 className="font-serif text-[32px] font-bold tracking-tight text-white leading-tight drop-shadow-[0_2px_12px_rgba(201,24,74,0.4)]">
        {name}
      </h1>

      {/* Creator Handle & Discipline */}
      <p className="text-[13px] font-semibold text-purple-200/90 mt-1 tracking-wide">
        {handle} • {field}
      </p>

      {/* Creator Bio Statement */}
      <p className="text-xs text-slate-300 max-w-[310px] mt-2.5 leading-relaxed font-normal">
        {bio}
      </p>
    </div>
  );
};

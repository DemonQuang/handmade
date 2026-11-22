import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const ICON_PRESETS = [
  { id: 'play_circle', label: 'TikTok', icon: 'play_circle', color: 'text-[#ff4d6d]', border: 'border-[#ff4d6d]/50', gradient: 'from-[#c9184a]/60 via-[#7209b7]/40 to-[#0077b6]/60 hover:from-[#ff4d6d] hover:to-[#00b4d8]' },
  { id: 'videocam', label: 'YouTube', icon: 'videocam', color: 'text-[#ef4444]', border: 'border-[#ef4444]/50', gradient: 'from-[#b91c1c]/60 via-[#c9184a]/50 to-[#7209b7]/60 hover:from-[#ef4444] hover:to-[#ff4d6d]' },
  { id: 'photo_camera', label: 'Instagram', icon: 'photo_camera', color: 'text-[#f472b6]', border: 'border-[#b5179e]/50', gradient: 'from-[#7209b7]/60 via-[#b5179e]/40 to-[#c9184a]/60 hover:from-[#b5179e] hover:to-[#ff4d6d]' },
  { id: 'thumb_up', label: 'Facebook', icon: 'thumb_up', color: 'text-[#60a5fa]', border: 'border-[#0077b6]/50', gradient: 'from-[#1d3557]/60 via-[#0077b6]/50 to-[#7209b7]/60 hover:from-[#0077b6] hover:to-[#560bad]' },
  { id: 'chat', label: 'Zalo', icon: 'chat', color: 'text-[#38bdf8]', border: 'border-[#00b4d8]/50', gradient: 'from-[#00b4d8]/50 via-[#7209b7]/50 to-[#c9184a]/50 hover:from-[#00b4d8] hover:to-[#ff4d6d]' },
  { id: 'send', label: 'Telegram', icon: 'send', color: 'text-[#00b4d8]', border: 'border-[#00b4d8]/50', gradient: 'from-[#0077b6]/60 via-[#00b4d8]/40 to-[#7209b7]/60 hover:from-[#00b4d8] hover:to-[#7209b7]' },
  { id: 'shopping_bag', label: 'Shopee', icon: 'shopping_bag', color: 'text-[#fb923c]', border: 'border-[#ea580c]/50', gradient: 'from-[#ea580c]/60 via-[#c9184a]/50 to-[#7209b7]/60 hover:from-[#f97316] hover:to-[#ff4d6d]' },
  { id: 'public', label: 'Website / Blog', icon: 'public', color: 'text-[#a78bfa]', border: 'border-[#8b5cf6]/50', gradient: 'from-[#6d28d9]/60 via-[#7209b7]/50 to-[#00b4d8]/60 hover:from-[#8b5cf6] hover:to-[#00b4d8]' },
];

/**
 * Tab: Quản lý Liên kết Mạng Xã Hội (TikTok, YouTube, Facebook, Zalo, Instagram...)
 */
export const SocialLinksEditor = () => {
  const { links, addLink, updateLink, deleteLink, toggleLink, reorderLinks } = useData();

  // Modal State for adding/editing custom links
  const [editingLink, setEditingLink] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalForm, setModalForm] = useState({
    title: '',
    subtitle: '',
    url: '',
    icon: 'play_circle',
    iconColor: 'text-[#ff4d6d]',
    iconBorder: 'border-[#ff4d6d]/50',
    gradientBorder: 'from-[#c9184a]/60 via-[#7209b7]/40 to-[#0077b6]/60 hover:from-[#ff4d6d] hover:to-[#00b4d8]',
    shadow: 'shadow-[0_0_20px_rgba(201,24,74,0.25)]',
    enabled: true,
    isHero: false,
  });

  const heroLink = links.find((l) => l.isHero);
  const standardLinks = links.filter((l) => !l.isHero);

  // Helper to find specific link by key/id
  const getLinkByPlatform = (platformKey) => {
    return links.find((l) => l.id.toLowerCase().includes(platformKey.toLowerCase()) || l.title.toLowerCase().includes(platformKey.toLowerCase()));
  };

  const tiktokLink = getLinkByPlatform('tiktok');
  const youtubeLink = getLinkByPlatform('youtube');
  const instagramLink = getLinkByPlatform('instagram');
  const facebookLink = getLinkByPlatform('facebook');
  const zaloLink = getLinkByPlatform('zalo');
  const telegramLink = getLinkByPlatform('telegram');

  // Quick updater for specific platforms
  const handleQuickUpdate = (platformKey, newUrl, defaultTitle, defaultPreset) => {
    const existing = getLinkByPlatform(platformKey);
    if (existing) {
      updateLink(existing.id, { url: newUrl });
    } else if (newUrl.trim()) {
      // Create new link for platform if not exists
      addLink({
        id: platformKey,
        isHero: false,
        title: defaultTitle,
        subtitle: `Kênh chính thức ${defaultTitle}`,
        url: newUrl,
        icon: defaultPreset.icon,
        iconColor: defaultPreset.color,
        iconBorder: defaultPreset.border,
        gradientBorder: defaultPreset.gradient,
        shadow: 'shadow-[0_0_20px_rgba(201,24,74,0.25)]',
        enabled: true,
      });
    }
  };

  const openAddModal = () => {
    setEditingLink(null);
    setModalForm({
      title: '',
      subtitle: '',
      url: 'https://',
      icon: 'videocam',
      iconColor: 'text-[#ef4444]',
      iconBorder: 'border-[#ef4444]/50',
      gradientBorder: 'from-[#b91c1c]/60 via-[#c9184a]/50 to-[#7209b7]/60 hover:from-[#ef4444] hover:to-[#ff4d6d]',
      shadow: 'shadow-[0_0_20px_rgba(201,24,74,0.25)]',
      enabled: true,
      isHero: false,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (link) => {
    setEditingLink(link);
    setModalForm({ ...link });
    setIsModalOpen(true);
  };

  const handleSaveModal = (e) => {
    e.preventDefault();
    if (!modalForm.title.trim() || !modalForm.url.trim()) return;

    if (editingLink) {
      updateLink(editingLink.id, modalForm);
    } else {
      addLink(modalForm);
    }
    setIsModalOpen(false);
  };

  const moveUp = (index) => {
    if (index === 0) return;
    const all = [...links];
    const itemA = standardLinks[index];
    const itemB = standardLinks[index - 1];
    const idxA = all.findIndex((l) => l.id === itemA.id);
    const idxB = all.findIndex((l) => l.id === itemB.id);
    all[idxA] = itemB;
    all[idxB] = itemA;
    reorderLinks(all);
  };

  const moveDown = (index) => {
    if (index === standardLinks.length - 1) return;
    const all = [...links];
    const itemA = standardLinks[index];
    const itemB = standardLinks[index + 1];
    const idxA = all.findIndex((l) => l.id === itemA.id);
    const idxB = all.findIndex((l) => l.id === itemB.id);
    all[idxA] = itemB;
    all[idxB] = itemA;
    reorderLinks(all);
  };

  return (
    <div className="space-y-6">
      {/* 1. Quick Form: Direct Links for TikTok, YouTube, Instagram, Facebook, Zalo, Telegram */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#120a22]/80 border border-white/10 backdrop-blur-xl shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ff4d6d]">share</span>
            <span>Chỉnh Sửa Nhanh Các Kênh Mạng Xã Hội Chính</span>
          </h3>
          <span className="text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            Tự động lưu
          </span>
        </div>

        <p className="text-xs text-slate-400">
          Nhập đường dẫn trực tiếp cho kênh TikTok, YouTube, Instagram, Zalo... Các kênh có link sẽ tự động hiển thị dạng nút viên thuốc trên trang Bio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {/* TikTok */}
          <div className="p-3.5 rounded-xl bg-[#080512] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#ff4d6d]">play_circle</span>
                <span>Kênh TikTok</span>
              </label>
              {tiktokLink && (
                <button
                  type="button"
                  onClick={() => toggleLink(tiktokLink.id)}
                  className="text-[10px] text-slate-400 hover:text-white"
                >
                  {tiktokLink.enabled !== false ? '✅ Đang bật' : '⏸️ Đang ẩn'}
                </button>
              )}
            </div>
            <input
              type="url"
              value={tiktokLink?.url || ''}
              onChange={(e) => handleQuickUpdate('tiktok', e.target.value, 'TikTok @luna.craft', ICON_PRESETS[0])}
              placeholder="https://tiktok.com/@luna.craft"
              className="w-full px-3 py-2 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
            />
          </div>

          {/* YouTube */}
          <div className="p-3.5 rounded-xl bg-[#080512] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#ef4444]">videocam</span>
                <span>Kênh YouTube</span>
              </label>
              {youtubeLink && (
                <button
                  type="button"
                  onClick={() => toggleLink(youtubeLink.id)}
                  className="text-[10px] text-slate-400 hover:text-white"
                >
                  {youtubeLink.enabled !== false ? '✅ Đang bật' : '⏸️ Đang ẩn'}
                </button>
              )}
            </div>
            <input
              type="url"
              value={youtubeLink?.url || ''}
              onChange={(e) => handleQuickUpdate('youtube', e.target.value, 'YouTube Luna Studio', ICON_PRESETS[1])}
              placeholder="https://youtube.com/@lunahandmade"
              className="w-full px-3 py-2 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ef4444]"
            />
          </div>

          {/* Instagram */}
          <div className="p-3.5 rounded-xl bg-[#080512] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#f472b6]">photo_camera</span>
                <span>Kênh Instagram</span>
              </label>
              {instagramLink && (
                <button
                  type="button"
                  onClick={() => toggleLink(instagramLink.id)}
                  className="text-[10px] text-slate-400 hover:text-white"
                >
                  {instagramLink.enabled !== false ? '✅ Đang bật' : '⏸️ Đang ẩn'}
                </button>
              )}
            </div>
            <input
              type="url"
              value={instagramLink?.url || ''}
              onChange={(e) => handleQuickUpdate('instagram', e.target.value, 'Instagram @luna_crafts', ICON_PRESETS[2])}
              placeholder="https://instagram.com/luna_crafts"
              className="w-full px-3 py-2 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#f472b6]"
            />
          </div>

          {/* Facebook */}
          <div className="p-3.5 rounded-xl bg-[#080512] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#60a5fa]">thumb_up</span>
                <span>Fanpage Facebook</span>
              </label>
              {facebookLink && (
                <button
                  type="button"
                  onClick={() => toggleLink(facebookLink.id)}
                  className="text-[10px] text-slate-400 hover:text-white"
                >
                  {facebookLink.enabled !== false ? '✅ Đang bật' : '⏸️ Đang ẩn'}
                </button>
              )}
            </div>
            <input
              type="url"
              value={facebookLink?.url || ''}
              onChange={(e) => handleQuickUpdate('facebook', e.target.value, 'Facebook Fanpage', ICON_PRESETS[3])}
              placeholder="https://facebook.com/lunahandmade"
              className="w-full px-3 py-2 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#60a5fa]"
            />
          </div>

          {/* Zalo */}
          <div className="p-3.5 rounded-xl bg-[#080512] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#38bdf8]">chat</span>
                <span>Zalo Tư Vấn 1:1</span>
              </label>
              {zaloLink && (
                <button
                  type="button"
                  onClick={() => toggleLink(zaloLink.id)}
                  className="text-[10px] text-slate-400 hover:text-white"
                >
                  {zaloLink.enabled !== false ? '✅ Đang bật' : '⏸️ Đang ẩn'}
                </button>
              )}
            </div>
            <input
              type="text"
              value={zaloLink?.url || ''}
              onChange={(e) => handleQuickUpdate('zalo', e.target.value, 'Zalo Tư Vấn 1:1', ICON_PRESETS[4])}
              placeholder="https://zalo.me/0908123456 hoặc tel:0908123456"
              className="w-full px-3 py-2 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#38bdf8]"
            />
          </div>

          {/* Telegram */}
          <div className="p-3.5 rounded-xl bg-[#080512] border border-white/10 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[17px] text-[#00b4d8]">send</span>
                <span>Kênh Telegram VIP</span>
              </label>
              {telegramLink && (
                <button
                  type="button"
                  onClick={() => toggleLink(telegramLink.id)}
                  className="text-[10px] text-slate-400 hover:text-white"
                >
                  {telegramLink.enabled !== false ? '✅ Đang bật' : '⏸️ Đang ẩn'}
                </button>
              )}
            </div>
            <input
              type="url"
              value={telegramLink?.url || ''}
              onChange={(e) => handleQuickUpdate('telegram', e.target.value, 'Telegram VIP Studio', ICON_PRESETS[5])}
              placeholder="https://t.me/lunahandmade"
              className="w-full px-3 py-2 rounded-lg bg-[#120a22] border border-white/15 text-white text-xs focus:outline-none focus:border-[#00b4d8]"
            />
          </div>
        </div>
      </div>

      {/* 2. Hero Storefront CTA Configuration */}
      {heroLink && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-[#120a22] to-[#1c0f33] border border-[#ff4d6d]/30 backdrop-blur-xl shadow-[0_0_25px_rgba(201,24,74,0.25)]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-[19px] text-[#ff4d6d]">shopping_bag</span>
              <span>Nút Cửa Hàng Nổi Bật (Hero Storefront)</span>
            </h3>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ff4d6d] text-white">
              Nút đầu trang
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Tiêu đề nút chính</label>
              <input
                type="text"
                value={heroLink.title}
                onChange={(e) => updateLink(heroLink.id, { title: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Dòng nhắc ưu đãi (Subtitle)</label>
              <input
                type="text"
                value={heroLink.subtitle || ''}
                onChange={(e) => updateLink(heroLink.id, { subtitle: e.target.value })}
                className="w-full px-3.5 py-2 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={heroLink.url}
                onChange={(e) => updateLink(heroLink.id, { url: e.target.value })}
                className="px-3.5 py-1.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs w-48 sm:w-64 focus:outline-none focus:border-[#ff4d6d]"
                placeholder="#featured-products"
              />
              <span className="text-[11px] text-slate-400">Đích đến cuộn</span>
            </div>

            <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs font-medium text-slate-300">
              <input
                type="checkbox"
                checked={heroLink.badgePing !== false}
                onChange={(e) => updateLink(heroLink.id, { badgePing: e.target.checked })}
                className="w-4 h-4 rounded text-[#ff4d6d] bg-black border-white/20 focus:ring-0"
              />
              <span>Chớp sáng Live Ping</span>
            </label>
          </div>
        </div>
      )}

      {/* 3. All Links Management (Add custom link, reorder, delete) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-[19px] text-[#00b4d8]">list</span>
              <span>Toàn Bộ Nút Liên Kết & Thứ Tự ({standardLinks.length})</span>
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Bấm mũi tên ▲/▼ để đổi vị trí hiển thị, hoặc bấm "Thêm liên kết mới" để thêm Shopee, Website riêng
            </p>
          </div>

          <button
            type="button"
            onClick={openAddModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#ff4d6d] to-[#7209b7] hover:opacity-95 text-white text-xs font-bold shadow-[0_0_15px_rgba(201,24,74,0.4)] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[17px]">add_link</span>
            <span>Thêm Liên Kết Khác</span>
          </button>
        </div>

        {/* Links List */}
        <div className="space-y-2.5">
          {standardLinks.map((link, index) => (
            <div
              key={link.id}
              className={`p-3.5 rounded-2xl bg-[#120a22]/80 border transition-all flex items-center justify-between gap-3 ${
                link.enabled !== false
                  ? 'border-white/10 shadow-[0_0_15px_rgba(114,9,183,0.15)]'
                  : 'border-white/5 opacity-50 bg-[#080512]/50'
              }`}
            >
              {/* Left Icon & Info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                    className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 disabled:opacity-20 text-[13px]"
                    title="Di chuyển lên"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(index)}
                    disabled={index === standardLinks.length - 1}
                    className="w-5 h-5 rounded hover:bg-white/10 flex items-center justify-center text-slate-400 disabled:opacity-20 text-[13px]"
                    title="Di chuyển xuống"
                  >
                    ▼
                  </button>
                </div>

                <div className={`w-10 h-10 rounded-full bg-[#080512] border ${link.iconBorder || 'border-white/15'} flex items-center justify-center shrink-0 ${link.iconColor || 'text-white'}`}>
                  <span className="material-symbols-outlined text-[20px]">{link.icon}</span>
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white truncate block">
                      {link.title}
                    </span>
                    {link.enabled === false && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] bg-red-900/40 text-red-300 border border-red-500/30">
                        Đã ẩn
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 truncate block">
                    {link.url}
                  </span>
                </div>
              </div>

              {/* Right Action buttons */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => toggleLink(link.id)}
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-colors ${
                    link.enabled !== false
                      ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                      : 'bg-white/10 text-slate-400 hover:bg-white/20'
                  }`}
                  title={link.enabled !== false ? 'Bấm để ẩn' : 'Bấm để hiển thị'}
                >
                  <span className="material-symbols-outlined text-[17px]">
                    {link.enabled !== false ? 'visibility' : 'visibility_off'}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => openEditModal(link)}
                  className="w-8 h-8 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 text-purple-300 flex items-center justify-center transition-colors"
                  title="Sửa"
                >
                  <span className="material-symbols-outlined text-[17px]">edit</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Bạn có chắc muốn xóa liên kết "${link.title}"?`)) {
                      deleteLink(link.id);
                    }
                  }}
                  className="w-8 h-8 rounded-xl bg-red-900/20 hover:bg-red-900/40 text-red-300 flex items-center justify-center transition-colors"
                  title="Xóa"
                >
                  <span className="material-symbols-outlined text-[17px]">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#0e071c] border border-white/20 rounded-3xl p-6 text-slate-100 shadow-[0_0_50px_rgba(201,24,74,0.3)]">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <span className="material-symbols-outlined text-[#ff4d6d]">
                  {editingLink ? 'edit' : 'add_link'}
                </span>
                <span>{editingLink ? 'Chỉnh sửa liên kết' : 'Thêm liên kết mới'}</span>
              </h4>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/70"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">
                  Chọn biểu tượng nền tảng
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {ICON_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => setModalForm((prev) => ({
                        ...prev,
                        icon: preset.icon,
                        iconColor: preset.color,
                        iconBorder: preset.border,
                        gradientBorder: preset.gradient,
                      }))}
                      className={`p-2 rounded-xl border flex flex-col items-center gap-1 text-[10px] font-medium transition-all ${
                        modalForm.icon === preset.icon
                          ? 'bg-purple-900/60 border-[#ff4d6d] shadow-[0_0_12px_#ff4d6d]'
                          : 'bg-[#080512] border-white/10 text-slate-300'
                      }`}
                    >
                      <span className={`material-symbols-outlined text-[18px] ${preset.color}`}>{preset.icon}</span>
                      <span className="truncate w-full text-center">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Tên liên kết hiển thị trên nút *
                </label>
                <input
                  type="text"
                  required
                  value={modalForm.title}
                  onChange={(e) => setModalForm({ ...modalForm, title: e.target.value })}
                  placeholder="VD: Kênh YouTube Luna Studio"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Đường dẫn (URL) *
                </label>
                <input
                  type="url"
                  required
                  value={modalForm.url}
                  onChange={(e) => setModalForm({ ...modalForm, url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#080512] border border-white/15 text-white text-xs focus:outline-none focus:border-[#ff4d6d]"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-300 text-xs font-medium"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-[#c9184a] to-[#7209b7] hover:opacity-95 text-white text-xs font-bold shadow-lg shadow-[#c9184a]/40"
                >
                  {editingLink ? 'Lưu cập nhật' : 'Thêm liên kết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

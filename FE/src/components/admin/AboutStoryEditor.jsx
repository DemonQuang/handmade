import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

const STORY_TEMPLATES = [
  {
    title: 'Đất Sét Nung & Resin (Mặc định)',
    content: 'Xin chào! Mình là Luna – người say mê biến đất sét polymer và resin trong suốt thành những câu chuyện vũ trụ lung linh. Nhận thiết kế mô hình theo yêu cầu 1:1, đóng gói quà tặng tỉ mỉ gửi gắm niềm vui tới bạn ✨',
  },
  {
    title: 'Tinh Vân & Thiên Hà Độc Bản',
    content: 'Chào bạn! Từng tác phẩm tại Luna Handmade đều được nặn tay tỉ mỉ và pha màu loang tinh vân thủ công độc bản. Mỗi khối resin, mỗi chú rồng đất sét đều mang một dải ngân hà thu nhỏ phát quang ban đêm ✨',
  },
  {
    title: 'Quà Tặng Cá Nhân Hóa (Custom 1:1)',
    content: 'Xin chào! Luna Studio chuyên chế tác mô hình tượng đất sét mini, móc khóa hồ ly và đèn ngủ resin nghệ thuật theo yêu cầu riêng. Từng đơn hàng đều được đóng gói hộp quà Kraft kèm thiệp tay trân quý ✨',
  },
];

/**
 * Tab: Quản lý Câu Chuyện "Một Chút Về Mình" (About Story Editor)
 */
export const AboutStoryEditor = () => {
  const { profile, updateProfile } = useData();
  const [storyText, setStoryText] = useState(profile.aboutStory || '');
  const [toastMessage, setToastMessage] = useState('');

  const handleChange = (e) => {
    const val = e.target.value;
    setStoryText(val);
    updateProfile({ aboutStory: val });
  };

  const handleApplyTemplate = (content) => {
    setStoryText(content);
    updateProfile({ aboutStory: content });
    setToastMessage('Đã áp dụng mẫu giới thiệu mới! ✨');
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-6 z-50 bg-[#160d2e] border border-[#ffe066]/60 text-white px-4 py-2.5 rounded-2xl shadow-[0_0_20px_rgba(255,224,102,0.4)] text-xs font-semibold flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[18px] text-[#ffe066]">auto_awesome</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Editor Box */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#120a22]/80 border border-white/10 backdrop-blur-xl shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-[#ffe066]">auto_awesome</span>
            <span>Biên Tập Câu Chuyện "Một Chút Về Mình"</span>
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">
            {storyText.length} ký tự
          </span>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed">
          Đoạn giới thiệu này sẽ xuất hiện trong khối mờ kính ở gần cuối trang người dùng, giúp khách hàng thấu hiểu tâm huyết của nghệ nhân và quy trình đóng gói quà tặng tỉ mỉ.
        </p>

        <div>
          <textarea
            rows="5"
            value={storyText}
            onChange={handleChange}
            placeholder="Nhập nội dung chia sẻ về niềm đam mê thủ công của bạn..."
            className="w-full px-4 py-3 rounded-2xl bg-[#080512] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#ff4d6d] leading-relaxed resize-y shadow-inner"
          />
        </div>

        {/* Suggestion Templates */}
        <div>
          <label className="text-xs font-bold text-slate-300 block mb-2">
            Gợi ý mẫu câu chuyện tham khảo:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {STORY_TEMPLATES.map((tmpl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyTemplate(tmpl.content)}
                className="p-3 rounded-xl bg-[#080512] hover:bg-[#1a0f30] border border-white/10 hover:border-[#ff4d6d]/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white group-hover:text-[#ff758f]">
                    {tmpl.title}
                  </span>
                  <span className="material-symbols-outlined text-[15px] text-slate-500 group-hover:text-white">
                    content_paste
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 line-clamp-2 leading-snug">
                  {tmpl.content}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Preview of the Glass Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#080512] border border-white/10 space-y-3">
        <h4 className="text-xs uppercase font-extrabold tracking-widest text-slate-300 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#ff4d6d] animate-ping" />
          Xem Trước Thẻ "Một Chút Về Mình" Thực Tế
        </h4>

        {/* Render the actual Glass Card as seen on the public page */}
        <section className="w-full max-w-md mx-auto p-4 rounded-2xl bg-[#0d0718]/90 backdrop-blur-xl border border-white/10 shadow-[0_0_20px_rgba(114,9,183,0.25)] text-left">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="material-symbols-outlined text-[18px] text-[#ff4d6d]"
              style={{ filter: 'drop-shadow(0 0 6px #c9184a)' }}
            >
              auto_awesome
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Một chút về mình
            </h3>
          </div>
          <p className="text-xs leading-relaxed text-slate-300">
            {storyText || 'Nội dung giới thiệu về nghệ nhân sẽ hiển thị tại đây...'}
          </p>
        </section>
      </div>
    </div>
  );
};

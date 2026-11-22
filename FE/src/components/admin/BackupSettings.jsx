import React, { useState } from 'react';
import { useData } from '../../context/DataContext';

/**
 * Backup, Restore, and Global Settings Tab
 */
export const BackupSettings = () => {
  const { exportBackup, importBackup, resetToDefaults } = useData();
  const [statusMessage, setStatusMessage] = useState({ text: '', type: 'info' });

  const showStatus = (text, type = 'success') => {
    setStatusMessage({ text, type });
    setTimeout(() => setStatusMessage({ text: '', type: 'info' }), 3000);
  };

  const handleExport = () => {
    try {
      const jsonStr = exportBackup();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      const timestamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `luna-handmade-backup-${timestamp}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showStatus('Đã xuất file cấu hình sao lưu (.json) thành công! ✨', 'success');
    } catch (e) {
      showStatus('Lỗi khi xuất file sao lưu: ' + e.message, 'error');
    }
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result;
        const res = importBackup(content);
        if (res.success) {
          showStatus('Đã nạp dữ liệu từ file backup thành công! ✨', 'success');
        } else {
          showStatus('File dữ liệu không đúng định dạng: ' + res.error, 'error');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleReset = () => {
    if (confirm('Bạn có chắc chắn muốn khôi phục lại toàn bộ dữ liệu mẫu ban đầu của Luna Handmade không? Mọi thay đổi hiện tại sẽ được thay thế bằng dữ liệu mẫu.')) {
      resetToDefaults();
      showStatus('Đã khôi phục dữ liệu mẫu ban đầu thành công! ✨', 'success');
    }
  };

  return (
    <div className="space-y-6">
      {/* Status banner */}
      {statusMessage.text && (
        <div className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
          statusMessage.type === 'error'
            ? 'bg-red-900/30 border-red-500/50 text-red-200'
            : 'bg-emerald-900/30 border-emerald-500/50 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
        }`}>
          <span className="material-symbols-outlined text-[18px]">
            {statusMessage.type === 'error' ? 'error' : 'check_circle'}
          </span>
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* 1. Export Backup */}
      <div className="p-5 rounded-2xl bg-[#120a22]/80 border border-white/10 backdrop-blur-xl shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[19px] text-[#00b4d8]">download</span>
          Xuất file cấu hình dự phòng (Export Backup)
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Tải toàn bộ thông tin nghệ nhân, danh sách liên kết và toàn bộ sản phẩm về máy tính dưới định dạng file JSON. Bạn có thể lưu giữ hoặc chia sẻ sang thiết bị khác.
        </p>
        <button
          type="button"
          onClick={handleExport}
          className="px-4 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-200 text-xs font-bold flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-purple-900/20"
        >
          <span className="material-symbols-outlined text-[18px]">file_download</span>
          <span>Tải file backup (.json)</span>
        </button>
      </div>

      {/* 2. Import Backup */}
      <div className="p-5 rounded-2xl bg-[#120a22]/80 border border-white/10 backdrop-blur-xl shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-purple-200 mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[19px] text-[#ffe066]">upload_file</span>
          Nạp dữ liệu từ file backup (Import Backup)
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Phục hồi dữ liệu từ file JSON bạn đã xuất trước đó. Dữ liệu sau khi nạp sẽ được cập nhật ngay lập tức vào trình duyệt.
        </p>
        <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900/40 hover:bg-blue-900/60 border border-blue-500/40 text-blue-200 text-xs font-bold transition-all active:scale-95">
          <span className="material-symbols-outlined text-[18px]">file_upload</span>
          <span>Chọn file backup (.json) từ máy</span>
          <input
            type="file"
            accept=".json,application/json"
            onChange={handleImport}
            className="hidden"
          />
        </label>
      </div>

      {/* 3. Reset Defaults */}
      <div className="p-5 rounded-2xl bg-red-950/20 border border-red-500/20 backdrop-blur-xl shadow-lg">
        <h3 className="text-sm font-bold uppercase tracking-wider text-red-300 mb-2 flex items-center gap-2">
          <span className="material-symbols-outlined text-[19px] text-red-400">restart_alt</span>
          Khôi phục dữ liệu mẫu ban đầu (Factory Reset)
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Xóa toàn bộ các thay đổi tùy chỉnh và khôi phục lại dữ liệu mẫu gốc từ bản thiết kế Stitch (Luna Handmade, Rồng Fantasy, Đèn Resin Biển, Hồ Ly Tuyết).
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2.5 rounded-xl bg-red-900/30 hover:bg-red-900/50 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px]">restore</span>
          <span>Khôi phục về mặc định gốc</span>
        </button>
      </div>
    </div>
  );
};

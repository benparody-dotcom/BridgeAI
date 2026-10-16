import React from 'react';

export const BRIDGIT_AVATAR_SRC = '/src/assets/images/bridgit_beaver_avatar_1792159531281.jpg';

interface BridgitAvatarProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showStatus?: boolean;
  showName?: boolean;
  className?: string;
}

export const BridgitAvatar: React.FC<BridgitAvatarProps> = ({
  size = 'md',
  showStatus = false,
  showName = false,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  return (
    <div className={`relative inline-flex items-center gap-2 ${className}`}>
      <div className={`relative shrink-0 rounded-full overflow-hidden border-2 border-teal-700 shadow-xs bg-amber-50 ${sizeClasses[size]}`}>
        <img
          src={BRIDGIT_AVATAR_SRC}
          alt="Bridgit the beaver, BridgeAI learning companion"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {showStatus && (
          <span
            className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white ring-1 ring-emerald-600"
            title="Bridgit is active and ready to help"
            aria-label="Online status"
          />
        )}
      </div>

      {showName && (
        <div className="leading-tight">
          <p className="text-xs font-black text-slate-950 flex items-center gap-1">
            <span>Bridgit</span>
            <span className="text-[10px] text-teal-800 font-bold bg-teal-100 px-1.5 py-0.2 rounded">Beaver Guide</span>
          </p>
          <p className="text-[11px] text-slate-600 font-medium">Your AI bridge builder</p>
        </div>
      )}
    </div>
  );
};

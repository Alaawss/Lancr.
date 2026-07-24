interface StickerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'brand-red' | 'brand-red-light' | 'dark-navy' | 'light-gray' | string;
  rotation?: number;
  className?: string;
}

export default function Sticker({ 
  size = 'md', 
  color = 'brand-red', 
  rotation = 0,
  className = '' 
}: StickerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses: Record<string, string> = {
    'brand-red': 'fill-[#FF2A54]',
    'brand-red-light': 'fill-[#FF6B8E]',
    'dark-navy': 'fill-[#0F172A]',
    'light-gray': 'fill-[#E2E8F0]'
  };

  const fillStyle = colorClasses[color] || { fill: color };

  return (
    <div 
      className={`${sizeClasses[size]} ${colorClasses[color] || ''} ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, ...(colorClasses[color] ? {} : { fill: color }) }}
    >
      <svg viewBox="0 0 24 24" fill={colorClasses[color] ? 'currentColor' : color}>
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    </div>
  );
}

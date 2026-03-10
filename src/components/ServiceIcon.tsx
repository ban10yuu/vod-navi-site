export const SERVICE_ICONS: Record<string, { abbr: string; color: string }> = {
  'u-next': { abbr: 'U', color: '#00b4d8' },
  'netflix': { abbr: 'N', color: '#e50914' },
  'amazon-prime-video': { abbr: 'P', color: '#00a8e1' },
  'dmm-tv': { abbr: 'D', color: '#6b3cc9' },
  'd-anime-store': { abbr: 'dA', color: '#ff6b9d' },
  'hulu': { abbr: 'H', color: '#1ce783' },
  'disney-plus': { abbr: 'D+', color: '#0063e5' },
  'abema': { abbr: 'A', color: '#00c514' },
  'fod-premium': { abbr: 'F', color: '#ff6347' },
  'lemino': { abbr: 'L', color: '#ff4081' },
  'telasa': { abbr: 'T', color: '#ff8c00' },
  'crunchyroll': { abbr: 'CR', color: '#f47521' },
  'wowow': { abbr: 'W', color: '#0057b8' },
  'apple-tv-plus': { abbr: '\u25B6', color: '#333333' },
  'rakuten-tv': { abbr: 'R', color: '#bf0000' },
  'dazn': { abbr: 'DA', color: '#0d1b2a' },
  'tver': { abbr: 'TV', color: '#0abab5' },
  'bandai-channel': { abbr: 'B', color: '#e91e63' },
  'spotify': { abbr: 'S', color: '#1db954' },
  'youtube-premium': { abbr: 'YT', color: '#ff0000' },
};

const SIZE_CLASSES = {
  xs: 'w-4 h-4 text-[7px]',
  sm: 'w-5 h-5 text-[8px]',
  md: 'w-10 h-10 text-xs',
  lg: 'w-12 h-12 text-sm',
} as const;

type ServiceIconProps = {
  slug?: string;
  color?: string;
  title?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  showName?: boolean;
};

export default function ServiceIcon({ slug, color, title, size = 'md', showName = false }: ServiceIconProps) {
  // Resolve icon: prefer slug lookup, fall back to color+title props
  const icon = slug ? SERVICE_ICONS[slug] : null;
  const bgColor = icon?.color ?? color ?? '#94a3b8';
  const abbr = icon?.abbr ?? (title ? title.charAt(0).toUpperCase() : '?');
  const displayName = title ?? slug ?? '';

  const badge = (
    <span
      className={`${SIZE_CLASSES[size]} inline-flex items-center justify-center rounded-full text-white font-bold flex-shrink-0`}
      style={{ backgroundColor: bgColor }}
    >
      {abbr}
    </span>
  );

  if (showName && displayName) {
    return (
      <span className="inline-flex items-center gap-2">
        {badge}
        <span className="text-sm font-medium text-slate-700">{displayName}</span>
      </span>
    );
  }

  return badge;
}

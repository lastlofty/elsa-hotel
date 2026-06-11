interface LogoProps {
  size?: number
  className?: string
}

/**
 * Отрисовка логотипа Elsa-Hotel:
 * стилизованное здание с аркой, обрамлённое золотым овалом,
 * лавровые ветви + звезда сверху.
 */
export function Logo({ size = 64, className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Elsa-Hotel"
    >
      {/* Внешний золотой овал */}
      <ellipse
        cx="100"
        cy="100"
        rx="78"
        ry="80"
        fill="none"
        stroke="#d4af37"
        strokeWidth="1.5"
      />

      {/* Звезда сверху */}
      <g transform="translate(100, 28)">
        <path
          d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z"
          fill="#d4af37"
        />
      </g>

      {/* Здание — три башни */}
      <g transform="translate(100, 100)">
        {/* Левая башня */}
        <polygon points="-32,40 -32,-10 -22,-20 -12,-10 -12,40" fill="#e6c558" />
        {/* Правая башня */}
        <polygon points="32,40 32,-10 22,-20 12,-10 12,40" fill="#e6c558" />
        {/* Центральная башня */}
        <polygon points="-12,40 -12,-30 0,-50 12,-30 12,40" fill="#d4af37" />
        {/* Арка входа */}
        <path d="M -8 40 L -8 15 Q 0 5 8 15 L 8 40 Z" fill="#0a0d12" />
      </g>

      {/* Лавровые ветви */}
      <g transform="translate(100, 145)">
        <ellipse cx="-30" cy="0" rx="22" ry="10" fill="#2d5e3e" transform="rotate(-20 -30 0)" />
        <ellipse cx="-15" cy="-3" rx="10" ry="5" fill="#3a7a4f" transform="rotate(-15 -15 -3)" />
        <ellipse cx="30" cy="0" rx="22" ry="10" fill="#2d5e3e" transform="rotate(20 30 0)" />
        <ellipse cx="15" cy="-3" rx="10" ry="5" fill="#3a7a4f" transform="rotate(15 15 -3)" />
      </g>

      {/* Нижняя кромка */}
      <path
        d="M 35 150 Q 100 180 165 150 L 165 165 Q 100 195 35 165 Z"
        fill="#2d5e3e"
      />
    </svg>
  )
}

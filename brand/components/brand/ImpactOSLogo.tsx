/**
 * ImpactOSLogo ג€” ׳”׳׳•׳’׳• ׳”׳׳׳ ׳©׳ IMPACT OS
 *
 * Props:
 *   fingerprintColor  ג€” ׳¦׳‘׳¢ ׳˜׳‘׳™׳¢׳× ׳”׳׳¦׳‘׳¢ (׳‘׳¨׳™׳¨׳× ׳׳—׳“׳: navy)
 *   heartColor        ג€” ׳¦׳‘׳¢ ׳”׳׳‘ ׳”׳₪׳ ׳™׳׳™ (׳‘׳¨׳™׳¨׳× ׳׳—׳“׳: fuchsia)
 *   impactColor       ג€” ׳¦׳‘׳¢ ׳”׳׳™׳׳” IMPACT (׳‘׳¨׳™׳¨׳× ׳׳—׳“׳: navy)
 *   osColor           ג€” ׳¦׳‘׳¢ OS (׳‘׳¨׳™׳¨׳× ׳׳—׳“׳: fuchsia)
 *   taglineColor      ג€” ׳¦׳‘׳¢ ׳”׳¡׳׳•׳’׳ (׳‘׳¨׳™׳¨׳× ׳׳—׳“׳: navy)
 *   showTagline       ג€” ׳”׳׳ ׳׳”׳¦׳™׳’ ׳׳× ׳”׳¡׳׳•׳’׳ (׳‘׳¨׳™׳¨׳× ׳׳—׳“׳: true)
 *   variant           ג€” 'horizontal' (׳¢׳ ׳¡׳׳•׳’׳) | 'compact' (׳׳׳ ׳¡׳׳•׳’׳, ׳˜׳‘׳™׳¢׳” ׳§׳˜׳ ׳” ׳™׳•׳×׳¨)
 *   className         ג€” class ׳—׳™׳¦׳•׳ ׳™ ׳׳’׳•׳“׳ ׳•׳׳™׳§׳•׳
 *
 * ׳›׳׳׳™׳ ׳§׳‘׳•׳¢׳™׳:
 *   - ׳‘׳¨׳™׳¨׳× ׳”׳׳—׳“׳ ׳×׳׳™׳“ ׳ ׳׳׳ ׳” ׳׳׳•׳×׳’
 *   - ׳•׳¨׳™׳׳¦׳™׳•׳× ׳¦׳‘׳¢ ׳”׳ ׳׳₪׳•׳¨׳©׳•׳× ׳•׳ ׳©׳׳˜׳•׳× ׳“׳¨׳ props
 *   - SVG ׳©׳§׳•׳£ ׳‘׳׳‘׳“, ׳׳׳ PNG ׳•׳׳׳ ׳¨׳§׳¢
 */

import type { CSSProperties } from 'react'
import { brandLogoDefaults } from '../../lib/brandTokens'
import { FingerprintMark } from './FingerprintMark'

type LogoVariant = 'horizontal' | 'compact'

type ImpactOSLogoProps = {
  className?: string
  fingerprintColor?: string
  heartColor?: string
  impactColor?: string
  osColor?: string
  taglineColor?: string
  showTagline?: boolean
  variant?: LogoVariant
  style?: CSSProperties
}

export function ImpactOSLogo({
  className,
  fingerprintColor = brandLogoDefaults.fingerprint,
  heartColor = brandLogoDefaults.heart,
  impactColor = brandLogoDefaults.impact,
  osColor = brandLogoDefaults.os,
  taglineColor = brandLogoDefaults.tagline,
  showTagline = true,
  variant = 'horizontal',
  style,
}: ImpactOSLogoProps) {
  const isCompact = variant === 'compact'

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: isCompact ? '10px' : '14px',
        direction: 'ltr', // ׳׳•׳’׳• ׳×׳׳™׳“ LTR
        flexShrink: 0,
        background: 'transparent',
        ...style,
      }}
    >
      {/* ׳˜׳‘׳™׳¢׳× ׳”׳׳¦׳‘׳¢ ג€” SVG ׳§׳•׳•׳™, ׳¦׳‘׳¢ ׳-prop */}
      <FingerprintMark
        color={fingerprintColor}
        heartColor={heartColor}
        strokeWidth={isCompact ? 10 : 9.5}
        style={{
          width: isCompact ? '40px' : '52px',
          height: 'auto',
          flexShrink: 0,
        }}
      />

      {/* ׳˜׳§׳¡׳˜ ׳”׳׳•׳’׳• */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '4px',
            lineHeight: 1,
          }}
        >
          {/* IMPACT */}
          <span
            style={{
              fontFamily: 'Heebo, Rubik, Arial, sans-serif',
              fontWeight: 900,
              fontSize: isCompact ? '22px' : '28px',
              color: impactColor,
              letterSpacing: '-0.5px',
              lineHeight: 1,
            }}
          >
            IMPACT
          </span>

          {/* SO */}
          <span
            style={{
              fontFamily: 'Heebo, Rubik, Arial, sans-serif',
              fontWeight: 900,
              fontSize: isCompact ? '22px' : '28px',
              color: osColor,
              letterSpacing: '-0.5px',
              lineHeight: 1,
            }}
          >
            SO
          </span>
        </div>

        {/* ׳¡׳׳•׳’׳ */}
        {showTagline && !isCompact && (
          <span
            style={{
              fontFamily: 'Heebo, Rubik, Arial, sans-serif',
              fontWeight: 500,
              fontSize: '11px',
              color: taglineColor,
              letterSpacing: '1.5px',
              opacity: 0.65,
              lineHeight: 1,
              direction: 'rtl',
              unicodeBidi: 'embed',
            }}
          >
            ׳˜׳›׳ ׳•׳׳•׳’׳™׳” ׳™׳•׳¦׳¨׳× ׳׳™׳׳₪׳§׳˜
          </span>
        )}
      </div>
    </div>
  )
}

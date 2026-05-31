export const brandColors = {
  navy: '#061E4F',
  fuchsia: '#F00678',
  turquoise: '#12C7C7',
  green: '#7BCB52',
  yellow: '#F4B41B',
  orange: '#FF7A1A',
  slate: '#64748B',
  softWhite: '#F8FAFC',
  white: '#FFFFFF',
}

export type BrandColorName =
  | 'navy'
  | 'fuchsia'
  | 'turquoise'
  | 'green'
  | 'yellow'
  | 'orange'
  | 'slate'
  | 'white'

export const logoFingerprintVariants: Record<BrandColorName, string> = {
  navy: brandColors.navy,
  fuchsia: brandColors.fuchsia,
  turquoise: brandColors.turquoise,
  green: brandColors.green,
  yellow: brandColors.yellow,
  orange: brandColors.orange,
  slate: brandColors.slate,
  white: brandColors.white,
}

export const brandGradient =
  'linear-gradient(135deg, #12C7C7 0%, #7BCB52 28%, #F4B41B 50%, #FF7A1A 70%, #F00678 100%)'

export const brandLogoDefaults = {
  fingerprint: brandColors.navy,
  heart: brandColors.fuchsia,
  impact: brandColors.navy,
  os: brandColors.fuchsia,
  tagline: brandColors.navy,
} as const

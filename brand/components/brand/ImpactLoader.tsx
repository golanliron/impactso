import { brandColors } from '../../lib/brandTokens'
import { ImpactOSLogo } from './ImpactOSLogo'

type ImpactLoaderProps = {
  fingerprintColor?: string
  heartColor?: string
  backgroundColor?: string
  label?: string
}

export function ImpactLoader({
  fingerprintColor = brandColors.navy,
  heartColor = brandColors.fuchsia,
  backgroundColor = brandColors.softWhite,
  label = '׳˜׳•׳¢׳ IMPACT OS',
}: ImpactLoaderProps) {
  return (
    <div
      role="status"
      aria-label={label}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: backgroundColor,
      }}
    >
      <style>{`
        @keyframes impactDraw { to { stroke-dashoffset: 0; opacity: 1; } }
        @keyframes impactPop { 0% { opacity: 0; transform: scale(0); } 70% { opacity: 1; transform: scale(1.18); } 100% { opacity: 1; transform: scale(1); } }
        @keyframes impactLogoIn { 0%, 68% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }
        @keyframes impactMarkOut { 0%, 62% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(.92); } }
      `}</style>
      <div style={{ position: 'relative', width: 'min(420px, 86vw)', height: 230 }}>
        <svg
          viewBox="0 0 240 284"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          style={{
            position: 'absolute',
            insetInline: 0,
            top: 0,
            margin: '0 auto',
            width: 165,
            height: 'auto',
            overflow: 'visible',
            animation: 'impactMarkOut .65s ease 1.9s forwards',
          }}
        >
          <g stroke={fingerprintColor} strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {[
              'M66 76C88 42 139 35 172 60C197 79 207 111 199 146',
              'M45 110C57 55 118 26 171 48C212 65 235 107 230 153',
              'M19 149C16 79 73 23 142 27C199 30 242 77 240 133',
              'M51 188C35 103 94 32 174 38',
              'M79 212C52 136 82 70 142 57C180 49 213 72 220 110',
              'M108 234C83 185 95 130 134 107C160 92 191 101 202 128',
              'M137 255C110 226 110 183 132 158C149 140 177 143 190 164',
              'M160 270C145 252 141 232 148 212',
              'M39 171C75 148 96 119 108 88',
              'M59 218C99 187 119 153 130 115',
              'M93 252C123 229 140 203 148 172',
              'M185 204C210 170 220 134 209 101',
              'M202 245C221 222 232 196 235 169',
            ].map((d, index) => (
              <path
                key={d}
                d={d}
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  opacity: 0,
                  animation: `impactDraw .8s ease ${index * 0.06}s forwards`,
                }}
              />
            ))}
          </g>
          <g stroke={heartColor} strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {[
              'M88 135C100 111 126 112 140 136C154 111 181 111 194 136',
              'M88 135C102 164 127 184 141 199C156 184 181 163 194 136',
            ].map((d, index) => (
              <path
                key={d}
                d={d}
                pathLength={1}
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: 1,
                  opacity: 0,
                  animation: `impactDraw .45s ease ${1.15 + index * 0.12}s forwards`,
                }}
              />
            ))}
          </g>
          <g fill={fingerprintColor}>
            {[
              [62, 75], [185, 60], [35, 111], [222, 155],
              [65, 218], [166, 269], [207, 203], [101, 253],
              [135, 97], [188, 136], [119, 178], [142, 211],
            ].map(([cx, cy], index) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r="6.8"
                style={{
                  opacity: 0,
                  transformOrigin: `${cx}px ${cy}px`,
                  animation: `impactPop .22s ease ${0.1 + index * 0.06}s forwards`,
                }}
              />
            ))}
          </g>
        </svg>
        <ImpactOSLogo
          style={{
            position: 'absolute',
            insetInline: 0,
            bottom: 0,
            justifyContent: 'center',
            opacity: 0,
            animation: 'impactLogoIn .65s ease 1.75s forwards',
          }}
        />
      </div>
    </div>
  )
}

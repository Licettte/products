// <reference types="app/store/types" />
declare module '*.module.scss' {
  const classes: Record<string, string>
  export default classes
}

declare module '*.svg?react' {
  import { type FC, type SVGProps } from 'react'
  const content: FC<SVGProps<SVGElement>>
  export default content
}

declare module '*.json'

declare module '*.jpg'

declare module '*.jpeg'

declare module '*.png'

declare module '*.webp'

declare module '*.svg'

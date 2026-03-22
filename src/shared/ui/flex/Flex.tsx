import type { CSSProperties, HTMLAttributes } from 'react'

type FlexProps = {
  dir?: CSSProperties['flexDirection']
  wrap?: CSSProperties['flexWrap']
  justify?: CSSProperties['justifyContent']
  align?: CSSProperties['alignItems']
  content?: CSSProperties['alignContent']
  gap?: number
  margin?: string
  style?: CSSProperties
} & Omit<HTMLAttributes<HTMLDivElement>, 'style'>

export const Flex = ({
  dir = 'row',
  wrap,
  justify,
  align,
  content,
  gap,
  margin,
  style,
  children,
  ...rest
}: FlexProps) => (
  <div
    style={{
      display: 'flex',
      flexDirection: dir,
      flexWrap: wrap,
      justifyContent: justify,
      alignItems: align,
      alignContent: content,
      gap: `${gap}px`,
      margin: margin,
      ...style,
    }}
    {...rest}
  >
    {children}
  </div>
)

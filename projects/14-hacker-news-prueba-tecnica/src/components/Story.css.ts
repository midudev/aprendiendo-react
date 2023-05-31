import { style } from '@vanilla-extract/css'

export const story = style({
  color: '#374151',
  marginBottom: '8px'
})

export const storyTitle = style({
  textDecoration: 'none',
  color: '#111',
  fontSize: '18px'
})

export const storyHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '2px',
  lineHeight: '24px'
})

export const storyFooter = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  lineHeight: '24px',
  fontSize: '12px'
})

export const storyLink = style({
  color: '#888',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
})

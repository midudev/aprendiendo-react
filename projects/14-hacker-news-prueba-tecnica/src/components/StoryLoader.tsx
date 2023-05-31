import ContentLoader from 'react-content-loader'

export const StoryLoader = () => {
  return (
    <ContentLoader
      speed={2}
      width={300}
      height={50}
      viewBox='0 0 300 50'
      backgroundColor='#ddd'
      foregroundColor='#fff'
    >
      <rect x='13' y='4' rx='3' ry='3' width='148' height='10' />
      <rect x='177' y='8' rx='3' ry='3' width='52' height='6' />
      <rect x='14' y='28' rx='3' ry='3' width='73' height='5' />
      <rect x='96' y='28' rx='3' ry='3' width='73' height='5' />
      <rect x='177' y='28' rx='3' ry='3' width='73' height='5' />
    </ContentLoader>
  )
}

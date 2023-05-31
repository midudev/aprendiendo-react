import ContentLoader from 'react-content-loader'

export const CommentLoader = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={100}
    viewBox='0 0 300 100'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
  >
    <rect x='13' y='4' rx='3' ry='3' width='148' height='10' />
    <rect x='175' y='7' rx='3' ry='3' width='52' height='6' />
    <rect x='15' y='19' rx='3' ry='3' width='255' height='66' />
  </ContentLoader>
)

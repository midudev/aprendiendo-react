import { Link } from 'wouter'
import useSWR from 'swr'
import { getItemInfo } from '../services/hacker-news'
import { storyLink, story, storyFooter, storyHeader, storyTitle } from './Story.css'
import { StoryLoader } from './StoryLoader'
import { getRelativeTime } from '../utils/getRelativeTime'

export const Story = (props: {
  id: number
  index: number
}) => {
  const { id, index } = props

  const { data, isLoading } = useSWR(`/story/${id}`, () => getItemInfo(id))

  if (isLoading) {
    // enseñar el placeholder
    return <StoryLoader />
  }

  const { by, kids, score, title, url, time } = data
  console.log(data)

  let domain = ''
  try {
    domain = new URL(url).hostname.replace('www.', '')
  } catch {}

  // TODO: Create relativeTime
  const relativeTime = getRelativeTime(time)

  return (
    <article className={story}>
      <header className={storyHeader}>
        <small>{index + 1}.</small>
        <a
          className={storyTitle}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {title}
        </a>

        <a
          className={storyLink}
          href={url}
          target='_blank'
          rel='noopener noreferrer'
        >
          ({domain})
        </a>
      </header>

      <footer className={storyFooter}>
        <span>{score} points</span>

        <Link className={storyLink} href={`/article/${id}`}>
          by {by}
        </Link>
        <Link className={storyLink} href={`/article/${id}`}>
          <time dateTime={new Date(time * 1000).toISOString()}>
            {relativeTime}
          </time>
        </Link>
        <Link className={storyLink} href={`/article/${id}`}>
          {kids?.length ?? 0} comments
        </Link>
      </footer>
    </article>
  )
}

// import useSWR from 'swr'
import useSWRInfinite from 'swr/infinite'

import { getTopStories } from '../services/hacker-news'
import { Story } from '../components/Story'
import { useEffect, useRef } from 'react'

export default function TopStoriesPage () {
  // const { data } = useSWR('stories', () => getTopStories(1, 10))
  const { data, isLoading, setSize } = useSWRInfinite(
    (index) => `stories/${index + 1}`, // la key que usa para cachear los resultados
    (key) => {
      const [, page] = key.split('/')
      return getTopStories(Number(page), 10)
    }
  )

  const chivatoEl = useRef<HTMLSpanElement>(null)

  const stories = data?.flat()

  useEffect(() => {
    document.title = 'Hacker News - Prueba Técnica USA de Frontend'
  }, [])

  useEffect(() => {
    // use intersection observer to detect end of the page scroll
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLoading) {
        setSize((prevSize) => prevSize + 1)
      }
    }, {
      rootMargin: '100px'
    })

    if (chivatoEl.current == null) {
      return
    }

    observer.observe(chivatoEl.current)

    return () => {
      observer.disconnect()
    }
  }, [isLoading, setSize])

  return (
    <>
      <ul style={{ listStyle: 'none' }}>
        {stories?.map((id: number, index: number) => (
          <li key={id}>
            <Story id={id} index={index} />
          </li>
        ))}
      </ul>

      {!isLoading && <span ref={chivatoEl}>.</span>}

      {/* <button onClick={() => { setSize(size + 1) }}>
        Load more
      </button> */}
    </>
  )
}

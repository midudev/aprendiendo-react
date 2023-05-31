import { Suspense, lazy } from 'react'
import { Header } from './components/Header'
import { Route } from 'wouter'

const TopStoriesPage = lazy(() => import('./pages/TopStories'))
const DetailPage = lazy(() => import('./pages/Detail'))

export default function App () {
  return (
    <>
      <Header />

      <main>
        <Suspense fallback={null}>
          <Route path='/' component={TopStoriesPage} />
          <Route path='/article/:id' component={DetailPage} />
        </Suspense>
      </main>
    </>
  )
}

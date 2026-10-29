import { useTitle } from '../lib/useTitle'

export default function About() {
  useTitle('About')
  return (
    <>
      <h1>About</h1>
      <p>
        George's Workshop is my personal portfolio. It lists three projects: TaskFlow, DevScope and FileForge. I develop
        and maintain them myself.
      </p>
      <p>
        This site is a static React application. Release data comes from the GitHub REST API; everything else is written
        by hand. AI tools were used for guidance while building the site.
      </p>
    </>
  )
}

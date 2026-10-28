import { useTitle } from '../lib/useTitle'

export default function About() {
  useTitle('About')
  return (
    <>
      <h1>About</h1>
      <p>
        Northstar Software is the home of three independent projects: TaskFlow, DevScope and FileForge. They are
        developed and maintained by a single developer.
      </p>
      <p>
        This site is a static React application. Release data comes from the GitHub REST API; everything else is written
        by hand. AI tools were used for guidance while building the site.
      </p>
    </>
  )
}

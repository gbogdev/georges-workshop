import { OWNER } from '../data/products'
import { useTitle } from '../lib/useTitle'

export default function Contact() {
  useTitle('Contact')
  return (
    <>
      <h1>Contact</h1>
      <p>
        Bug reports and questions are best raised as issues on the relevant project's GitHub repository. For anything
        else, reach out through the profile at <a href={`https://github.com/${OWNER}`}>github.com/{OWNER}</a>.
      </p>
    </>
  )
}

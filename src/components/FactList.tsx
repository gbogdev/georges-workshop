interface Props {
  title: string
  items: string[]
  ordered?: boolean
  empty?: string
  level?: 2 | 3
}

export default function FactList({ title, items, ordered, empty = 'Not yet documented.', level = 2 }: Props) {
  const List = ordered ? 'ol' : 'ul'
  const Heading = `h${level}` as 'h2' | 'h3'
  return (
    <section>
      <Heading>{title}</Heading>
      {items.length ? (
        <List>
          {items.map((i, n) => (
            <li key={n}>{i}</li>
          ))}
        </List>
      ) : (
        <p className="muted">{empty}</p>
      )}
    </section>
  )
}

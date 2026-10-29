interface Props {
  title: string
  items: string[]
  ordered?: boolean
  empty?: string
  level?: 2 | 3
  code?: boolean
}

export default function FactList({ title, items, ordered, empty = 'Not yet documented.', level = 2, code }: Props) {
  const List = ordered ? 'ol' : 'ul'
  const Heading = `h${level}` as 'h2' | 'h3'
  return (
    <section>
      <Heading>{title}</Heading>
      {items.length ? (
        <List>
          {items.map((i, n) => (
            <li key={n}>{code ? <code>{i}</code> : i}</li>
          ))}
        </List>
      ) : (
        <p className="muted">{empty}</p>
      )}
    </section>
  )
}

interface Props {
  title: string
  items: string[]
  ordered?: boolean
  empty?: string
}

export default function FactList({ title, items, ordered, empty = 'Not yet documented.' }: Props) {
  const List = ordered ? 'ol' : 'ul'
  return (
    <section>
      <h2>{title}</h2>
      {items.length ? (
        <List>
          {items.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </List>
      ) : (
        <p className="muted">{empty}</p>
      )}
    </section>
  )
}

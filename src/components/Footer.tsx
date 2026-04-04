export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="flex flex-col sm:flex-row justify-between items-center gap-2 px-8 md:px-12 py-6 border-t border-white/[0.08]">
      <p className="font-mono text-2xs text-ink-dim">
        jonas schoustrup-thomsen · frontend engineer · AI solutions &amp; platforms
      </p>
      <p className="font-mono text-2xs text-ink-dim">{year}</p>
    </footer>
  )
}

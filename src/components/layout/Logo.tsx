type Props = {
  onClick?: () => void
}

export function Logo({ onClick }: Props) {
  return (
    <a
      href="#hjem"
      className="logo"
      onClick={(e) => {
        if (!onClick) return
        e.preventDefault()
        onClick()
      }}
    >
      <span className="logo-mark" aria-hidden="true">ND</span>
      <span className="logo-text">
        Nordic <strong>Devices</strong> AS
      </span>
    </a>
  )
}

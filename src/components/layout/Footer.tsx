type Props = {
  onOpenCookieSettings: () => void
}

export function Footer({ onOpenCookieSettings }: Props) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="logo-mark" aria-hidden="true">ND</span>
          <div>
            <p className="footer-title">Nordic Devices AS</p>
            <p className="footer-sub">Moderne IT for nordiske bedrifter</p>
          </div>
        </div>
        <div className="footer-meta">
          <p className="footer-copy">
            © 2026 Nordic Devices AS · ITK2004 prøveeksamen
          </p>
          <button
            type="button"
            className="link-button"
            onClick={onOpenCookieSettings}
          >
            Endre cookievalg
          </button>
        </div>
      </div>
    </footer>
  )
}

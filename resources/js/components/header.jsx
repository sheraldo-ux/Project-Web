export default function Header({ scrollToInfo }) {
  return (
    <header className="header">
      <nav>
        <ul>
          <li onClick={() => scrollToInfo(0)}>Home</li>
          <li onClick={() => scrollToInfo(1)}>Information</li>
        </ul>
      </nav>
    </header>
  );
}
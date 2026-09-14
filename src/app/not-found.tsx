export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="mono text-[12px] uppercase tracking-[0.12em] text-ink-faint mb-4">404</p>
        <h1 className="font-display font-semibold text-5xl mb-4">Такой страницы нет</h1>
        <p className="text-ink-soft mb-8">
          Зато есть четыре программы с открытым кодом. Возможно, вы искали одну из них.
        </p>
        <a
          href="/"
          className="inline-flex h-[52px] px-8 items-center bg-pine text-paper rounded-xl font-semibold"
        >
          На главную
        </a>
      </div>
    </main>
  );
}

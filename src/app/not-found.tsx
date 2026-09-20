export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <p className="mono text-[12px] text-fg-muted mb-4">404</p>
        <h1 className="text-[32px] font-semibold tracking-[-0.02em] mb-4">Такой страницы нет</h1>
        <p className="text-fg-secondary mb-8">
          Зато есть четыре программы с открытым кодом. Возможно, вы искали одну из них.
        </p>
        <a
          href="/"
          className="inline-flex h-11 px-7 items-center bg-fg text-bg rounded-md font-medium text-[15px]"
        >
          На главную
        </a>
      </div>
    </main>
  );
}

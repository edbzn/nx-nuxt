export function createApp(name: string): string {
  return `
  <header>
    <h1>Welcome to ${name}!</h1>
  </header>
  <main>
    <p>
      Thank you for using nx-nuxt-plugin ♥.
    </p>
    <div>
      <a href="https://github.com/edbzn/nx-nuxt-plugin" target="_blank" rel="noopener noreferrer"> If you like nx-nuxt-plugin, please give it a star:
        <div>
          <img src="/star.svg" />
            Star
        </div>
      </a>
    </div>
  </main>
  `;
}

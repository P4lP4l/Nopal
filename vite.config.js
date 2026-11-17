import { defineConfig } from 'vite';

// base './' membuat hasil build bisa dipasang di domain sendiri
// maupun di subfolder (contoh: username.github.io/dyspal/).
export default defineConfig({ base: './' });

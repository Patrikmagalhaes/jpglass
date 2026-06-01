import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import svgr from 'vite-plugin-svgr'

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    babel({
      plugins: [
        [
          'babel-plugin-styled-components',
          { displayName: true, fileName: true }
        ]
      ]
    })
  ],
})

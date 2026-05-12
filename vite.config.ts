import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'

export default defineConfig({
  plugins: [
    react(), // Sem configurações de babel aqui
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

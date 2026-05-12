# 🌟 Mundo Mágico — Psicología Interactiva para Niños

Una aplicación web preciosa que permite a los niños explorar su mundo interior a través de juegos, preguntas y actividades interactivas, obteniendo su perfil psicológico personalizado con puntos y superpoderes.

## ✨ Características

- **4 Mundos de Aventura**: Emociones, Superpoderes, Mundo Interior, Gran Aventura
- **12 preguntas psicológicas** adaptadas para niños
- **Perfil mágico personalizado**: Planeta de personalidad, superpoderes, puntuación
- **Sistema de puntos** con niveles (Maestro Mágico, Explorador Estelar, Aventurero, Aprendiz)
- **Animaciones y confetti** para hacer la experiencia divertida
- **100% sin base de datos** — funciona sin configuración

## 🚀 Deploy en Vercel

```bash
# 1. Instalar dependencias
npm install

# 2. Probar localmente
npm run dev

# 3. Subir a GitHub
git init && git add . && git commit -m "inicial"
git remote add origin https://github.com/TU_USUARIO/mundo-magico.git
git branch -M main && git push -u origin main

# 4. En vercel.com → Add New Project → importar repo → Deploy
# Vercel detecta Vite automáticamente con el vercel.json incluido
```

## 🎨 Tecnología

- React 18 + Vite
- Sin librerías de UI (diseño 100% custom)
- Animaciones CSS puras
- Google Fonts (Nunito + Poppins + DM Mono)
- Sin base de datos (estado local)

## 🌈 Pantallas

1. **Bienvenida** — Presentación animada
2. **Nombre** — El niño se presenta
3. **Selector de Juegos** — 4 aventuras con progreso
4. **Juego** — Preguntas con opciones visuales
5. **Resultados** — Perfil completo con planeta, superpoderes y puntuación

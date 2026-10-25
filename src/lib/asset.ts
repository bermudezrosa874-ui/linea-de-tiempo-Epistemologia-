/** Resuelve una ruta de `public/` respetando la base de Vite (funciona también al abrir `dist` en una subcarpeta). */
export const asset = (path: string): string => `${import.meta.env.BASE_URL}${path}`

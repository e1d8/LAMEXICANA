# Carta de La Mexicana

Toda la información de la carta está en `menu.json`: secciones, productos,
descripciones, precios y definiciones de alérgenos. La web solicita el archivo
sin caché cada vez que se abre o recarga. No es necesario modificar JavaScript
para ampliar la carta o su índice.

Para probarla localmente, ejecuta `python3 -m http.server 8000` en esta carpeta
y abre <http://localhost:8000>. La carga del JSON requiere servir la web por
HTTP/HTTPS; abrir `index.html` directamente como archivo no permite esa carga.

## Añadir o editar contenido

El objeto principal tiene dos campos: `allergens` y `sections`. Los elementos
se muestran en el mismo orden en el que están escritos en el JSON.

Añade productos al array `items` de una sección existente o añade una sección
completa al array `sections`, por ejemplo:

```json
{
  "id": "especialidades",
  "name": "Especialidades",
  "items": [
    {
      "name": "Nueva quesadilla",
      "description": "Descripción del plato.",
      "price": "5.50€",
      "allergens": ["lacteo", "gluten"]
    }
  ]
}
```

Reglas de validación:

- Cada sección necesita `id`, `name` e `items`. El identificador debe ser único,
  empezar por una letra minúscula y contener solo letras minúsculas, números y
  guiones. Tampoco puede coincidir con un identificador de la página o de otro
  encabezado (`id-title`). Las secciones sin productos válidos no se muestran.
- Cada producto necesita un `name` de texto que no esté vacío. `description`,
  `price` y `allergens` son opcionales. Se admiten productos sin precio, como
  la botella de vino cuyo precio se consulta.
- Si se incluye `description`, debe ser un texto. Si se incluye `price`, debe
  ser un texto con un importe no negativo y el símbolo `€`, por ejemplo
  `"5.50€"`, `"5,50€"` o `"5€"`, con un máximo de dos decimales.
- Si se incluye `allergens`, debe ser un array de claves definidas en
  `allergens`. Un alérgeno desconocido o mal definido hace que se descarte el
  producto completo para evitar mostrar información incompleta.
- Cada definición de alérgeno necesita un `label` de texto no vacío y un `icon`
  con una ruta de la forma `assets/allergens/nombre.svg` (también se admiten
  `.png` y `.webp`). El nombre del archivo admite letras, números, guiones y
  guiones bajos. Hay que añadir el archivo del icono a esa carpeta.
- Un campo conocido con un tipo o formato incorrecto descarta el producto o
  la sección correspondiente; los demás datos válidos se siguen mostrando.
  Los campos adicionales se ignoran.

El archivo debe mantener una sintaxis JSON válida: comillas dobles, sin
comentarios ni comas finales. Si el JSON completo tiene un error de sintaxis o
no puede descargarse, se muestra un aviso para recargar la página. Si no hay
secciones válidas, se indica que la carta no está disponible. El índice y los
datos estructurados para buscadores usan únicamente las entradas validadas.

## Nombres de los guardados en GitHub Actions

Los guardados del editor publicado tendrán títulos como
`#1 - Cambios del 17 de Octubre`. El número cuenta únicamente las modificaciones
guardadas correctamente por la API del editor. Empieza en 1 con el primer guardado
tras activar esta versión; no renombra publicaciones anteriores. La fecha usa
la zona horaria de Madrid. Abrir la web, reenviar los mismos datos o reintentar
una publicación no incrementa el contador.

La API conserva el contador y la fecha UTC en el campo interno `_editor` de
`menu.json`, junto a los productos, en el mismo commit. La carta ignora ese campo;
no hay que editarlo ni eliminarlo manualmente. Un guardado fallido o un conflicto
de versión no consume números. El título del commit también identifica el guardado
si una publicación posterior falla o queda pendiente.

Para activar los títulos de las publicaciones:

1. En GitHub, abre **LaMexicana → Settings → Pages → Build and deployment →
   Source** y elige **GitHub Actions**. Esta configuración sustituye la publicación
   automática desde una rama.
2. Sube el workflow `.github/workflows/pages.yml` de **este repositorio de la
   carta** a `main` y espera a que termine su primera publicación.
3. Sube los cambios del proyecto **LaMexicanaEditor**, incluido
   `menu-save-history.mjs`, y vuelve a publicar su API en Cloudflare desde la carpeta
   del editor con `npx --yes wrangler deploy`.
4. Espera a que termine la publicación de la interfaz del editor. El siguiente
   guardado con cambios creará el título numerado en **LaMexicana → Actions →
   Publicar carta en GitHub Pages**. El workflow del repositorio del editor seguirá
   llamándose «Publicar editor en GitHub Pages».

Los cambios de código que publiques manualmente conservan su mensaje de commit
como título y no incrementan el contador. Una ejecución manual desde Actions
se titula «Publicación manual de la carta». Al ejecutar de nuevo una publicación
se vuelve a publicar esa misma versión; para publicar la carta más reciente usa
**Run workflow** en `main`. Solo se empaquetan la carta y sus recursos públicos.

## Comprobar los cambios

Con el servidor local iniciado, abre <http://localhost:8000/tests/menu.html>.
Las pruebas comprueban que se conservan los datos actuales, se incorporan
productos, secciones y alérgenos nuevos, se descartan entradas incorrectas y
se gestionan los errores de descarga y de sintaxis JSON. También verifican
el índice, los datos estructurados y la presentación segura del texto.

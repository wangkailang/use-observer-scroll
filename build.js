const { build } = require('esbuild');
const chokidar = require('chokidar');
const fs = require('fs-extra');

const generateBuild = async () => {
  await fs.rmdirSync('./lib', { recursive: true });
  
  await build({
    entryPoints: ['./src/index.ts'],
    outdir: './lib',
    minify: true,
    bundle: true,
    sourcemap: false,
    target: ['chrome58', 'firefox57', 'edge16'],
    loader: { ".svg": "dataurl", ".png": "dataurl" },
    define: {
      'process.env.NODE_ENV': "'production'",
    }
  }).catch(() => process.exit(1));
}

chokidar.watch('.', {ignored:/lib|node_modules|.git/}).on('all', (event, path) => {
  console.log(event, path);
  generateBuild();
});

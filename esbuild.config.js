import esbuild from 'esbuild';

const buildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'browser',
  target: ['es2015'],
  format: 'esm',
  outfile: 'dist/index.mjs',
  external: ['react', 'react/jsx-runtime'],
};

// Build ESM
await esbuild.build(buildOptions);

// Build CJS
await esbuild.build({
  ...buildOptions,
  format: 'cjs',
  outfile: 'dist/index.cjs',
}); 
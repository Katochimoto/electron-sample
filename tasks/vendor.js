import RollupPluginNodeResolve from 'rollup-plugin-node-resolve';
import RollupPluginCommonJS from 'rollup-plugin-commonjs';
import RollupPluginFilesize from 'rollup-plugin-filesize';
import RollupPluginReplace from 'rollup-plugin-replace';
import RollupPluginBuble from 'rollup-plugin-buble';

export function generate ({
  env = 'development'
} = {}) {
  return {
    format: 'iife',
    exports: 'default',
    moduleName: 'vendor',
    useStrict: true
  };
}

export function rollup ({
  env = 'development'
} = {}) {
  return {
    sourceMap: false,
    context: 'window',
    plugins: [
      RollupPluginReplace({
        'process.env.NODE_ENV': JSON.stringify(env)
      }),

      RollupPluginBuble({
        transforms: {
          modules: false
        }
      }),

      RollupPluginNodeResolve({
        jsnext: false,
        module: false,
        main: true
      }),

      RollupPluginCommonJS({
        include: 'node_modules/**'
      }),

      RollupPluginFilesize()
    ]
  };
}

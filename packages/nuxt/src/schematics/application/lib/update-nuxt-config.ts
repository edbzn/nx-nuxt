import { Rule } from '@angular-devkit/schematics';
import { NormalizedSchema } from './normalize-options';

export function updateNuxtConfig(options: NormalizedSchema): Rule {
  return (host) => {
    const configPath = `${options.appProjectRoot}/nuxt.config.js`;
    const content = `
      export default {
        mode: '${options.mode}',
        target: '${options.target}',
        head: {
          title: process.env.npm_package_name || '',
          meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
          ],
          link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
          ]
        },
        css: [],
        plugins: [],
        components: true,
        buildModules: [
          '@nuxt/typescript-build',
        ],
        modules: [],
        build: {
          babel: {
            presets({ isServer }) {
              return [
                [
                  require.resolve('@nuxt/babel-preset-app'),
                  {
                    buildTarget: isServer ? 'server' : 'client',
                    corejs: { version: 3 },
                  },
                ],
              ];
            },
          },
        }
      };`;

    host.overwrite(configPath, content);
  };
}

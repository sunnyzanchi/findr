module.exports = {
  stories: ['../src/**/*.stories.js'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport/register',
  ],
  webpackFinal: (config, { configType }) => {
    // Remove existing css rule
    const cssIndex = config.module.rules.findIndex(r =>
      r.test.test('index.css')
    )
    config.module.rules.splice(cssIndex, 1)

    const cssConfig = {
      test: /\.s?css$/,
      use: ['style-loader', 'astroturf/css-loader', 'sass-loader'],
    }
    const jsConfig = {
      test: /\.js$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'astroturf/loader'],
    }

    // Needed for astroturf to work with storybook
    // The package.json's browser field doesn't seem to work,
    // even with deleting resolve.alias and
    // adding resolve.aliasFields: ['browser']
    // NOTE: The actual app doesn't use preact/compat,
    // astroturf works fine with just preact
    config.resolve.alias['react'] = 'preact/compat'
    config.resolve.alias['react-dom'] = 'preact/compat'

    config.module.rules.push(cssConfig, jsConfig)
    return config
  },
}

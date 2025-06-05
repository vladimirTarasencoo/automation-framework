module.exports = {
  default: {
    require: [
      'features/step-definitions/**/*.ts',
      'features/parameter-definitions/**/*.ts',
      'src/support/**/*.ts'
    ],
    format: ['@cucumber/pretty-formatter'],
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    parallel: 2
  }
};

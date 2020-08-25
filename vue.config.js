module.exports = {
  productionSourceMap: false,
  filenameHashing: false,
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/styles/styles.module.scss";`,
      },
    },
  },
};


export default {
  methods: {
    linkGen(pageNum) {
      return pageNum === 1 ? "?page=1" : `?page=${pageNum}`;
    },
  },
};

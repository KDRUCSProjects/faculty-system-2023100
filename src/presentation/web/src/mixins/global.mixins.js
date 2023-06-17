export default {
  computed: {
    imagesResource() {
      return 'http://localhost:4000/storage/images';
    },
  },
  methods: {
    attachTableNumber(array, page, itemsPerPage) {
      return array.map((item, index) => {
        let number = index + 1 + (page - 1) * itemsPerPage;
        item['no'] = number;
        return item;
      });
    },
    buildAbbreviation(str) {
      // null length cannot be read, hence let's change it to string
      if (!str) str = '';
      let result = '';
      let upperCaseCount = 0;

      for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase() && str[i] !== str[i].toLowerCase()) {
          result += str[i];
          upperCaseCount++;
        }
      }

      if (upperCaseCount === 1 && str[0] === str[0].toUpperCase()) {
        result += str[str.length - 1];
      }

      return result.toUpperCase();
    },
  },
};

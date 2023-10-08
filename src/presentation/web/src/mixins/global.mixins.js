import moment from 'moment';
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
    downloadFile(blobFile, fileName = 'File') {
      const theFile = new File([blobFile], fileName, { type: blobFile.type });

      console.log(theFile);

      const aElement = document.createElement('a');

      // Add filename + date now
      const m = moment().format('YYYY-MM-DD | hh:mm:ss');

      aElement.setAttribute('download', `${fileName} -- ${m}`);
      const href = URL.createObjectURL(theFile);
      aElement.href = href;
      // aElement.setAttribute('href', href);
      aElement.setAttribute('target', '_blank');
      aElement.click();
      URL.revokeObjectURL(href);
    },
    resetData(data, state) {
      Object.assign(data, state());
    },
    async loadInitialData(data, loadDataInCallback) {
      data.initLoader = true;
      await loadDataInCallback();
      data.initLoader = false;
    },
    capitalizeFirstLetter(word) {
      let string = word;
      return string[0].toUpperCase() + string.slice(1);
    },
    toPashtoDigits(string) {
      var id = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
      return string.replace(/[0-9]/g, function (w) {
        return id[+w];
      });
    },
  },
};

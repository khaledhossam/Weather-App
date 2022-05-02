// javascript timestamps are in milliseconds (openweathermap using unix time)
export default {
  methods: {
    currentDate() {
      return new Date().getTime();
    },

    getTime(date) {
      return new Date(date * 1000).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
    },

    getShotDayName(date) {
      return new Date(date * 1000).toLocaleDateString('en-GB', {
        weekday: 'short',
      });
    },

    dateFormatterMixin(date) {
      const formatedDate = new Date(date * 1000).toLocaleDateString('en-GB');
      return formatedDate;
    },

    dateSubtractDays(days) {
      return (
        new Date(Date.now() - 86400000 * days).getTime() / 1000
      ).toFixed();
    },
  },
};

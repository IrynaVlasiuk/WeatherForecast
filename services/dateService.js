export const dateService = {
    isDay: () => ((new Date()).getHours() >= 6 && (new Date()).getHours() < 18),

    getDayName: (unixTimestamp) => {
        let date = new Date(unixTimestamp * 1000);
        let formattedDate = date.toISOString().slice(0, 10);
        let formattedTime = date.toLocaleTimeString();

        return new Date(formattedDate + " " + formattedTime).toLocaleString('en-us', {weekday:'long'});
    },

    getCurrentData: () => {
        let date = new Date();
        let formattedDate = date.toISOString().slice(0, 10);
        let formattedTime = date.toLocaleTimeString();

        return new Date(formattedDate + " " + formattedTime).toLocaleString('en-us', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',}
        );
    },

    getCurrentTime: () => new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', second: '2-digit'})
}
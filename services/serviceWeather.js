export const serviceWeather = {
    temperatureConverter: (valNum) => {
        return Math.round(parseFloat(valNum)-273.15);
    },

    addDataToDOMElement(selector, data) {
        let el = document.querySelector(selector);
        el.innerText = data;
    }
}
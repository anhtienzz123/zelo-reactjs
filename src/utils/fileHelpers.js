const fileHelpers = {
    getFileName: (url) => {
        const splitArrayTempt = url.split('/');
        return splitArrayTempt[splitArrayTempt.length - 1];
    },
    getFileExtension: (fileName) => {
        const splitArrayTempt = fileName.split('.');
        return splitArrayTempt[splitArrayTempt.length - 1];
    },
    convertDateStringsToServerDateObject: (dateStrings) => {
        const startTime = dateStrings[0];
        const endTime = dateStrings[1];

        const startTimeTempt = startTime.split('/');
        const endTimeTempt = endTime.split('/');

        return {
            startTime: `${startTimeTempt[2]}-${startTimeTempt[1]}-${startTimeTempt[0]}`,
            endTime: `${endTimeTempt[2]}-${endTimeTempt[1]}-${endTimeTempt[0]}`,
        };
    },
};

export default fileHelpers;

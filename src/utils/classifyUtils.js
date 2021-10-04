const classifyUtils = {


    // addClassifyToConver: (classifies, convers) => {
    //     // let newConver = [...convers];
    //     const tempConver = [];

    //     convers.forEach(conver => {
    //         classifies.forEach(classify => {
    //             let temp = classify.conversationIds.find(id => id === conver._id);
    //             if (temp) {
    //                 conver = { ...conver, classify };

    //             }
    //         })
    //         tempConver.push(conver);
    //     })

    //     return tempConver;
    // }

    getClassifyOfObject: (idConver, classifies) => {
        return classifies.find(ele => ele.conversationIds.find(id => id === idConver));
    }

}

export default classifyUtils;
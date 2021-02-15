const compareKeywords = [
    { key: ">=", value: "$gte" },
    { key: "<=", value: "$lte" },
    { key: ">", value: "$gt" },
    { key: "<", value: "$lt" },
    { key: "!", value: "$ne" }
];

const compareFilter = (key, value) => {
    for (let i = 0; i < compareKeywords.length; i++) {
        const keyword = compareKeywords[i];
        if (value.startsWith(keyword.key)) {
            const filter = {}
            filter[keyword.value] = parseInt(value.replace(keyword.key, ""))
            return filter
        }
    }
    return { key: value }
}

const filtering = (filters) => {
    const properties = Object.getOwnPropertyNames(filters)
    const results = {};
    for (let i = 0; i < properties.length; i++) {
        const key = properties[i]
        const value = filters[key];
        if (value == parseInt(value)) {
            results[key] = parseInt(value)
        } else {
            if (compareKeywords.map(kw => kw.key).find(k => value.startsWith(k)) != undefined) {
                results[key] = compareFilter(key, value)
            } else {
                results[key] = value
            }
        }
    }
    return results
}

module.exports = filtering
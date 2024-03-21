const formatNumber = (number) => {
    if (typeof number !== "number") return false;
    const num = number.toString();
    let [integer, decimal] = num.split(".");
    const doSplit = (str) => {
        if (!str) return false;
        const arr = str.split("");
        let res = [];
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0 && i % 3 === 0) res.push(",");
            res.push(arr[i]);
        }
        console.log(res.join(""));
    };
    const result = doSplit(integer);
    return result;
};

formatNumber(123);
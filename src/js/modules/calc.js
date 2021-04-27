const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size);
    const materialBlock = document.querySelector(material);
    const optionsBlock = document.querySelector(options);
    const promocodeBlock = document.querySelector(promocode);
    const resultBlock = document.querySelector(result);

    let sum=0;

    const calsFunc = () => {
        sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

        if (sizeBlock.value == "" || materialBlock.value == ""){
            resultBlock.textContent = "Выберите размер и материал картины!";
        } else if (promocodeBlock.value === "IWANTPOPART") {
            resultBlock.textContent = Math.round(sum * 0.7);
        } else {
            resultBlock.textContent = sum;
        }
    };

    sizeBlock.addEventListener('change', calsFunc);
    materialBlock.addEventListener('change', calsFunc);
    optionsBlock.addEventListener('change', calsFunc);
    promocodeBlock.addEventListener('input', calsFunc);

};

export default calc;
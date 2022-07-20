// const calc = (size, material, options, promocode, result) => {//берем данные из верстки 
//     const sizeBlock = document.querySelector(size),
//           materialBlock = document.querySelector(material),
//           optionsBlock = document.querySelector(options),
//           promocodeBlock = document.querySelector(promocode),
//           resultBlock = document.querySelector(result);
    
//     let sum = 0;

//     const calcFunction = () => {
//         sum = Math.round((+sizeBlock.value) * (+materialBlock.value) + (+optionsBlock.value));

//         if (sizeBlock.value == "" || materialBlock.value == "") {
//             resultBlock.textContent = 'Пожалуйста, выберите размер и материал картины';
//         } else if (promocodeBlock.value === "IWANTPOPART") {
//             resultBlock.textContent = Math.round(sum * 0.7);
//         } else {
//             resultBlock.textContent = sum;
//         }
//     };

//     sizeBlock.addEventListener('change', calcFunction);
//     materialBlock.addEventListener('change', calcFunction);
//     optionsBlock.addEventListener('change', calcFunction);
//     promocodeBlock.addEventListener('input', calcFunction);

// };

import {getResource} from "../services/requests";

const calc = (size, material, options, promocode, result) => { //берем данные из базы данных
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);
    
    let sum = 0, sizeValue = "", materialValue = "0", optionsValue = "0";
    let state;

    getResource('assets/db.json')
        .then(res => {
            state = res;
        })
        .catch(e => console.log(e));

    function changePrice(event, elem) {
        elem.addEventListener(event, (e) => {
            const target = e.target,
                  select = target.id;

            function calcFunc(state) {
                for (let key in state[select]) {
                    if (elem.value === key) {
                        switch(select) {
                            case 'size':
                                sizeValue = state[select][key];
                                break;
                            case 'material':
                                materialValue = state[select][key];
                                break;
                            case 'options':
                                optionsValue = state[select][key];
                                break;
                        }
                    }    
                    // console.log(state[select][key]);
                }
                sum = Math.round((+sizeValue) * (+materialValue) + (+optionsValue));

                if (sizeBlock.value == "" || materialBlock.value == "") {
                    resultBlock.value = 'Пожалуйста, выберите размер и материал картины';
                } else if (promocodeBlock.value === "IWANTPOPART") {
                    resultBlock.value = Math.round(sum * 0.7);
                } else {
                    resultBlock.value = sum;
                }
                // console.log(resultBlock.value);
            }
            calcFunc(state);
        });
    }

    changePrice('change', sizeBlock);
    changePrice('change', materialBlock);
    changePrice('change', optionsBlock);
    changePrice('input', promocodeBlock);
};

export default calc;
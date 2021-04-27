import {postData} from '../servises/requests';

// import checkNumInputs from "./checkNumInputs";

const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]')
    // checkNumInputs('input[name="user_phone"]');
    
    const message = {
        loading: "Загрузка...",
        success: "Спасибо! Скоро мы с вами свяжемся",
        failure: "Что-то пошло не так...",
        spinner: "assets/img/spinner.gif",
        ok: "assets/img/ok.png",
        fail: "assets/img/fail.png"
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = "";
        });
        upload.forEach(item => {
            item.previousElementSibling.textContent = "Файл не выбран";
        })
    };

    upload.forEach(item => {
        item.addEventListener('input', () => {
            console.log(item.files[0]);
            let dots;
            const arr = item.files[0].name.split('.');
            arr[0].length > 10 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 10) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        })
    })

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMassage = document.createElement('div');
            statusMassage.classList.add("status");
            item.parentNode.appendChild(statusMassage);

            item.classList.add("animated", 'fadeOutUp');
            setTimeout(() => {
                item.style.display = "none";
            },400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMassage.appendChild(statusImg);

            let textMessege = document.createElement('div');
            textMessege.textContent = message.loading;
            statusMassage.appendChild(textMessege);

            const formData = new FormData(item);
            let api;
            item.closest('.popup-design') || item.classList.contains("calc__form") ? api = path.designer : api = path.question;
            console.log(api)

            postData(api, formData)
                .then(res => {
                    console.log(res);
                    statusImg.setAttribute('src', message.ok);
                    textMessege.textContent = message.success;

                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessege.textContent = message.failure;
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMassage.remove();
                        item.style.display = "block";
                        item.classList.remove("fadeOutUp");
                        item.classList.add("fadeInUp");
                    }, 5000);                  
                });
        });
    });
};

export default forms;
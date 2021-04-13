const modals = () => {
    function bindModal(triggerSelectr, modalSelector, closeSelector, closeClickOverlay = true) {
        const trigger = document.querySelectorAll(triggerSelectr),
              modal = document.querySelector(modalSelector),
              close = document.querySelector(closeSelector),
              windows = document.querySelectorAll('[data-modal]'),
              scroll = calcScroll();
              
            function showWindows(){
                windows.forEach(item => {
                    item.style.display = "none";
                });

                modal.style.display = "block";
                
                document.body.style.overflow = "hidden";
                // document.body.classList.add('modal-open');
                document.body.style.marginRight = `${scroll}px`;
            }
            function closeModal(){
                windows.forEach(item => {
                    item.style.display = "none";
                });
                modal.style.display = "none";
                document.body.style.overflow = "";
                // document.body.classList.remove('modal-open');
                document.body.style.marginRight = `0px`;
            }

        trigger.forEach(item => {
            item.addEventListener('click', (e) => {
                if (e.target) {
                    e.preventDefault();
                }
                showWindows();
            });
        });

        close.addEventListener("click", () => {
            closeModal();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal && closeClickOverlay){
                closeModal();
            } 
        });
    }

    function showModalByTime(selector, time) {
        setTimeout(function() {
            let display;

            document.querySelectorAll("[data-modal]").forEach(item => {
                if (getComputedStyle(item).display !== "none") {
                    display = "block";
                }
            })
            if (!display) {
                document.querySelector(selector).style.display = "block";
                document.body.style.overflow = "hidden";
                // document.body.classList.remove('modal-open');
                document.body.style.marginRight = `0px`;
            }
        }, time);
    }

    function calcScroll() {
        let div = document.createElement('div');
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.overflowY = "scroll";
        div.style.visibility = "hidden";

        document.body.appendChild(div);
        let scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        console.log(scrollWidth);
        return scrollWidth;
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');

    showModalByTime(".popup-consultation", 3000);

    
};
export default modals;
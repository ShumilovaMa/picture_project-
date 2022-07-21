const accordion = (triggersSelector, itemsSelector) => {

    const btns = document.querySelectorAll(triggersSelector),
          blocks = document.querySelectorAll(itemsSelector);

    blocks.forEach(block => {
        block.classList.add('animated', 'fadeInDown');
    });

    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.classList.contains('active')) {
                this.classList.remove('active', 'active-style');
            } else {
                btns.forEach(btn => {
                    btn.classList.remove('active', 'active-style');
                });
                this.classList.add('active', 'active-style');
                btn.style.color = '#86b7d2';
            }
        });
    });

    //реализация аккордеона без автоматического сворачивания текста при нажатии на следующий триггер
    // btns.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         this.classList.toggle('active-style');
    //         this.nextElementSibling.classList.toggle('active-content');

    //         if (this.classList.contains('active-style')) {
    //             this.nextElementSibling.style.maxHeight =  this.nextElementSibling.scrollHeight + 80 + "px";
    //         } else {
    //             this.nextElementSibling.style.maxHeight = "0px";
    //         }
    //     });
    // });

    //реализация аккордеона при помощи css-стилей
    // blocks.forEach(block => {
    //     block.classList.add('animated', 'fadeInDown');
    // });

    // btns.forEach(btn => {
    //     btn.addEventListener('click', function() {
    //         if (!this.classList.contains('active')) {
    //             btns.forEach(btn => {
    //                 btn.classList.remove('active', 'active-style');
    //             });
    //             this.classList.add('active', 'active-style');
    //         }
    //     });
    // });

    
};

export default accordion;
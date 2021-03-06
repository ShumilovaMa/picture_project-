const filter = () => {
    const menu = document.querySelector('.portfolio-menu'),
          items = menu.querySelectorAll('li'),
          wrapper = document.querySelector('.portfolio-wrapper'),
          markAll = wrapper.querySelectorAll('.all'),
          no = document.querySelector('.portfolio-no');

    const typeFilter = (markType) => {
        markAll.forEach(item => {
            item.style.display = "none";
            item.classList.remove('animated', 'fadeIn');
        });

        no.style.display = "none";
        no.classList.remove('animated', 'fadeIn');

        if (markType) {
            markType.forEach(mark => {
                mark.style.display = "block";
                mark.classList.add('animated', 'fadeIn');
            });
        } else {
            no.style.display = "block";
            no.classList.add('animated', 'fadeIn');
        }
    };

    menu.addEventListener('click', (e) => {
        let target = e.target,
            classSelector = e.target.classList[0],
            allElems = wrapper.querySelectorAll(`.${classSelector}`);

        typeFilter(allElems);

        if (target && target.tagName == "LI") {
            items.forEach(item => {
                item.classList.remove('active');
            });
            target.classList.add('active');
        }

        if (classSelector == 'granddad' || classSelector == 'grandmother') {
            no.style.display = 'block';
            no.classList.add('animated', 'fadeIn');
        }
    });
};

export default filter;
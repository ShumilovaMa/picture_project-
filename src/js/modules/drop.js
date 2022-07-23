const drop = () => {
    // drag *
    // dragend *
    // dragenter
    // dragexit *
    // dragleave 
    // dragover
    // dragstart * 
    // drop
    // * - события, которые срабатывают на элементе, который мы перетаскиваем 
    
    const fileInputs = document.querySelectorAll('[name="upload"]');

    //массив событий, котрые мы будем применять к inputам
    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = "5px solid yellow";
        item.closest('.file_upload').style.backgroundColor = "rgba(0,0,0, .7)";
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = "none";
        if (item.closest('.calc_form')) {
            item.closest('.file_upload').style.backgroundColor = "#fff";
        } else {
            item.closest('.file_upload').style.backgroundColor = "#ededed";
        }
    }   

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;//помещаем файл в инпут

            if (input.closest('main')) {
 
                const formData = new FormData();
                formData.append('file', input.files[0]);
                
                const postData = async (url, data) => {
                    let res = await fetch(url, {
                        method: "POST",
                        body: data
                    });
                    return await res.text();
                };
 
                postData('assets/server.php', formData)
                    .then(res => console.log(res))
                    .catch(() => console.log('Ошибка'));
            }

            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].length > 6 ? dots = "..." : dots = ".";
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
        });
    });
};

export default drop;
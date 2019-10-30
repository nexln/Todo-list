 const form = document.getElementsByTagName('form')[0];
  let listWrapper = document.querySelector('.list');
  let searchField = document.querySelector('[name="search"]');
  let sortField = document.querySelector('[name="order"]');

  let toDo = [];

  if (localStorage.getItem('task')!== null) {
    toDo = JSON.parse(localStorage.getItem('task'));
    renderHtml(toDo);
  }

  function formatDate(date) {

    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear();

    return dd + '.' + mm + '.' + yy;
  }

  function formatTime(time) {

    let hh = time.getHours();
    let min = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();

    return hh + ':' + min;
  }

  form.onsubmit = function (event) {
    event.preventDefault();

    let d = new Date();
    let day = formatDate(d);
    let time = formatTime(d);

    let item = {
      date: day + ' ' + time,
      text: null,
      statusTask: '#E0FFFF',
      statusCheckDone: null,
      statusCheckNotDone: null,
    };
    toDo.push(item);

    form.reset();
    localStorage.setItem('task', JSON.stringify(toDo));
    renderHtml(toDo);
  };

  function renderHtml(array) {
    listWrapper.innerHTML = '';
    array.forEach(function (pet, i) {
      let card = renderCard(pet, i);
      listWrapper.appendChild(card);
    });
  }

  function renderCard(data, i) {
    let li = document.createElement('li');
    li.classList.add('list-group-item');
    li.style.backgroundColor = data.statusTask;

    let div = document.createElement('div');
    div.classList.add('float-right');
    div.textContent = data.date;

    let checkDiv = document.createElement('div');
    checkDiv.classList.add('col');

    let checkDivDone = document.createElement('div');
    checkDivDone.classList.add('form-check');

    // let h5 = document.createElement('h5');

    let labelForDoneCheck = document.createElement('label');
    labelForDoneCheck.classList.add('form-check-label');
    labelForDoneCheck.textContent = 'Done';

    let doneCheck = document.createElement('input');
    doneCheck.type = 'checkbox';
    doneCheck.classList.add('form-check-input');
    doneCheck.checked = data.statusCheckDone;
    doneCheck.onclick = function () {
      data.statusTask = '#7FFF00';
      data.statusCheckDone = true;
      data.statusCheckNotDone = false;
      localStorage.setItem('task', JSON.stringify(toDo));
      renderHtml(toDo);
    };

    let checkDivNotDone = document.createElement('div');
    checkDivNotDone.classList.add('form-check');

    let labelForNotDoneCheck = document.createElement('label');
    labelForNotDoneCheck.classList.add('form-check-label');
    labelForNotDoneCheck.textContent = 'Not done';

    let notDoneCheck = document.createElement('input');
    notDoneCheck.type = 'checkbox';
    notDoneCheck.classList.add('form-check-input');
    notDoneCheck.checked = data.statusCheckNotDone;
    notDoneCheck.onclick = function () {
      data.statusTask = '#FF0000';
      data.statusCheckDone = false;
      data.statusCheckNotDone = true;
      localStorage.setItem('task', JSON.stringify(toDo));
      renderHtml(toDo);
    };


    let h3 = document.createElement('h3');

    // var span = document.createElement('span');
    // span.textContent = data.animal;

    const button = document.createElement('button');
    button.classList.add('btn', 'btn-danger', 'btn-sm', 'ml-2');
    button.textContent = 'Delete';
    button.onclick = function () {
      toDo.splice(i, 1);
      localStorage.setItem('task', JSON.stringify(toDo));
      renderHtml(toDo);
    };


    const saveButton = document.createElement('button');
    saveButton.classList.add('btn', 'btn-success', 'btn-sm', 'ml-2');
    saveButton.textContent = 'Ok';
    saveButton.onclick = function () {
      data.text = ta.value;
      localStorage.setItem('task', JSON.stringify(toDo));
      renderHtml(toDo);
    };


    const ta = document.createElement('textarea');
    ta.classList.add('form-control');
    ta.style.backgroundColor = 'transparent';
    ta.style.border = 'none';
    ta.placeholder = 'Description';
    ta.textContent = data.text;

    h3.appendChild(button);
    h3.appendChild(saveButton);
    li.appendChild(div);
    checkDivDone.appendChild(doneCheck);
    checkDivDone.appendChild(labelForDoneCheck);
    checkDivNotDone.appendChild(notDoneCheck);
    checkDivNotDone.appendChild(labelForNotDoneCheck);
    li.appendChild(h3);
    li.appendChild(checkDiv);
    checkDiv.appendChild(checkDivDone);
    checkDiv.appendChild(checkDivNotDone);
    li.appendChild(ta);

    return li;
  }

  searchField.oninput = function () {
    console.log("искомый текст:", searchField.value);

    let filteredClients = toDo.filter(function (toDo) {
      return toDo.text.toLowerCase().includes(searchField.value.toLowerCase());
    });

    renderHtml(filteredClients);
  };

  sortField.onchange = function () {
    let copyTodo = toDo.slice();
    let doneArr = [];
    let notDoneArr = [];
    if (sortField.value === "done") {
      copyTodo.forEach(function (item) {
        if (item.statusCheckDone === true) {
          doneArr.push(item);
          renderHtml(doneArr);
        }
      });
    } else if (sortField.value === "nDone") {
      copyTodo.forEach(function (item) {
        if (item.statusCheckDone === false) {
          notDoneArr.push(item);
          console.log(notDoneArr);
          renderHtml(notDoneArr);
        }
      });
    } else if (sortField.value === "all") {
      renderHtml(toDo);
    }
  };
(function () {
    if (typeof window.CustomEvent === "function") return false;
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: null };
        let evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    window.CustomEvent = CustomEvent;
})();

$modal_window_calendar = function (options) {
    let
        _elemModal,
        _eventShowModal,
        _eventHideModal,
        _hiding = false,
        _destroyed = false,
        _animationSpeed = 200;

    function _createModal(options) {
        let
            elemModal = document.createElement('div'),
            modalTemplate = '<div class="modal__backdrop" data-dismiss="modal">' +
                '<div class="modal__content">' +
                '<div className="calendar-wrapper">'+
                    '<button id="btnPrev" type="button">{{last}}</button>' +
                    '<button id="btnNext" type="button">{{next}}</button>' +
                    '<div id="divCal"></div>' +
                '</div>' +
                '</div>',
            modalHTML;

        elemModal.classList.add('modal');
        modalHTML = modalTemplate.replace('{{title}}', options.title || 'Сводная таблица');
        modalHTML = modalHTML.replace('{{last}}', options.content || 'Предыдущий');
        modalHTML = modalHTML.replace('{{next}}', options.content || 'Следующий');
        modalHTML = modalHTML.replace('{{body-table4}}', options.content || 'Следующий');
        elemModal.innerHTML = modalHTML;
        document.body.appendChild(elemModal);
        return elemModal;
    }

    function _showModal() {
        if (!_destroyed && !_hiding) {
            _elemModal.classList.add('modal__show');
            document.dispatchEvent(_eventShowModal);
        }
    }

    function _hideModal() {
        _hiding = true;
        _elemModal.classList.remove('modal__show');
        _elemModal.classList.add('modal__hiding');
        setTimeout(function () {
            _elemModal.classList.remove('modal__hiding');
            _hiding = false;
        }, _animationSpeed);
        document.dispatchEvent(_eventHideModal);
    }

    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === 'modal') {
            _hideModal();
        }
    }

    _elemModal = _createModal(options || {});


    _elemModal.addEventListener('click', _handlerCloseModal);
    _eventShowModal = new CustomEvent('show.modal', { detail: _elemModal });
    _eventHideModal = new CustomEvent('hide.modal', { detail: _elemModal });

    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
            _elemModal.parentElement.removeChild(_elemModal),
                _elemModal.removeEventListener('click', _handlerCloseModal),
                _destroyed = true;
        },
        setContent: function (html) {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        },
        setTitle: function (text) {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
};

//Modal-window-report-1

$modal_window_report_1 = function (options) {
    let
        _elemModal,
        _eventShowModal,
        _eventHideModal,
        _hiding = false,
        _destroyed = false,
        _animationSpeed = 200;

    function _createModal(options) {
        let
            elemModal = document.createElement('div'),
            modalTemplate = '<div class="modal__backdrop" data-dismiss="modal">' +
                '<div class="modal__content">' +
                '</span>' +
                '<div class="modal__header">' +
                '<div class="modal__title" data-modal="title">{{title}}</div>' +
                '<div class="modal__group" data-modal="title">{{group}}</div>' +
                '<a href="#" onClick="window.print()">'+
                '<img src="Layer%204.png" class="picture-print" alt="картинка печати" width="50">'+
                '</a>'+
                '</div>' +
                '<div class="modal__body" id="modal__body__report">' +
                '<table id="foo-summary" class="table-report">'+
                '<tbody id="bar-summary" class="body-table">'+
                '<tr>'+
                '<td class="block-table"></td>' +
                '<td class="block-table">{{body-week-number}}</td>' +
                '<td class="block-table">{{body-week-number1}}</td>' +
                '<td class="block-table">{{body-week-number2}}</td>' +
                '<td class="block-table"></td>' +
                '</tr>'+
                '<tr>'+
                '<td class="block-table"></td>' +
                '<td class="block-table">'+
                '<table class="includes-table">'+
                '<tr>'+
                '<td class="left-block" id="block-table-tr-left">{{block-table-tr-left}}</td>' +
                '<td class="right-block" id="block-table-tr-right">{{block-table-tr-right}}</td>' +
                '</tr>'+
                '</table>'+
                '</td>' +
                '<td class="block-table">'+
                '<table class="includes-table">'+
                    '<tr>'+
                        '<td class="left-block">{{body-table3}}</td>' +
                        '<td class="right-block">{{body-table4}}</td>' +
                        '</tr>'+
                    '</table>'+
                '</td>' +
                '<td class="block-table">'+
                '<table class="includes-table">'+
                '<tr>'+
                '<td class="left-block">{{body-table3.1}}</td>' +
                '<td class="right-block">{{body-table4.1}}</td>' +
                '</tr>'+
                '</table>'+
                '</td>' +
                '<td class="block-table"></td>' +
                '</tr>'+
                '<tr>'+
                '</tbody>'+
                '</table>' +
                '</div>' +
              '<div class = "block-modal-button">' +
              '<button class="modal-btn btn-add">{{body-table5}}</button>'+
              '<button class="modal-btn btn-save">{{body-table6}}</button>'+
              '</div>'+
                '</div>' +
                '</div>',
            modalHTML;

        elemModal.classList.add('modal');
        modalHTML = modalTemplate.replace('{{title}}', options.title || 'Сводная таблица');
        modalHTML = modalHTML.replace('{{group}}', options.content || 'УВП-221');
        modalHTML = modalHTML.replace('{{body-week-number}}', options.content || 'Номер учебной недели');
        modalHTML = modalHTML.replace('{{body-week-number1}}', options.content || 'Неделя 1');
        modalHTML = modalHTML.replace('{{body-week-number2}}', options.content || 'Неделя 2');
        modalHTML = modalHTML.replace('{{block-table-tr-left}}', options.content || 'ФИО студента');
        modalHTML = modalHTML.replace('{{block-table-tr-right}}', options.content || 'Вид пропуска');
        modalHTML = modalHTML.replace('{{body-table3}}', options.content || 'Прогул');
        modalHTML = modalHTML.replace('{{body-table4}}', options.content || 'уважит. проп.');
        modalHTML = modalHTML.replace('{{body-table3.1}}', options.content || 'Прогул');
        modalHTML = modalHTML.replace('{{body-table4.1}}', options.content || 'уважит. проп.');
        modalHTML = modalHTML.replace('{{body-table5}}', options.content || 'Добавить');
        modalHTML = modalHTML.replace('{{body-table6}}', options.content || 'Сохранить');
        elemModal.innerHTML = modalHTML;
        document.body.appendChild(elemModal);
        return elemModal;
    }

    let strKol = 0;
    let masObj = [];

    function addString(){
        ++strKol;
        let template = `<tr><td class="block-table summary-id">${strKol}</td>
                <td class="block-table summary-name" contenteditable="true"></td>
               <td class="block-table" contenteditable="true">
               <table class="includes-table">
               <tr>
               <td class="left-block summary-truancy-week_1"></td>
               <td class="right-block good-reason-week_1"></td>
               </tr>
               </table></td>
               <td class="block-table" contenteditable="true">
               <table class="includes-table">
               <tr>
               <td class="left-block summary-truancy-week_2"></td>
               <td class="right-block good-reason-week_2"></td>
               </tr>
               </table></td>
               <td class="block-table" contenteditable="true">
              </table></td>`;
        document.getElementById("foo-summary").insertAdjacentHTML("beforeend", template);
    }

    function saveTable (){
        let allId = Array.from(document.querySelectorAll('.summary-id'), node => node.textContent),
          allName = Array.from(document.querySelectorAll('.summary-name'), node => node.textContent),
          allTruancyWeek1 = Array.from(document.querySelectorAll('.summary-truancy-week_1'), node => node.textContent),
          allGoodReasonWeek1 = Array.from(document.querySelectorAll('.good-reason-week_1'), node => node.textContent),
          allTruancyWeek2 = Array.from(document.querySelectorAll('.summary-truancy-week_2'), node => node.textContent),
          allGoodReasonWeek2 = Array.from(document.querySelectorAll('.good-reason-week_2'), node => node.textContent);

        let myObj = {};

        for (let i = 0; i < strKol; ++i) {
            myObj.id = allId[i];
            myObj.name = allName[i];
            myObj.truancyWeek1 = allTruancyWeek1[i];
            myObj.goodReasonWeek1 = allGoodReasonWeek1[i];
            myObj.truancyWeek2 = allTruancyWeek2[i];
            myObj.goodReasonWeek2 = allGoodReasonWeek2[i];
            console.log(myObj);
            masObj.push(myObj);
            console.log(masObj);
        }
    };


    function _showModal() {
        if (!_destroyed && !_hiding) {
            _elemModal.classList.add('modal__show');
            document.dispatchEvent(_eventShowModal);

        };
        document.querySelector(".btn-add").addEventListener("click", addString, false);
        document.querySelector(".btn-save").addEventListener("click", saveTable, false);
    }


    function _hideModal() {
        _hiding = true;
        _elemModal.classList.remove('modal__show');
        _elemModal.classList.add('modal__hiding');
        setTimeout(function () {
            _elemModal.classList.remove('modal__hiding');
            _hiding = false;
        }, _animationSpeed);
        document.dispatchEvent(_eventHideModal);
        document.querySelector(".btn-add").removeEventListener("click", addString, false);
        document.querySelector(".btn-save").removeEventListener("click", saveTable, false);
    }

    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === 'modal') {
            _hideModal();
        }
    }

    _elemModal = _createModal(options || {});


    _elemModal.addEventListener('click', _handlerCloseModal);
    _eventShowModal = new CustomEvent('show.modal', { detail: _elemModal });
    _eventHideModal = new CustomEvent('hide.modal', { detail: _elemModal });

    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
            _elemModal.parentElement.removeChild(_elemModal),
                _elemModal.removeEventListener('click', _handlerCloseModal),
                _destroyed = true;
        },
        setContent: function (html) {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        },
        setTitle: function (text) {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
};

//Modal-window-missing-class-1

$modal_window_missing_class_1 = function (options) {
    let
        _elemModal,
        _eventShowModal,
        _eventHideModal,
        _hiding = false,
        _destroyed = false,
        _animationSpeed = 200;

    function _createModal(options) {
        let
            elemModal = document.createElement('div'),
            modalTemplate = '<div class="modal__backdrop" data-dismiss="modal">' +
                '<div class="modal__content">' +
                '<span class="modal__btn-close" data-dismiss="modal" title="Закрыть">' +
                '×</span>' +
                '<div class="modal__header">' +
                '<div class="modal__title" data-modal="title">{{title}}</div>' +
                '<div class="modal__group" data-modal="title">{{group}}</div>' +
                '</div>' +
                '<div class="modal__body" id="modal__body__report">' +
                '<table class="table-report">'+
                '<tbody class="body-table">'+
                '<tr>'+
                '<td class="block-table" contenteditable="true">{{body-table5}}</td>' +
                '<td class="block-table" contenteditable="true">{{body-table6}}</td>' +
                '<td class="block-table" class="td-buttons">' +
                '<button class="modal-btn-good-reason">{{btn-good-reason}}</button>'+
                '<button class="modal-btn-bad-reason">{{btn-bad-reason}}</button>'+
                '</td>' +
                '</tr>'+
                '<tr>'+
                '<td class="block-table" contenteditable="true">{{body-table9}}</td>' +
                '<td class="block-table" contenteditable="true">{{body-table10}}</td>' +
                '<td class="block-table" class="td-buttons">' +
                '<button class="modal-btn-good-reason">{{btn-good-reason}}</button>'+
                '<button class="modal-btn-bad-reason">{{btn-bad-reason}}</button>'+
                '</td>' +
                '</tr>'+
                '<tr>'+
                '<td class="block-table" contenteditable="true">{{body-table13}}</td>' +
                '<td class="block-table" contenteditable="true">{{body-table14}}</td>' +
                '<td class="block-table" class="td-buttons">' +
                '<button class="modal-btn-good-reason">{{btn-good-reason}}</button>'+
                '<button class="modal-btn-bad-reason">{{btn-bad-reason}}</button>'+
                '</td>' +
                '</tr>'+
                '</tbody>'+
                '</table>' +
                '</div>' +
                '</div>' +
                '</div>',
            modalHTML;

        elemModal.classList.add('modal');
        modalHTML = modalTemplate.replace('{{title}}', options.title || '7 пара');
        modalHTML = modalHTML.replace('{{group}}', options.content || 'Общий курс транспорта');
        modalHTML = modalHTML.replace('{{btn-good-reason}}', options.content || 'Уваж');
        modalHTML = modalHTML.replace('{{btn-good-reason}}', options.content || 'Уваж');
        modalHTML = modalHTML.replace('{{btn-good-reason}}', options.content || 'Уваж');
        modalHTML = modalHTML.replace('{{btn-bad-reason}}', options.content || 'Неуваж');
        modalHTML = modalHTML.replace('{{btn-bad-reason}}', options.content || 'Неуваж');
        modalHTML = modalHTML.replace('{{btn-bad-reason}}', options.content || 'Неуваж');
        modalHTML = modalHTML.replace('{{body-table5}}', options.content || '1');
        modalHTML = modalHTML.replace('{{body-table6}}', options.content || 'Адамович Никита Викторович');
        modalHTML = modalHTML.replace('{{body-table7}}', options.content || '2');
        modalHTML = modalHTML.replace('{{body-table8}}', options.content || '0');
        modalHTML = modalHTML.replace('{{body-table9}}', options.content || '2');
        modalHTML = modalHTML.replace('{{body-table10}}', options.content || 'Алексеенко Екатерина Анатольевна');
        modalHTML = modalHTML.replace('{{body-table13}}', options.content || '3');
        modalHTML = modalHTML.replace('{{body-table14}}', options.content || 'Ахмедов Фазлидин Фаридунович');
        elemModal.innerHTML = modalHTML;
        document.body.appendChild(elemModal);
        return elemModal;
    }

    function _showModal() {
        if (!_destroyed && !_hiding) {
            _elemModal.classList.add('modal__show');
            document.dispatchEvent(_eventShowModal);
        }
    }

    function _hideModal() {
        _hiding = true;
        _elemModal.classList.remove('modal__show');
        _elemModal.classList.add('modal__hiding');
        setTimeout(function () {
            _elemModal.classList.remove('modal__hiding');
            _hiding = false;
        }, _animationSpeed);
        document.dispatchEvent(_eventHideModal);
    }

    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === 'modal') {
            _hideModal();
        }
    }

    _elemModal = _createModal(options || {});


    _elemModal.addEventListener('click', _handlerCloseModal);
    _eventShowModal = new CustomEvent('show.modal', { detail: _elemModal });
    _eventHideModal = new CustomEvent('hide.modal', { detail: _elemModal });

    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
            _elemModal.parentElement.removeChild(_elemModal),
                _elemModal.removeEventListener('click', _handlerCloseModal),
                _destroyed = true;
        },
        setContent: function (html) {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        },
        setTitle: function (text) {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
};

//Modal-window-missing-class-2

$modal_window_missing_class_2 = function (options) {
    let
        _elemModal,
        _eventShowModal,
        _eventHideModal,
        _hiding = false,
        _destroyed = false,
        _animationSpeed = 200;

    function _createModal(options) {
        let
            elemModal = document.createElement('div'),
            modalTemplate = '<div class="modal__backdrop" data-dismiss="modal">' +
                '<div class="modal__content">' +
                '<span class="modal__btn-close" data-dismiss="modal" title="Закрыть">' +
                '×</span>' +
                '<div class="modal__header">' +
                '<div class="modal__title" data-modal="title">{{title}}</div>' +
                '<div class="modal__group" data-modal="title">{{group}}</div>' +
                '</div>' +
                '<div class="modal__body" id="modal__body__report">' +
                '<table class="table-report">'+
                '<tbody class="body-table">'+
                '<tr>'+
                '<td class="block-table" contenteditable="true">{{body-table5}}</td>' +
                '<td class="block-table" contenteditable="true">{{body-table6}}</td>' +
                '<td class="block-table" class="td-buttons">' +
                '<button class="modal-btn-good-reason">{{btn-good-reason}}</button>'+
                '<button class="modal-btn-bad-reason">{{btn-bad-reason}}</button>'+
                '</td>' +
                '</tr>'+
                '<tr>'+
                '<td class="block-table" contenteditable="true">{{body-table9}}</td>' +
                '<td class="block-table" contenteditable="true">{{body-table10}}</td>' +
                '<td class="block-table" class="td-buttons">' +
                '<button class="modal-btn-good-reason">{{btn-good-reason}}</button>'+
                '<button class="modal-btn-bad-reason">{{btn-bad-reason}}</button>'+
                '</td>' +
                '</tr>'+
                '<tr>'+
                '<td class="block-table" contenteditable="true">{{body-table13}}</td>' +
                '<td class="block-table" contenteditable="true">{{body-table14}}</td>' +
                '<td class="block-table" class="td-buttons">' +
                '<button class="modal-btn-good-reason">{{btn-good-reason}}</button>'+
                '<button class="modal-btn-bad-reason">{{btn-bad-reason}}</button>'+
                '</td>' +
                '</tr>'+
                '</tbody>'+
                '</table>' +
                '</div>' +
                '</div>' +
                '</div>',
            modalHTML;

        elemModal.classList.add('modal');
        modalHTML = modalTemplate.replace('{{title}}', options.title || '8 пара');
        modalHTML = modalHTML.replace('{{group}}', options.content || 'Общий курс транспорта');
        modalHTML = modalHTML.replace('{{btn-good-reason}}', options.content || 'Уваж');
        modalHTML = modalHTML.replace('{{btn-good-reason}}', options.content || 'Уваж');
        modalHTML = modalHTML.replace('{{btn-good-reason}}', options.content || 'Уваж');
        modalHTML = modalHTML.replace('{{btn-bad-reason}}', options.content || 'Неуваж');
        modalHTML = modalHTML.replace('{{btn-bad-reason}}', options.content || 'Неуваж');
        modalHTML = modalHTML.replace('{{btn-bad-reason}}', options.content || 'Неуваж');
        modalHTML = modalHTML.replace('{{body-table5}}', options.content || '1');
        modalHTML = modalHTML.replace('{{body-table6}}', options.content || 'Адамович Никита Викторович');
        modalHTML = modalHTML.replace('{{body-table7}}', options.content || '2');
        modalHTML = modalHTML.replace('{{body-table8}}', options.content || '0');
        modalHTML = modalHTML.replace('{{body-table9}}', options.content || '2');
        modalHTML = modalHTML.replace('{{body-table10}}', options.content || 'Алексеенко Екатерина Анатольевна');
        modalHTML = modalHTML.replace('{{body-table13}}', options.content || '3');
        modalHTML = modalHTML.replace('{{body-table14}}', options.content || 'Ахмедов Фазлидин Фаридунович');
        elemModal.innerHTML = modalHTML;
        document.body.appendChild(elemModal);
        return elemModal;
    }

    function _showModal() {
        if (!_destroyed && !_hiding) {
            _elemModal.classList.add('modal__show');
            document.dispatchEvent(_eventShowModal);
        }
    }

    function _hideModal() {
        _hiding = true;
        _elemModal.classList.remove('modal__show');
        _elemModal.classList.add('modal__hiding');
        setTimeout(function () {
            _elemModal.classList.remove('modal__hiding');
            _hiding = false;
        }, _animationSpeed);
        document.dispatchEvent(_eventHideModal);
    }

    function _handlerCloseModal(e) {
        if (e.target.dataset.dismiss === 'modal') {
            _hideModal();
        }
    }

    _elemModal = _createModal(options || {});


    _elemModal.addEventListener('click', _handlerCloseModal);
    _eventShowModal = new CustomEvent('show.modal', { detail: _elemModal });
    _eventHideModal = new CustomEvent('hide.modal', { detail: _elemModal });

    return {
        show: _showModal,
        hide: _hideModal,
        destroy: function () {
            _elemModal.parentElement.removeChild(_elemModal),
                _elemModal.removeEventListener('click', _handlerCloseModal),
                _destroyed = true;
        },
        setContent: function (html) {
            _elemModal.querySelector('[data-modal="content"]').innerHTML = html;
        },
        setTitle: function (text) {
            _elemModal.querySelector('[data-modal="title"]').innerHTML = text;
        }
    }
};

//calendar

var Cal = function(divId) {
    //Сохраняем идентификатор div
    this.divId = divId;
    // Дни недели с понедельника
    this.DaysOfWeek = [
        'Пн',
        'Вт',
        'Ср',
        'Чтв',
        'Птн',
        'Суб',
        'Вск'
    ];
    // Месяцы начиная с января
    this.Months =['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    //Устанавливаем текущий месяц, год
    var d = new Date();
    this.currMonth = d.getMonth();
    this.currYear = d.getFullYear();
    this.currDay = d.getDate();
};
// Переход к следующему месяцу
Cal.prototype.nextMonth = function() {
    if ( this.currMonth == 11 ) {
        this.currMonth = 0;
        this.currYear = this.currYear + 1;
    }
    else {
        this.currMonth = this.currMonth + 1;
    }
    this.showcurr();
};
// Переход к предыдущему месяцу
Cal.prototype.previousMonth = function() {
    if ( this.currMonth == 0 ) {
        this.currMonth = 11;
        this.currYear = this.currYear - 1;
    }
    else {
        this.currMonth = this.currMonth - 1;
    }
    this.showcurr();
};
// Показать текущий месяц
Cal.prototype.showcurr = function() {
    this.showMonth(this.currYear, this.currMonth);
};
// Показать месяц (год, месяц)
Cal.prototype.showMonth = function(y, m) {
    var d = new Date()
        // Первый день недели в выбранном месяце
        , firstDayOfMonth = new Date(y, m, 7).getDay()
        // Последний день выбранного месяца
        , lastDateOfMonth =  new Date(y, m+1, 0).getDate()
        // Последний день предыдущего месяца
        , lastDayOfLastMonth = m == 0 ? new Date(y-1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    var html = '<table>';
    // Запись выбранного месяца и года
    html += '<thead><tr>';
    html += '<td colspan="7">' + this.Months[m] + ' ' + y + '</td>';
    html += '</tr></thead>';
    // заголовок дней недели
    html += '<tr class="days">';
    for(var i=0; i < this.DaysOfWeek.length;i++) {
        html += '<td>' + this.DaysOfWeek[i] + '</td>';
    }
    html += '</tr>';
    // Записываем дни
    var i=1;
    do {
        var dow = new Date(y, m, i).getDay();
        // Начать новую строку в понедельник
        if ( dow == 1 ) {
            html += '<tr>';
        }
        // Если первый день недели не понедельник показать последние дни предыдущего месяца
        else if ( i == 1 ) {
            html += '<tr>';
            var k = lastDayOfLastMonth - firstDayOfMonth+1;
            for(var j=0; j < firstDayOfMonth; j++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }
        // Записываем текущий день в цикл
        var chk = new Date();
        var chkY = chk.getFullYear();
        var chkM = chk.getMonth();
        if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
            html += '<td class="today">' + i + '</td>';
        } else {
            html += '<td class="normal">' + i + '</td>';
        }
        // закрыть строку в воскресенье
        if ( dow == 0 ) {
            html += '</tr>';
        }
        // Если последний день месяца не воскресенье, показать первые дни следующего месяца
        else if ( i == lastDateOfMonth ) {
            var k=1;
            for(dow; dow < 7; dow++) {
                html += '<td class="not-current">' + k + '</td>';
                k++;
            }
        }
        i++;
    }while(i <= lastDateOfMonth);
    // Конец таблицы
    html += '</table>';
    // Записываем HTML в div
    document.getElementById(this.divId).innerHTML = html;
};
// При загрузке окна
window.onload = function() {
    // Начать календарь
    let c = new Cal("divCal");
    c.showcurr();
    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function() {
        c.nextMonth();
    };
    getId('btnPrev').onclick = function() {
        c.previousMonth();
    };
}
// Получить элемент по id
function getId(id) {
    return document.getElementById(id);
}

//слайдер

$('.left').on('click', function() {

    let active = document.querySelector('.today');
    let classNames = [...document.querySelectorAll('.day-block')];
    let index = classNames.indexOf(active);

    if(index === 0){
        return;
    }

    if(index === 6){
        classNames[index].classList.remove('today');
        classNames[index-1].classList.add('today');
        return;
    }

    classNames[index].classList.remove('today');
    classNames[index-1].classList.add('today');


    var count = $('.lessons-blocks-days div').length;
    var columns = 3;
    var columnWidth = 100 / columns;

    if (count <= columns) return;

    var leftItem = $('.lessons-blocks-days').data('left item');
    if (typeof leftItem === "undefined") {
        leftItem = 0;
    }

    leftItem = leftItem - 1;
    if (leftItem < 0) leftItem = 0;
    $('.lessons-blocks-days').data('left item', leftItem);

   $('.lessons-blocks-days').css('margin-left', -columnWidth * leftItem + '%');

});

$('.right').on('click', function() {

    let active = document.querySelector('.today');
    let classNames = [...document.querySelectorAll('.day-block')];
    let index = classNames.indexOf(active);

    if(index === 0){
        classNames[index].classList.remove('today');
        classNames[index+1].classList.add('today');
        return;
    }

    if(index === 6){
        return;
    }

    classNames[index].classList.remove('today');
    classNames[index+1].classList.add('today');

    if(index === 5){
        return;
    }



    var count = $('.lessons-blocks-days div').length;
    var columns = 3;
    var columnWidth = 100 / columns;


    if (count <= columns) return;

    var leftItem = $('.lessons-blocks-days').data('left item');
    if (typeof leftItem === "undefined") {
        leftItem = 0;
    }

    leftItem = leftItem + 1;
    if ((leftItem + columns) > count) leftItem = count - columns;
    $('.lessons-blocks-days').data('left item', leftItem);

    $('.lessons-blocks-days').css('margin-left', -columnWidth * leftItem +  '%');

});

//document.getElementsByClassName("btn-save").addEventListener("click", () => {

//})




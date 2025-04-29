class Calendar {
    init() {
        this.calendar = document.querySelector('#calendar');
        this.monthYyear = this.calendar.querySelector('.month_year>span');
        this.daysContainer = this.calendar.querySelector('.days_container');
        this.TRANSITION_DURATION = 0.3;
        this.THRESHOLD_SPEED = 0.5;

        this.calendar.addEventListener('click', e => {
            if (e.target.closest('[data-about="today"]')) {
                this.start()
            } else if (e.target.closest('[data-about]')) {
                const dir = e.target.closest('[data-about]').dataset.about;
                this.changeMonth(dir)
            }
        });

        document.addEventListener('touchstart', this.touchstartHandler.bind(this));
        document.addEventListener('touchmove', this.touchmoveHandler.bind(this));
        document.addEventListener('touchend', this.touchendHandler.bind(this));
        window.addEventListener('resize', this.getCalendarSize.bind(this));

        this.getCalendarSize();
        this.start();
    }

    start() {
        this.currentDate = new Date();
        this.daysContainer.innerHTML = '';
        this.createMonth('current');
        this.createMonth('prev');
        this.createMonth('next');
    }

    getCalendarSize() {
        this.calendarWidth = this.calendar.clientWidth;
        this.cellGap = getComputedStyle(document.documentElement).getPropertyValue('--cell-gap');
    }

    createMonth(whatMonth = 'current') {
        let date;
        if (whatMonth === 'current') {
            date = this.currentDate
        } else if (whatMonth === 'prev') {
            date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
        } else {
            date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
        }
        const year = date.getFullYear();
        const month = date.getMonth();
        const days = this.generateMonthDays(year, month);
        const daysTemplate = document.createElement('div');
        days.forEach((item) => {
            const className = this.getClassNameDay(item);
            const day = document.createElement('div');
            day.classList.value = className;
            day.textContent = typeof item === 'object' ? item.getDate() : item;
            daysTemplate.append(day);
        });
        this.getMonthYear();
        daysTemplate.classList.add(whatMonth);
        this.daysContainer.append(daysTemplate);
        daysTemplate.style.transition = `transform ${this.TRANSITION_DURATION}s ease`;
    }

    getMonthYear() {
        const month = this.currentDate.toLocaleDateString(undefined, { month: 'long' });
        const year = this.currentDate.getFullYear();
        this.monthYyear.textContent = `${month} ${year}`;
    }

    generateMonthDays(year, month) {
        const days = [];
        const MAX_DAYS_IN_MONTH = 42;
        const firstDayCurrMonth = new Date(year, month, 1);
        const lastDayCurrMonth = new Date(year, month + 1, 0);
        const paddingStart = firstDayCurrMonth.getDay() === 0 ? 6 : firstDayCurrMonth.getDay() - 1;
        const lastDayPrevMonth = new Date(year, month, 0).getDate();
        // остаток предыдущего месяца
        for (let i = paddingStart - 1; i >= 0; i--) {
            const date = new Date(year, month - 1, lastDayPrevMonth - i);
            days.push(date.getDate());
        }
        // текущий месяц
        for (let i = 1; i <= lastDayCurrMonth.getDate(); i++) {
            days.push(new Date(year, month, i))
        }
        // начало следующего месяца
        const total = days.length;
        let paddingEnd = MAX_DAYS_IN_MONTH % total;
        for (let i = 1; i <= paddingEnd; i++) {
            const date = new Date(year, month + 1, i);
            days.push(date.getDate());
        }
        return days;
    };

    getClassNameDay(item) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        let className = 'days_item';
        if (typeof item !== 'object') return className;
        className += ' days_item_active';
        if (today - item === 0) {
            className += ' days_item_today';
        }
        return className;
    }

    changeMonth(dir) {
        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        const prevMonth = this.daysContainer.querySelector('.prev');
        const currentMonth = this.daysContainer.querySelector('.current');
        const nextMonth = this.daysContainer.querySelector('.next');

        if (dir === 'prev') {
            currentMonth.classList.value = 'next';
            prevMonth.classList.value = 'current';
            nextMonth.remove();
            this.currentDate = new Date(year, month - 1);
        } else {
            currentMonth.classList.value = 'prev';
            nextMonth.classList.value = 'current';
            prevMonth.remove();
            this.currentDate = new Date(year, month + 1);
        }
        this.createMonth(dir);
    }

    touchstartHandler(e) {
        const length = e.changedTouches.length;
        this.startX = e.changedTouches[length - 1].clientX;
        this.deltaX = 0;
        this.startTime = Date.now();

        this.prevMonth = this.daysContainer.querySelector('.prev');
        this.currentMonth = this.daysContainer.querySelector('.current');
        this.nextMonth = this.daysContainer.querySelector('.next');
    }

    touchmoveHandler(e) {
        const length = e.changedTouches.length;
        const currentX = e.changedTouches[length - 1].clientX;
        this.deltaX = currentX - this.startX;

        if (Math.abs(this.deltaX) > this.calendarWidth) return;

        this.prevMonth.style.transition = '';
        this.currentMonth.style.transition = '';
        this.nextMonth.style.transition = '';

        this.prevMonth.style.transform = `translateX(calc(-${this.calendarWidth}px - ${this.cellGap} + ${this.deltaX}px))`;
        this.currentMonth.style.transform = `translateX(${this.deltaX}px)`;
        this.nextMonth.style.transform = `translateX(calc(${this.calendarWidth}px + ${this.cellGap} + ${this.deltaX}px))`;
    }

    touchendHandler(e) {
        if (this.deltaX === 0) return;

        const length = e.changedTouches.length;
        this.endX = e.changedTouches[length - 1].clientX;
        this.endTime = Date.now();

        const time = this.endTime - this.startTime;
        const speed = +((Math.abs(this.deltaX) / time).toFixed(2));

        if (speed > this.THRESHOLD_SPEED || this.calendarWidth / Math.abs(this.deltaX) < 3) {
            let dir = this.deltaX > 0 ? 'prev' : 'next';
            this.changeMonth(dir);    
        } 

        this.prevMonth.style.transition = `transform ${this.TRANSITION_DURATION}s ease`;
        this.currentMonth.style.transition = `transform ${this.TRANSITION_DURATION}s ease`;
        this.nextMonth.style.transition = `transform ${this.TRANSITION_DURATION}s ease`;
        
        this.prevMonth.style.transform = '';
        this.currentMonth.style.transform = '';
        this.nextMonth.style.transform = '';
    }
}

new Calendar().init();
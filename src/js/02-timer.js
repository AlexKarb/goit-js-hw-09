import flatpickr from "flatpickr";
import 'flatpickr/dist/flatpickr.min.css';
import { Report } from 'notiflix/build/notiflix-report-aio';
import convertMs from './convert-ms';

const refs = {
    inputEnterDate: document.querySelector('#datetime-picker'),
    btnForStartTimer: document.querySelector('[data-start]'),
    daysOfTimer: document.querySelector('[data-days]'),
    hoursOfTimer: document.querySelector('[data-hours]'),
    minutesOfTimer: document.querySelector('[data-minutes]'),
    secondsOfTimer: document.querySelector('[data-seconds]'),

}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose() { },
};

const calendar = flatpickr(refs.inputEnterDate, options);

let setUserTime = null;
let timerTimeMs = null;
let timerId = null;





calendar.config.onClose.push((selectedDates) => {
    setUserTime = new Date(selectedDates);
             
    if (setUserTime < new Date()) {
            Report.failure("Please choose a date in the future", "", 'Ok');           
    } else {
          refs.btnForStartTimer.removeAttribute('disabled');
    };
          
  },
    
)

refs.btnForStartTimer.addEventListener('click', () => {

    if (setUserTime < new Date()) {
        Report.failure("Please choose a date in the future", "", 'Ok');
            refs.btnForStartTimer.setAttribute('disabled', 'disabled');
        return
    }


    onToggleDisableTimerInterface();

    timerId = setInterval(() => {
        timerTimeMs = setUserTime.getTime() - new Date();
            
        updateTimer(convertMs(timerTimeMs));
       
        stopTimer(timerId);     
 }, 1000);

})





function updateTimer(time) {
    
        refs.daysOfTimer.textContent = addLeadingZero(time.days);
        refs.hoursOfTimer.textContent = addLeadingZero(time.hours);
        refs.minutesOfTimer.textContent = addLeadingZero(time.minutes);
        refs.secondsOfTimer.textContent = addLeadingZero(time.seconds);
}
       
function stopTimer(id) {

    if (timerTimeMs < 1000) {
        clearInterval(id);
        
        onToggleDisableTimerInterface();       
    };

}

function addLeadingZero(value) {
   return  String(value).padStart(2, 0);
}

function onToggleDisableTimerInterface() {

    if (refs.inputEnterDate.hasAttribute('disabled')) {
        refs.btnForStartTimer.removeAttribute('disabled');
        refs.inputEnterDate.removeAttribute('disabled');
    } else {
        refs.btnForStartTimer.setAttribute('disabled', 'disabled');
        refs.inputEnterDate.setAttribute('disabled', 'disabled');
    }
    

      
}
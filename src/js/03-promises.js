import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('form'),
  firstdelay: document.querySelector('[name="delay"]'),
  deleyStep: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
};


refs.form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const dataForm = {
    firstdelay: Number(refs.firstdelay.value),
    deleyStep: Number(refs.deleyStep.value),
    amount: Number(refs.amount.value),
  };


  for (let index = 1; index <= dataForm.amount; index++) {
 
    createPromise(index, dataForm.firstdelay).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, { useIcon: false});
    })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, { useIcon: false});
      });
  
    dataForm.firstdelay += dataForm.deleyStep;
      
  };
});




function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
  
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const resultOfPromise = {
        position,
        delay,
      };

      
      if (shouldResolve) {
        resolve(resultOfPromise);
      } else {
        reject(resultOfPromise);
      };



         
    }, delay)

  });
};




'use strict';

var closeBtns = Array.prototype.slice.call(document.querySelectorAll('.delete'), 0);

closeBtns.forEach(function (element) {
  element.addEventListener('click', function(){
    this.closest('.modal').classList.remove('is-active');
  })
});

var openBtns = Array.prototype.slice.call(document.querySelectorAll('.open'), 0);

openBtns.forEach(function (element){
  element.addEventListener('click', function(){
    document.getElementById(this.dataset.targetOpen).classList.add('is-active');
  })
});




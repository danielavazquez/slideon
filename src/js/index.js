function debounce(func, wait = 20, immediate = true) { //enables us to run the checkSlide function x amount of minutes once every twenty miliseconds, this function was found on the internet
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
};

//we need to loop over every single image and figure out where the image needs to be shown
const sliderImages = document.querySelectorAll('.slide-in'); //selecting every single image we want to slide in
function checkSlide() { //this function runs everytime a person scrolls
  sliderImages.forEach(sliderImage => {
    // half way through the image
    const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2; //gives you pixel level from where you currently are from the bottom 
    // bottom of the image
    const imageBottom = sliderImage.offsetTop + sliderImage.height; //offsetTop the top of this image is this far from top of actual , gives us pixel level of how far down
    const isHalfShown = slideInAt > sliderImage.offsetTop; //makes sure slideinAt value is greater than offsetTop of where the actual image is
    const isNotScrolledPast = window.scrollY < imageBottom; //make sure we are not scrolled all the way past the image, if we are we slide it out again
    if (isHalfShown && isNotScrolledPast) { //if image is half shown and not scrolled past then grab class list and add active, otherwise we are going to remove, means we scrolled past it or have not gotten to it yet 
      sliderImage.classList.add('active');
    } else {
      sliderImage.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', debounce(checkSlide)); //when window is scrolled we run function checkSlide when you check in console it logs in hundreds of events and that is too much so we debounce it

//when you are working with scroll be mindful to include debounce functions in the future
//
// Pages effect
function getId(){
    const pages = {
        Pg1: document.getElementById("Pg1"),
        Pg2: document.getElementById("Pg2"),
        Pg3: document.getElementById("Pg3"),
        Pg4: document.getElementById("Pg4"),
        Pg5: document.getElementById("Pg5"),
        Pg6: document.getElementById("Pg6"),
        Pg7: document.getElementById("Pg7")
    }
    return (pages)
}

function resetPage(x){
    const pages = getId()
    let y = x

    Object.keys(pages).forEach(key => {
        if (y > 0){
             y--; 
            }
        else {
            const element = pages[key];
            element.setAttribute("style","position: fixed; top: 0;")
        }
    });
} 


function setPercentage(quantity) {
    const skillsBars = document.querySelectorAll('.skills-percentage');
    skillsBars.forEach((bar) => {
        const percentage = bar.dataset.percentage;
        bar.style.width = 0 + '%';
        if (percentage => 4) {
            bar.style.width = percentage * quantity + '%';
        }
    });
}

function effectQuantity(x) {
  y = ((x % 1)*100 / 50) // transform the numberpage in a % from 0-n% of the scroll to make end pause.
  if (y > 1 ) { y = 1 } // Make sure the result don't get over number 1.
  else {  y = y.toFixed(2); }  // Avoid others decimals numbers

  return y;
}


document.addEventListener("scroll", (event) => {
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vw = Math.max(document.documentElement.clientWidht || 0, window.innerWidth || 0);
    const positionY = document.documentElement.scrollTop || document.body.scrollTop;
    const numberPage = positionY/vh;    // Show in which page should be: 2.34…  (= page 3)
    const pages = getId();
    const quantity = effectQuantity(numberPage);
    const pagePosition = 100 - (quantity*100);
  
    // const skillsBars = document.querySelectorAll('.skills-percentage');
    // skillsBars.forEach((bar) => {
    //     const percentage =  bar.dataset.percentage;
    //     bar.style.width = 0 + '%';
    //     if (percentage >= 4) {
    //         bar.style.width = percentage * quantity + '%';
    //     }
    // });
    setPercentage(quantity);
  
    resetPage(numberPage);
    if(positionY == 0){
        resetPage();
    }
  
    else if(numberPage < 1) {
        pages.Pg1.setAttribute("style","position: fixed; z-index: 2; top: 0; right: " + pagePosition + "vw;")
    }
    else if(numberPage < 2) {
        pages.Pg2.setAttribute("style","position: fixed; z-index: 3; top: 0; left: " + pagePosition + "vw;")
    }
    else if(numberPage < 3) {
        pages.Pg3.setAttribute("style","position: fixed; z-index: 4; top: 0; right: " + pagePosition + "vw;")
    }
    else if(numberPage < 4) {
        pages.Pg4.setAttribute("style","position: fixed; z-index: 5; top: 0; left: " + pagePosition + "vw;")
    }
    else if(numberPage < 5) {
        pages.Pg5.setAttribute("style","position: fixed; z-index: 6; top: 0; right: " + pagePosition + "vw;")
    }
    else if(numberPage < 6) {
        pages.Pg6.setAttribute("style","position: fixed; z-index: 7; top: 0; left: " + pagePosition + "vw;")
    }
    else if(numberPage >= 7) {
        pages.Pg6.setAttribute("style","position: fixed; z-index: 7; top: 0; opacity: 1;")
    }
    else {
        pages.Pg7.setAttribute("style","position: fixed; z-index: 8; top: 0; opacity: "+ quantity + ";")
    }
  })

// Skill Page

const tabs = document.querySelectorAll('[data-target]');
const tabContent = document.querySelectorAll('[data-content]');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target);

        tabContent.forEach(tabContents => {
            tabContents.classList.remove('skills-active');
        })

        target.classList.add('skills-active');

        tabs.forEach(tab => {
            tab.classList.remove('skills-active');
        })

        tab.classList.add('skills-active');
    })
})


// Porfolio page
const list = document.querySelector('ul')
const items = list.querySelectorAll('li')
const setIndex = (event) => {

  const closest = event.target.closest('li')
  if (closest) {
    const index = [...items].indexOf(closest)
    const cols = new Array(list.children.length)
      .fill()
      .map((_, i) => {
        items[i].dataset.active = (index === i).toString()
        return index === i ? '10fr' : '1fr'
      })
      .join(' ')
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const vw = Math.max(document.documentElement.clientWidht || 0, window.innerWidth || 0);
    if (vh > vw){
      list.style.setProperty('grid-template-rows', cols)
    }
    else {
      list.style.setProperty('grid-template-columns', cols)
    }
    
  }
}
list.addEventListener('focus', setIndex, true)
list.addEventListener('click', setIndex)
list.addEventListener('pointermove', setIndex)
const resync = () => {
  const w = Math.max(
    ...[...items].map((i) => {
      return i.offsetWidth
    })
  )
  list.style.setProperty('--article-width', w)
}

window.addEventListener('resize', resync)
resync()

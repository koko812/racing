let container;
let cwidth = 300;
let cheight = 500;
let perspective = 50;

let ground;
let gwidth = 50000;
let gheight = 50000;
let eye2ground = 100;

let road;
let rwidth = 300;
let rheight = 50000;
let eye2road= eye2ground-1;

const render = () => {
    ground.style.transform = `
    translate3d(${cwidth/2-gwidth/2}px, ${cheight/2-gheight/2}px, 0)
    translate3d(0, ${eye2ground}px, 0)
    rotate3d(1,0,0, 90deg)
    `;

    road.style.transform = `
    translate3d(${cwidth/2-rwidth/2}px, ${cheight/2-rheight/2}px, 0)
    translate3d(0, ${eye2road}px, 0)
    rotate3d(1,0,0, 90deg)
    translate3d(0, ${heroY}px, 0)
    `;
}
const init = () => {
    container = document.createElement('div');
    document.body.appendChild(container)
    container.style.position = 'absolute'
    container.style.height = `${cheight}px`
    container.style.width = `${cwidth}px`
    container.style.left = 0
    container.style.top = 0
    container.style.backgroundColor = '#0ff'
    container.style.perspective = `${perspective}px`
    container.style.overflow = 'hidden'

    ground = document.createElement('div')
    container.appendChild(ground)
    ground.style.position = 'absolute'
    ground.style.height = `${gheight}px`
    ground.style.width = `${gwidth}px`
    ground.style.backgroundColor = '#080'

    road = document.createElement('div')
    container.appendChild(road)
    road.style.position = 'absolute'
    road.style.height = `${rheight}px`
    road.style.width = `${rwidth}px`
    road.style.background = 'linear-gradient(0, #00f 50%, #f00 50%)'
    road.style.backgroundSize = '100px 100px'

    render()
}

let heroX = 0;
let heroY = 0;

window.onload = async () => {
    init()

    while (true) {
        heroY++;
        render();
        await new Promise(r => setTimeout(r, 16))
    }
}
let container;
let cwidth = 300;
let cheight = 500;
let perspective = 50;

let ground;
let gwidth = 50000;
let gheight = 50000;
let eye2ground = 30;

let road;
let rwidth = 300;
let rheight = 3000;
let eye2road = eye2ground - 1 

let car;
let carsize = 100;

let wheight = 30;
let wwidth = 30;

const render = () => {
    ground.style.transform = `
    translate3d(${cwidth / 2 - gwidth / 2}px, ${cheight / 2 - gheight / 2}px, 0)
    translate3d(${heroX}px, ${eye2ground}px, 0)
    rotate3d(1,0,0, 90deg)
    `;

    road.style.transform = `
    translate3d(${cwidth / 2 - rwidth / 2}px, ${cheight / 2 - rheight / 2}px, 0)
    translate3d(${heroX}px,${eye2road}px, 0)
    rotate3d(1,0,0, 90deg)
    translate3d(0, ${heroY % 100}px, 0)
    `;

    console.log(walls);
    for (const object of walls) {
        const {x, y, div} = object
        // だから，heroX ってなんだっけ，おんなじこと考えるの効率悪いな
        
        div.style.transform = `
        translate3d(${cwidth / 2 - wwidth}px, ${cheight/2-wheight/2}px, 0)
        translate3d(${heroX}px, ${eye2road}px, 0)
        rotate3d(1,0,0, 90deg)
        translate3d(0, ${heroY}px, 90px)
        translate3d(${x}px, ${y-1000}px, 0)
        rotate3d(1,0,0, -90deg)
        `;
    }
}

const init = () => {
    car = document.getElementsByTagName('svg')[0]
    car.style.position = 'absolute'
    car.style.width = `${carsize}px`
    car.style.height = `${carsize}px`
    car.style.left = `${cwidth / 2 - carsize / 2}`
    car.style.top = `${cheight / 3 * 2 - carsize / 2}`

    container = document.createElement('div');
    document.body.insertBefore(container, car)
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

/*
    wall = document.createElement('div')
    container.appendChild(wall)
    wall.style.position = 'absolute'
    wall.style.height = `${wheight}px`
    wall.style.width = `${wwidth}px`
    //wall.style.background = 'linear-gradient(#e66465, #9198e5);'
    //wall.style.backgroundSize = '100px 100px'
    //wall.style.backgroundColor = 'linear-gradient(#e66465, #9198e6)'
    wall.style.backgroundColor = '#550'
*/

    render()
}

const walls = []
createWalls = () => {
    for(let i = 0; i < 10; i++){
        x = Math.random()*100
        y = Math.random()*100
        div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.height = `${wheight}px`
        div.style.width = `${wwidth}px`
        // console.log(Math.random()*100);
        div.style.backgroundColor = '#550'
        walls.push({x, y, div })
        container.appendChild(div)
    }
}
let heroX = 0;
let heroY = 0;

window.onload = async () => {
    init()
    let dummy = 0;

    let v = 0
    let k = 0.001
    while (true) {
        dummy++;
        heroY += v;
        v += 0.5;
        v -= v ** 3 * k
        heroX = Math.sin(dummy * 0.05) * rwidth / 2.2
        //console.log(heroX);
        if (dummy%100==10) {
            createWalls();
        }
        render();
        await new Promise(r => setTimeout(r, 16))
    }
}
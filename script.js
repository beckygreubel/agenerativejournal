let theBody = document.getElementsByTagName('body')[0];
let posts = document.getElementsByClassName('post');

theBody.onmousemove = function(e){
    let garden = document.getElementById('garden');
    let flowers = ['media/images/flowers/flower.png',
    'media/images/flowers/flower1.png',
    'media/images/flowers/flower2.png',
    'media/images/flowers/flower3.png',
    'media/images/flowers/flower4.png',
    'media/images/flowers/flower5.png',
    'media/images/flowers/flower6.png']
    let flower = document.createElement('img');
    flower.classList.add('flower');
    let randomFlower = Math.floor(Math.random() * (flowers.length));
    let randomRotate = (Math.random() * (30)) * (Math.round(Math.random()) * 2 - 1);
    let randomWidth = Math.random() * 80 + 20;
    flower.src = flowers[randomFlower];
    flower.style.top = e.pageY + 'px';
    flower.style.left = e.pageX + 'px';
    flower.style.width = randomWidth + 'px';
    flower.style.transform = 'rotate(' + randomRotate + 'deg) translate(-50%, -50%)';
    garden.appendChild(flower);
    setTimeout(function(){
        flower.style.opacity = 0;
    }, 2500);
    setTimeout(function(){
        garden.removeChild(flower);
    }, 3500);
}

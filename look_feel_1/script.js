let button = document.getElementById('button');
let numPoemsSlider = document.getElementById('numPoems');

numPoemsSlider.oninput = function(){
    let displayNum = document.getElementById('displayNum');
    displayNum.innerHTML = numPoemsSlider.value;
}

button.onclick = function(){
    let chosenWord = document.getElementById('word').value;
    let numPoems = numPoemsSlider.value;

    document.getElementById('chosenWord').innerHTML = chosenWord;
    let d = new Date();
    document.getElementById('time').innerHTML = d;

    document.getElementById('options').style.display = 'none';
    document.getElementById('print').style.display = 'inline-block';

    for (let k = 0; k < numPoems; k++){
        generatePoems(chosenWord, k);
    }
}

function generatePoems(chosenWord, k){
    let poem = document.createElement('div');
    poem.classList.add('poem');
    poem.id = 'poem' + k;

    let poemText = document.createElement('p');
    poemText.classList.add('poemText');
    poemText.id = 'poemText' + k;

    let illustration = document.createElement('canvas');
    illustration.classList.add('illustration');
    illustration.id = 'illustration' + k;
    generateIllustration(k);

    poemText.innerHTML = generatePoemText(chosenWord);

    poem.appendChild(poemText);
    poem.appendChild(illustration);
    
    document.getElementById('content').appendChild(poem);
}

function generatePoemText(chosenWord){
    // where all the generative text stuff would go.
    let poem = `This is a poem about ${chosenWord}. <br>
    <br>
    This poem will be varying in length, and could be <br>
    <br>
    four<br>
    <br>
    type:<br>
    <br>
    free verse, accrostic, visual poetry, or ode.`

    return poem;
}

function generateIllustration(k){
    let canvasId = 'illustration' + k
    let canvas = document.getElementById(canvasId);
    paper.setup(canvas);
    var path = new paper.Path.Circle({
        radius: 100,
        strokeColor: 'red'
    })
}
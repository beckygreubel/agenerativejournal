var paramsString = window.location; // get the current url
var searchParams = new URLSearchParams(paramsString.search); // get the search parameters from the url
var input = searchParams.get('input');
var numPoems = 10;

let photos = ['img1.jpeg', 
    'img2.jpeg', 
    'img3.jpeg', 
    'img4.jpeg', 
    'img5.jpeg', 
    'img6.jpeg', 
    'img7.jpeg', 
    'img8.jpeg', 
    'img9.jpeg', 
    'img10.jpeg', 
    'img11.jpeg', 
    'img12.jpeg', 
    'img13.jpeg'];

let last_b;
let synonyms;
let verbs = [];
last_a = input.toString();

findSynonyms(last_a).then(function(){
    for (let i = 0; i < numPoems; i++){
            let poem = createVillanelle();
            let photo = addPhoto();

            let img = document.createElement('img');
            img.src = photo;
            if (i % 3){
                img.classList.add('spread');
            }

            let div = document.createElement('div');
            div.classList.add('poem');
            div.innerHTML = poem;

            document.getElementById('content').appendChild(img);
            document.getElementById('content').appendChild(div);
        }
});

function addPhoto(){

    let randomPhoto = Math.floor(Math.random() * photos.length);
    let chosenPhoto = photos[randomPhoto];
    let photo = 'media/images/' + chosenPhoto;
    photos.splice(randomPhoto, 1);
    return photo;

}

function createVillanelle(){
    let A1 = createLine('a')
    let A2 = createLine('a');

    // Villanelle Structure: A1 b A2 / a b A1 / a b A2 / a b A1 / a b A2 / a b A1 A2
    let villanelle = `
    ${A1}<br>
    ${createLine('b')}<br>
    ${A2}<br><br>
    ${createLine('a')}<br>
    ${createLine('b')}<br>
    ${A1}<br><br>
    ${createLine('a')}<br>
    ${createLine('b')}<br>
    ${A2}<br><br>
    ${createLine('a')}<br>
    ${createLine('b')}<br>
    ${A1}<br><br>
    ${createLine('a')}<br>
    ${createLine('b')}<br>
    ${A2}<br><br>
    ${createLine('a')}<br>
    ${createLine('b')}<br>
    ${A1}<br>
    ${A2}`

    return villanelle;
    
};

function createLine(type){
    let lineByToken = [];
    let lineStructure = lineByPOS();
    let word;
    for (let k = 0; k < lineStructure.length; k++){
        if (k == lineStructure.length-1){
            word = findRhyme(type, lineStructure[k]);
        } else {
            if (lineStructure[k]=='to'){
                word = 'to';
            } else if (lineStructure[k] == 'in'){
                let possiblePreps = ['for', 'on', 'in', 'at', 'of', 'upon', 'under', 'by', 'between'];
                let index = Math.floor(Math.random() * possiblePreps.length);
                word = possiblePreps[index];
            } else if (/nn.*/.test(lineStructure[k])){
                word = chooseSynonym();
            } else if (/vb.*/.test(lineStructure[k])) {
                if (k % 3 == 0){
                    word = RiTa.randomWord({ targetPos: 'vb', maxLength: 6});
                } else {
                    word = chooseVerb();
                }
            } else if (lineStructure[k] == 'ex') {
                word = 'there'
            } else if (lineStructure[k] == 'dt'){
                word = 'the'
            } else {
                word = RiTa.randomWord({ targetPos: lineStructure[k], maxLength: 6});
            }
        }
        lineByToken.push(word);
    }
    let line = RiTa.untokenize(lineByToken);
    return line;
}

function findRhyme(type, wordPos){
    let chosenRhyme;
    if (type == 'b'){
        if (last_b == null){
            chosenRhyme = RiTa.randomWord({targetPos: wordPos});
            if (RiTa.rhymes(chosenRhyme).length < 4){
                chosenRhyme = RiTa.randomWord({targetPos: wordPos});
            }
            last_b = chosenRhyme;
        } else {
            let possibleRhymes = RiTa.rhymes(last_b, {pos: wordPos});
            let randomRhyme = Math.floor(Math.random()*possibleRhymes.length);
            chosenRhyme = possibleRhymes[randomRhyme];
        }
    } else {
        let possibleRhymes = RiTa.rhymes(last_a, {pos: wordPos});
        let randomRhyme = Math.floor(Math.random()*possibleRhymes.length);
        chosenRhyme = possibleRhymes[randomRhyme];
    }
    return chosenRhyme;
}

function chooseSynonym(){
    let randomSyn = Math.floor(Math.random() * synonyms.length);
    let syn = synonyms[randomSyn];
    // splice out chosen syn
    return syn;
}

function chooseVerb(){
    let randomVerb = Math.floor(Math.random() * verbs.length);
    let verb = verbs[randomVerb];
    return verb;
}

async function findSynonyms(word){
    try {
        var results = await fetch(
            `https://api.wordnik.com/v4/word.json/${word}/relatedWords?useCanonical=false&relationshipTypes=synonym&api_key=lfsv7wu4eq7pm2ymapwybd9z9dxq0u127siggnjw6i7te6i3u`
        )
    
        let Wordnik = await results.json();
        synonyms = Wordnik[0].words;
    } catch (error) {
        return synonym = word;
    }  
}

function lineByPOS(){
    let exampleLines = [
    'so many things seem filled with the intent',
    'to be lost that their loss is no disaster',
    'They are all gone away',
    'The House is shut and still',
    'Through broken walls and gray',
    'There is nothing more to say'];
    let linesPOS = [];
    for (let i = 0; i < exampleLines.length; i++){
        let tokenized = RiTa.tokenize(exampleLines[i]);
        let pos = RiTa.pos(tokenized);
        for (let j = 0; j < pos.length; j++){
            if (/vb.*/.test(pos[j])){
                verbs.push(tokenized[j]);
            }
        }
        linesPOS.push(pos);
    }
    let randomPOS = Math.floor(Math.random() * linesPOS.length);
    return linesPOS[randomPOS];
}



const collection = [{name: 'martin',lastname:'lequerica'},{name:'jaime',lastname:'vidal'},{name:'flor',lastname:'paradiso'}];

const result = collection.find(x => x.name === 'jose');

if(result){
    console.log('result true');
}else{
    console.log('result false');
}
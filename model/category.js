const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/snipplet')
    .then(() => console.log('connected to the database'))
    .catch((err) => console.log(`Error accessing the database ${err.message}`));
const categorySchema = mongoose.Schema({
    title: String,
    snipplets: [{
        title: String,
        content: String
    }]
});
const Category = mongoose.model('Category', categorySchema);
const cate = mongoose.model('Category',categorySchema);
class CategoryDAO {

    saveCategory(category) {
        const parsedCategory = this.parseCategory(category);
        console.log('parsed category',parsedCategory);
        parsedCategory.save();

    }

    atestfunction(){
        console.log('atest function');
    }

    parseCategory(restCategory){
        const newCategory = new Category();
        newCategory.snipplets = [];
        newCategory.title =restCategory.title;
        
        restCategory.snipplets.forEach( (item,index)=>{
           const snippletParsed = this.parseSnipplet(item);
           newCategory.snipplets.push(snippletParsed);
        });
        return newCategory;
    }

    parseSnipplet(snipplet){
        return{title:snipplet.title,content:snipplet.content};
    }

    async getCategory(id) {
        const result = await cate.findById(id)
        return result;
    }

    async updateCategory(id,categoryDTO){
        cate.findById(id)
        .then(x =>{

            console.log(x);
            x.title = categoryDTO.name;
            x.snipplets.forEach( (x,y)=>{

                const result = categoryDTO.snipplets.find(item=> item.title === x.title);
                if(result){
                   //update 
                }else{
                    //insert
                }

            });
        })
    }



    deleteCategory(id){
        cate.deleteOne(id)
        .then(x => console.log(`categoryd ${id}, deleted`))
        .catch(x=>console.log(`category deleting error ${x.message}`))
    }


    getAllCategories(){

        cate.find()
        .then(x=>console.log(x))
        .catch(x=>console.log(x));
    }
}

module.exports = CategoryDAO;

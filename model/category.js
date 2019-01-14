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
const cate = mongoose.model('Category', categorySchema);
class CategoryDAO {

    async saveCategory(category) {
        return new Promise((resolve, reject) => {
            const parsedCategory = this.parseCategory(category);
            console.log('parsed category', parsedCategory);
           cate.find({title:category.title})
           .then(x=> {
              if(x == '') {
                  parsedCategory.save()
                  .then(x=>resolve(x))
                  .catch(x=>reject(new Error(x)));
              }else{
                 reject(new Error('el snipplet ya existe'));
              }
            });
           
           
           
            
           

        });

    }
    // async saveCategory(category) {
    //     return new Promise( (resolve,reject){

    //     });
    //     const parsedCategory = this.parseCategory(category);
    //     console.log('parsed category', parsedCategory);
    //    reject('something');
    //     return await parsedCategory.save();

    // }


    parseCategory(restCategory) {
        const newCategory = new Category();
        newCategory.snipplets = [];
        newCategory.title = restCategory.title;

        restCategory.snipplets.forEach((item, index) => {
            const snippletParsed = this.parseSnipplet(item);
            newCategory.snipplets.push(snippletParsed);
        });
        return newCategory;
    }

    parseSnipplet(snipplet) {
        return { title: snipplet.title, content: snipplet.content };
    }

    async getCategory(id) {
        return new Promise((resolve, reject) => {
            cate.findById(id)
            .then(x=> resolve(x))
            .catch(x => reject(new Error('error')));
        }) 
    }

    async updateCategory(id, categoryDTO) {
        cate.findById(id)
            .then(catego => {
                catego.title = categoryDTO.title;
                console.log('loggin the snipplets after merge', catego.snipplets);
                catego.snipplets = this.mergeSnipplets(catego.snipplets, categoryDTO.snipplets);
                console.log('loggin the snipplets before save', catego.snipplets);
                catego.save()
                    .then(x => console.log(`salvado con exito ${x}`))
                    .catch(x => console.log(`error al salvar ${x}`));
            });
    }

    mergeSnipplets(snipplet, snippletAux) {
        let snippletsToAdd = [];
        console.log('snippletAux: ', snippletAux);
        snippletAux.forEach((snipAux, index) => {
            let flag = true;
            snipplet.forEach((snip, index2) => {
                if (snip.title == snipAux.title) {
                    console.log('actualizo snipplet');
                    flag = false;
                    if (snip.content != snipAux.content)
                        snip.content = snipAux.content;
                }
            })
            if (flag) {
                console.log('snipplet not found adding...', { title: snipAux.title, content: snipAux.content });
                snippletsToAdd.push({ title: snipAux.title, content: snipAux.content });
            }
        });
        console.log('snippletsToAdd:');
        snippletsToAdd.forEach(x => console.log(x.title));
        snipplet.concat(snippletsToAdd);
        snippletsToAdd.forEach(x => snipplet.push(x));
        console.log('new merged snipplet array: ');
        snipplet.forEach(x => console.log(x.title))
        return snipplet;
    }

    mergeArrays(a, b) {
        let c = a.concat(b);
        return c.filter(function (item, pos) { return c.indexOf(item) == pos });
    }

    deleteCategory(id) {
        cate.deleteOne(id)
            .then(x => console.log(`categoryd ${id}, deleted`))
            .catch(x => console.log(`category deleting error ${x.message}`))
    }


    getAllCategories() {

        cate.find()
            .then(x => console.log(x))
            .catch(x => console.log(x));
    }
}

module.exports = CategoryDAO;

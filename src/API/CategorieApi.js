class CategorieApi  {

    constructor() {
        this.categories = [];

        if (localStorage.categories) {
            this.categories = JSON.parse(localStorage.categories);
        } else {
            this.categories = [
                { id: "1", CategorieName: "Test", Impact: 20 },
                { id: "2", CategorieName: "Happy", Impact: 30},
            ]
            localStorage.categories = JSON.stringify(this.categories);
        }
    }

    count() {
        return this.categories.length;
    }

    all() {
        return this.categories;
    }

    getGroupById(id) {
        return this.categories.find((g) => g.id === id);
    }
}
export default CategorieApi;
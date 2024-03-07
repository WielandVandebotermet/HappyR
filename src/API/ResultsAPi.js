class ResultsApi  {

    constructor() {
        this.results = [];

        if (localStorage.results) {
            this.results = JSON.parse(localStorage.results);
        } else {
            this.results = [
            { id: "1", ResultName: "Weekly Satisfaction Survey", Date: "5/3", GroupName: "Development", answered: "17/24", },
            { id: "2", ResultName: "Weekly Satisfaction Survey", Date: "28/2", GroupName: "Development", answered: "24/24",},
            { id: "3", ResultName: "Workplace Satisfaction", Date: "26/2", GroupName: "Operations", answered: "7/13",},
            ];
            localStorage.results = JSON.stringify(this.results);
        }
    }

    count() {
        return this.results.length;
    }

    all() {
        return this.results;
    }

    getGroupById(id) {
        return this.results.find((g) => g.id === id);
    }

    add(RN) {
        this.results.push({  id: this.count() + 1, ResultName: RN, Date: "", GroupName: "" , answered: "0/0"});
    }
}
export default ResultsApi;
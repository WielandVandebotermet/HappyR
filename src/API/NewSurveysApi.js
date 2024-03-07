class NewSurveysApi  {

    constructor() {
        this.newsurveys = [];

        if (localStorage.newsurveys) {
            this.newsurveys = JSON.parse(localStorage.newsurveys);
        } else {
            this.newsurveys = [
            { id: "1", SurveyName: "Weekly Satisfaction Survey", Date: "14/3", GroupName: "Development", GroupList: ["1","2"], },
            { id: "2", SurveyName: "Work Satisfaction", Date: "19/3", GroupName: "Operations", GroupList: ["3"],}]
            localStorage.newsurveys = JSON.stringify(this.newsurveys);
        }
    }

    count() {
        return this.newsurveys.length;
    }

    all() {
        return this.newsurveys;
    }

    getGroupById(id) {
        return this.newsurveys.find((g) => g.id === id);
    }

    add(SN) {
        this.newsurveys.push({ id: this.count() + 1, SurveyName: SN, Date: "", GroupName: "" });
    }
}
export default NewSurveysApi;
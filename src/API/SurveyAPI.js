class SurveysApi  {

    constructor() {
        this.surveys = [];

        if (localStorage.surveys) {
            this.surveys = JSON.parse(localStorage.surveys);
        } else {
            this.surveys = [
            { id: "1", SurveyName: "Weekly Satisfaction Survey", Date: "5/3", GroupName: "Development", },
            { id: "2", SurveyName: "Weekly Satisfaction Survey", Date: "28/2", GroupName: "Development",},
            { id: "3", SurveyName: "Workplace Satisfaction", Date: "26/2", GroupName: "Operations",}]
            localStorage.surveys = JSON.stringify(this.surveys);
        }
    }

    count() {
        return this.surveys.length;
    }

    all() {
        return this.surveys;
    }

    getGroupById(id) {
        return this.surveys.find((g) => g.id === id);
    }

    add(SN) {
        this.surveys.push({ id: this.count() + 1, SurveyName: SN, Date: "", GroupName: "" });
    }
}
export default SurveysApi;
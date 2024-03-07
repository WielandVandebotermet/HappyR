class GroupApi  {

    constructor() {
        this.groups = [];

        if (localStorage.groups) {
            this.groups = JSON.parse(localStorage.groups);
        } else {
            this.groups = [
            { id: "1", GroupName: "Development", ManagerList: [], MemberList: [], },
            { id: "2", GroupName: "Operations", ManagerList: [], MemberList: [],},
            { id: "3", GroupName: "Architecture", ManagerList: [], MemberList: [],},
            ];
            localStorage.groups = JSON.stringify(this.groups);
        }
    }

    count() {
        return this.groups.length;
    }

    all() {
        return this.groups;
    }

    getGroupById(id) {
        return this.groups.find((g) => g.id === id);
    }

    add(GN) {
        this.groups.push({ id: this.count() + 1, GroupName: GN, ManagerList: [], MemberList: [] });
    }
}

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
export default GroupApi;
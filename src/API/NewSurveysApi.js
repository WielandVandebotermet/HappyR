class NewSurveysApi  {

    constructor() {
        this.newsurveys = [];

        if (localStorage.newsurveys) {
            this.newsurveys = JSON.parse(localStorage.newsurveys);
        } else {
            this.newsurveys = [
                { id: "1", SurveyName: "Weekly Satisfaction Survey", Date: "14/3", GroupName: "Development", GroupList: ["1","2"]},
                { id: "2", SurveyName: "Work Satisfaction", Date: "19/3", GroupName: "Operations", GroupList: ["3"], 
                    Questions:[ {TemplateId: 1, Options: {subtext: true, comment: false}, Question: {Title: "Test", SubText: "Test Sub", Bmin: 1, Bmax: 5, Step: 1, CategorieId: 1,},},
                                {TemplateId: 1, Options: {subtext: true, comment: true}, Question: {Title: "Test2", SubText: "Test Sub2", Bmin: 1, Bmax: 10, Step: 1, CategorieId: 1,},},
                    ],
                }
            ]
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
        const survey = this.newsurveys.find((g) => g.id === id);
        if (survey) {
            return survey;
        } else {
            return null;
        }
    }
    
    getQuestionById(Sid, Qid) {
        const survey = this.newsurveys.find((g) => g.id === Sid);
    
        if (survey && survey.Questions && survey.Questions.length >= Qid) {
            return survey.Questions[Qid - 1];
        } else {
            return null;
        }
    }
}
export default NewSurveysApi;
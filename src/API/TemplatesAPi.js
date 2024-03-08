class TemplatesApi  {

    constructor() {
        this.templates = [];

        if (localStorage.templates) {
            this.templates = JSON.parse(localStorage.templates);
        } else {
            this.templates = [
            { id: "1", TemplateName: "Question Bar", Options: {subtext: true, comment: false}, },
            { id: "2", TemplateName: "Quastion Team Bars", Options: {subtext: true, comment: false, IncudeManager: false, externalPeople: [],},},
            { id: "3", TemplateName: "Question Comment", Options: {subtext: true,},},
            ];
            localStorage.templates = JSON.stringify(this.templates);
        }
    }

    count() {
        return this.templates.length;
    }

    all() {
        return this.templates;
    }

    getGroupById(id) {
        return this.templates.find((g) => g.id === id);
    }

    add(TN) {
        this.templates.push({ id: this.count() + 1, GroupName: TN, option: [], MemberList: [] });
    }
}
export default TemplatesApi;
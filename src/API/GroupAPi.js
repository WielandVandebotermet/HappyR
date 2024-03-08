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
export default GroupApi;
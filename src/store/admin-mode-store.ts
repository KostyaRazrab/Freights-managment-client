import { makeAutoObservable } from "mobx";


class AdminModeStore {
    adminMode: boolean = false

    constructor(){
        makeAutoObservable(this)
    }

    setAdminMode(){
        this.adminMode = !this.adminMode
    }
}

export const adminMode = new AdminModeStore()
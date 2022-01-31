import { makeAutoObservable } from "mobx";
import { IFreight, IFreightEdit, IFreightCreate, ISelectedFreightToEdit } from "../models";
import { freightService } from "../provider/api-provider";

class FreightStore {
  freights: IFreight[] = [];
  selectedFreight: IFreight | null = null;
  selectedFreightToEdit: ISelectedFreightToEdit | null = null;
  loading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setLoading(value: boolean) {
    this.loading = value;
  }

  setFreights(newFreights: IFreight[]) {
    this.freights = newFreights;
  }

  setSelectedFreight(freight: IFreight) {
    this.selectedFreight = freight;
  }

  setSelectedFreightToEdit(freight: ISelectedFreightToEdit) {
    this.selectedFreightToEdit = freight;
  }

  async getAllFreights() {
    this.setLoading(true);
    try {
      const response = await freightService.getAllFreights();
      this.setFreights(response.data);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
  async createFreight(freight: IFreightCreate) {
    this.setLoading(true);
    try {
      await freightService.createFreight(freight);
      this.getAllFreights();
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
  async deleteFreight(id: string) {
    this.setLoading(true);
    try {
      await freightService.deleteFreight(id);
      this.getAllFreights();
      this.setLoading(false);
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
  async editFreight(id: string, freight: IFreightEdit) {
    this.setLoading(true);
    try {
      await freightService.updateFreight(id, freight);
      this.getAllFreights();
    } catch (e) {
      console.log(e);
    } finally {
      this.setLoading(false);
    }
  }
}

export const freightStore = new FreightStore();

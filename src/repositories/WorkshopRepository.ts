import Speaker from "../models/Speaker";
import { Workshop } from "../models/Workshop";
import { BaseRepository } from "./BaseRepository";

export default class WorkshopRepository extends BaseRepository<Workshop>{
  protected model = Workshop

  static getInstance(): WorkshopRepository {
    return new WorkshopRepository();
  }

  async createWithSpeaker(workshop: Workshop): Promise<Workshop> {
    let createdWorkshop = await this.model.create(workshop, { include: [Speaker] });
    await createdWorkshop.save()

    return createdWorkshop;
  }

  async create(workshop: Workshop): Promise<Workshop> {
    let createdWorkshop = await this.model.create(workshop);
    await createdWorkshop.save()

    return createdWorkshop;
  }
}
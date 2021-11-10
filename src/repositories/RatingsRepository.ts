import Rating from "../models/Rating";
import { BaseRepository } from "./BaseRepository";

export default class RatingsRepository extends BaseRepository<Rating> {
  protected model = Rating
  

  public async create(body: Rating): Promise<Rating> {
    const rating = await Rating.create(body)
    return await rating.save()
  }
}
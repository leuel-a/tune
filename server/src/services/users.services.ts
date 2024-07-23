import { FilterQuery, QueryOptions } from 'mongoose'
import UserModel, { UserDocument, UserInput } from '../models/users.model'

/**
 * Finds a user based on the query
 * @param query - query filters for the user
 * @param options - query options for mongoose
 * @returns The user if the user is found else it returns null
 */
export const findUser = async (
  query: FilterQuery<UserDocument>,
  options: QueryOptions = { lean: true }
) => {
  return await UserModel.findOne(query, {}, options)
}

/**
 * Create user creates a new user
 * @param input - the details of the new user
 * @returns The new user that is created
 */
export const createUser = async (input: UserInput): Promise<UserDocument> => {
  return await UserModel.create(input)
}

export const deleteUser = async (query: FilterQuery<UserDocument>) => {
  const result = await UserModel.deleteOne(query)
  return result.deletedCount > 0
}

import {
    Model,
    ClientSession,
    Document,
    PopulateOptions,
    UpdateQuery,
} from 'mongoose';
type FilterQuery<T> = any;
import { isString } from './util/helpers.utils';

interface FetchPropI {
    readonly limit?: number
    readonly page?: number
    readonly fetchAll?: 'yes' | 'no'
}

export class BaseRepository<T extends Document> {
    constructor(protected readonly model: Model<T>) { }

    async create(data: Partial<T> | any, session?: ClientSession): Promise<T> {
        return new this.model(data).save({ session });
    }

    async findById(
        id: string,
        populate?: string | PopulateOptions | (string | PopulateOptions)[],
        session?: ClientSession
    ): Promise<Partial<T> | null> {
        let query = this.model.findById(id);

        if (populate) {
            const populateArray = Array.isArray(populate) ? populate : [populate];
            query = query.populate(populateArray);
        }

        if (session) query = query.session(session);

        return query.lean().exec() as any as Partial<T>;
    }

    async findOne(
        filter: FilterQuery<T>,
        populate?: string | PopulateOptions | (string | PopulateOptions)[],
        session?: ClientSession
    ): Promise<Partial<T> | null> {
        let query = this.model.findOne(filter);

        if (populate) {
            const populateArray = Array.isArray(populate) ? populate : [populate];
            query = query.populate(populateArray);
        }

        if (session) query = query.session(session);

        return query.lean().exec() as any as Partial<T>;
    }

    async update(
        filter: string | FilterQuery<T>,
        data: UpdateQuery<T>,
        session?: ClientSession,
        populate?: string | PopulateOptions | (string | PopulateOptions)[]
    ): Promise<Partial<T> | null> {

        let query = isString(filter) ? this.model.findByIdAndUpdate(filter, data, {
            new: true,
        }) : this.model.findOneAndUpdate(filter, data, {
            new: true,
        })

        if (populate) {
            const populateArray = Array.isArray(populate) ? populate : [populate];
            query = query.populate(populateArray);
        }

        if (session) query = query.session(session);

        return await query.exec() as any as Partial<T>;
    }

    async updateMany(
        filter: FilterQuery<T>,
        data: UpdateQuery<T>,
        session?: ClientSession,
        populate?: string | PopulateOptions | (string | PopulateOptions)[]
    ): Promise<any> {
        let query = this.model.updateMany(filter, data);

        if (session) query = query.session(session);

        return query.exec();
    }

    async delete(
        id: string,
        session?: ClientSession
    ): Promise<void> {
        await this.model.findByIdAndDelete(id).session(session ?? null).lean().exec();
    }

    async count(filter: FilterQuery<T>): Promise<number> {
        return this.model.countDocuments(filter)
    }

    async deleteMany(
        ids: string[],
        session?: ClientSession
    ): Promise<void> {
        await this.model
            .deleteMany({ _id: { $in: ids } })
            .session(session ?? null)
            .exec();
    }

    async search(
        additionalFilters: FilterQuery<T> = {},
        searchTerm?: string,
        fields?: string[],
        fetchProp?: FetchPropI,
        populate?: string | PopulateOptions | (string | PopulateOptions)[]
    ): Promise<{ documents: Partial<T>[], count: number }> {

        const baseQuery: FilterQuery<T> = { ...additionalFilters };

        if (searchTerm && fields?.length) {
            baseQuery['$or'] = fields.map((field) => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            } as FilterQuery<T>));
        }

        const queryBuilder = this.model.find(baseQuery).sort({ createdAt: -1 });

        // Handle pagination unless fetchAll is requested
        if (fetchProp?.fetchAll !== 'yes') {
            const limit = fetchProp?.limit ?? 10;
            const page = fetchProp?.page ?? 1;
            const skip = (page - 1) * limit;
            queryBuilder.limit(limit).skip(skip);
        }

        // Handle population
        if (populate) {
            const populateArray = Array.isArray(populate) ? populate : [populate];
            queryBuilder.populate(populateArray);
        }

        // Run query and count concurrently
        const [documents, count] = await Promise.all([
            queryBuilder.lean().exec(),
            this.model.countDocuments(baseQuery),
        ]);

        return {
            documents: documents as any as Partial<T>[],
            count,
        };
    }
}

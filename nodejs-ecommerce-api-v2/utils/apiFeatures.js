class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }

    filter() {
        const queryStringObj = { ...this.queryString };
        const excludesFields = ["page", "sort", "limit", "fields"];
        excludesFields.forEach((field) => delete queryStringObj[field]);

        // 🟢 حلنا: نحول price[gte] => { price: { gte: 100 } }
        let mongoQuery = {};
        for (let key in queryStringObj) {
            if (key.includes("[")) {
                // مثال key = "price[gte]"
                const [field, operator] = key.split("[");
                const cleanOperator = operator.replace("]", "");
                if (!mongoQuery[field]) mongoQuery[field] = {};
                mongoQuery[field][`$${cleanOperator}`] = queryStringObj[key];
            } else {
                mongoQuery[key] = queryStringObj[key];
            }
        }

        console.log("✅ Final Filter:", mongoQuery);
        this.mongooseQuery = this.mongooseQuery.find(mongoQuery);
        return this;
    }

    sort() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort("-createdAt -_id")
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
            this.mongooseQuery = this.mongooseQuery.select("-__v");
        }
        return this;
    }

    search(modelName) {
        if (this.queryString.keyword) {
            let query = {};
            if (modelName === "Products") {
                query.$or = [{ title: { $regex: this.queryString.keyword, $options: "i" } }, { description: { $regex: this.queryString.keyword, $options: "i" } }];
            } else {
                query = { name: { $regex: this.queryString.keyword, $options: "i" } };
            }

            this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
    }

    paginate(countDocuments) {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 50;
        const skip = (page - 1) * limit;
        const endIndex = page * limit;

        // Pagination result
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
       pagination.numberOfPages = Math.max(1, Math.ceil(countDocuments / limit));

        // next page
        if (endIndex < countDocuments) {
            pagination.next = page + 1;
        }
        if (skip > 0) {
            pagination.prev = page - 1;
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);

        this.paginationResult = pagination;
        return this;
    }
}

module.exports = ApiFeatures;


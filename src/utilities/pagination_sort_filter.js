import mongoose from 'mongoose';


const paginateAndFilter = (model) => {
  return async (req, res, next) => {
    let { page, limit, sortBy, sortOrder, filterByCategory, filterByShared } = req.query;

    page = parseInt(page) || 1;
    limit = parseInt(limit) || 10;
    sortOrder = sortOrder === 'desc' ? -1 : 1;

    const query = {};

    if (filterByCategory) {
      const category = await mongoose.model('Category').findOne({ name: filterByCategory });
      if (category) {
        query.categoryId = category._id;
      }
    }

    if (filterByShared !== undefined) {
      query.shared = filterByShared === 'true';
    }

    const skip = (page - 1) * limit;
    const sort = {};
    if (sortBy) {
      sort[sortBy] = sortOrder;
    }

    try {
      const results = await model.find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit);

      const totalResults = await model.countDocuments(query);
      const totalPages = Math.ceil(totalResults / limit);

      res.paginatedResults = {
        results,
        pagination: {
          totalResults,
          totalPages,
          currentPage: page,
          pageSize: limit,
        },
      };

      next();
    } catch (error) {
      next(error);
    }
  };
};

export { paginateAndFilter };

import connectDB from "./conn";

let collectionName1 = "pendukung";

export async function insertDocument(document) {
  const db = await connectDB();

  // Add createdAt and modifiedAt fields
  const timestamp = new Date();
  document.createdAt = timestamp;
  document.modifiedAt = timestamp;

  const result = await db.collection(collectionName1).insertOne(document);
  return result;
}

export async function updateDocument(id, updatedFields) {
  const db = await connectDB();

  updatedFields.modifiedAt = new Date();

  const result = await db
    .collection(collectionName1)
    .updateOne({ _id: ObjectId(id) }, { $set: updatedFields });

  return result;
}

export async function findAllDocuments() {
  const db = await connectDB();
  const documents = await db.collection(collectionName1).find().toArray();
  return documents;
}

export async function GroupByKabupaten(provinsi, sort) {
  const db = await connectDB();
  const pipeline = [
    {
      $group: {
        _id: "$kabupaten",
        totalQuantity: { $sum: 1 },
      },
    },
  ];

  if (provinsi !== null && provinsi !== undefined) {
    pipeline.unshift({
      $match: {
        provinsi: provinsi,
      },
    });
  }

  pipeline.push({
    $sort: {
      totalQuantity: sort === 1 ? 1 : -1,
    },
  });

  const documents = await db
    .collection(collectionName1)
    .aggregate(pipeline)
    .toArray();
  return documents;
}

export async function GroupByProvinsi(startDate, endDate) {
  const db = await connectDB();
  const pipeline = [
    {
      $group: {
        _id: "$provinsi",
        totalQuantity: { $sum: 1 },
      },
    },
  ];

  pipeline.push({
    $sort: {
      totalQuantity: sort === 1 ? 1 : -1,
    },
  });

  pipeline.push({
    $limit: 8,
  });

  if (
    startDate !== null &&
    startDate !== undefined &&
    endDate !== null &&
    endDate !== undefined
  ) {
    try {
      const start = new Date(startDate);
      const end = new Date(endDate);
      pipeline.unshift({
        $match: {
          $and: [{ startDate: { $gte: start } }, { endDate: { $lte: end } }],
        },
      });
    } catch (error) {
      return error;
    }
  }

  const documents = await db
    .collection(collectionName1)
    .aggregate(pipeline)
    .toArray();
  return documents;
}

export async function GetDataCounts() {
  try {
    const db = await connectDB();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const startOfWeek = new Date();
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 7);

    const startOfMonth = new Date();
    startOfMonth.setHours(0, 0, 0, 0);
    startOfMonth.setDate(1);

    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);

    const todayQuery = {
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    };

    const thisWeekQuery = {
      createdAt: {
        $gte: startOfWeek,
        $lt: endOfWeek,
      },
    };

    const thisMonthQuery = {
      createdAt: {
        $gte: startOfMonth,
        $lt: endOfMonth,
      },
    };

    const todayCount = await db
      .collection(collectionName1)
      .countDocuments(todayQuery);
    const thisWeekCount = await db
      .collection(collectionName1)
      .countDocuments(thisWeekQuery);
    const thisMonthCount = await db
      .collection(collectionName1)
      .countDocuments(thisMonthQuery);

    return {
      today: todayCount,
      thisWeek: thisWeekCount,
      thisMonth: thisMonthCount,
    };
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Internal Server Error");
  }
}

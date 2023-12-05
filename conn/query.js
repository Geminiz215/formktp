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
      totalQuantity: sort == 1 ? 1 : -1,
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
  const pipeline = [
    {
      $group: {
        _id: null,
        today: {
          $sum: {
            $cond: {
              if: { $gte: ["$createdAt", new Date()] },
              then: 1,
              else: 0,
            },
          },
        },
        thisWeek: {
          $sum: {
            $cond: {
              if: {
                $gte: [
                  "$createdAt",
                  new Date(
                    new Date().setDate(
                      new Date().getDate() - new Date().getDay()
                    )
                  ),
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        thisMonth: {
          $sum: {
            $cond: {
              if: {
                $gte: [
                  "$createdAt",
                  new Date(new Date().getFullYear(), new Date().getMonth(), 1),
                ],
              },
              then: 1,
              else: 0,
            },
          },
        },
        total: { $sum: 1 },
      },
    },
  ];

  try {
    const db = await connectDB();
    const documents = await db
      .collection(collectionName1)
      .aggregate(pipeline)
      .toArray();
    return documents;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Internal Server Error");
  }
}

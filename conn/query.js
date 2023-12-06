import connectDB from "./conn";

let collectionName1 = "pendukung";

export async function insertDocument(document) {
  const db = await connectDB();
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
  const matchStage = {
    $match: {},
  };

  if (
    startDate !== null &&
    startDate !== undefined &&
    endDate !== null &&
    endDate !== undefined
  ) {
    matchStage.$match.yourDateField = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const pipeline = [
    matchStage,
    {
      $project: {
        provinsi: {
          $cond: {
            if: {
              $or: [{ $eq: ["$provinsi", ""] }, { $eq: ["$provinsi", null] }],
            },
            then: "other",
            else: "$provinsi",
          },
        },
      },
    },
    {
      $group: {
        _id: "$provinsi",
        count: { $sum: 1 },
      },
    },
    {
      $sort: {
        count: -1,
      },
    },
    {
      $limit: 8,
    },
  ];

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

export async function GroupByAgeRange() {
  const pipeline = [
    {
      $project: {
        tanggal_lahir: 1, // Ganti nama_field_umur dengan nama field umur pada dokumen Anda
      },
    },
    {
      $addFields: {
        age: {
          $divide: [
            {
              $subtract: [new Date(), "$tanggal_lahir"],
            },
            31536000000, // Jumlah milidetik dalam satu tahun
          ],
        },
      },
    },
    {
      $group: {
        _id: {
          $switch: {
            branches: [
              {
                case: {
                  $and: [{ $gte: ["$age", 17] }, { $lte: ["$age", 25] }],
                },
                then: "17-25 tahun",
              },
              {
                case: {
                  $and: [{ $gte: ["$age", 26] }, { $lte: ["$age", 35] }],
                },
                then: "26-35 tahun",
              },
              {
                case: {
                  $and: [{ $gte: ["$age", 36] }, { $lte: ["$age", 50] }],
                },
                then: "36-50 tahun",
              },
              { case: { $gte: ["$age", 51] }, then: "Di atas 50 tahun" },
            ],
            default: "Umur tidak valid", // Ganti dengan nilai default yang sesuai
          },
        },
        count: { $sum: 1 },
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
    console.error("Error in aggregation:", error);
    throw error;
  }
}

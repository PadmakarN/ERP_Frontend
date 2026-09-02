import api from "../../../Config/apiConfig";

export const getLookupData = async ({
  table,
  where = {},
}) => {

  try {

    const { data } = await api.post(
      "/lookup",
      {
        table,
        where,
      }
    );

    return data ?? [];

  } catch (error) {

    console.error(
      "Lookup Error:",
      error
    );

    return [];
  }
};